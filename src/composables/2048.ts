import type { MaybeRef } from '@vueuse/core'
import { createRandom } from '/src/composables/shared/utils'

export const isGameOver = ref(false)
export const isClearance = ref(false)
export const isContinue = ref(false)

interface GameRandom {
  cell: ReturnType<typeof createRandom>
  tile: ReturnType<typeof createRandom>
}

interface Tile {
  x: number
  y: number
  value: number
}

export interface GridTile extends Tile {
  mergeIndex: number | null
}

export interface GridCell {
  index: number
  x: number
  y: number
  tileIndex: number | null
}

export interface CreateGameOptions {
  size: number
  target?: number
  seed?: string
}

interface GameBoard {
  cells: GridCell[]
  tiles: Record<number, GridTile>
}

export interface GameState {
  options: CreateGameOptions
  board: GameBoard
}

function generateRandom(seed?: string): GameRandom {
  return {
    cell: createRandom(seed),
    tile: createRandom(seed),
  }
}

let random: GameRandom
let nextTileIndex = 0
let targetValue = 2048
export function generateTile(board: GameBoard) {
  const emptyCells = board.cells.filter(cell=>cell.tileIndex === null)

  if (emptyCells.length === 0) return false

  const cell = emptyCells[Math.floor(random.cell() * emptyCells.length)]

  const tile: GridTile = {
    x: cell.x,
    y: cell.y,
    value: random.tile() > 0.5 ? 2 : 4,
    mergeIndex: null,
  }

  cell.tileIndex = nextTileIndex++
  board.tiles[cell.tileIndex] = tile
  return true
}

function generateBoard(size: number) {
  const board: GameBoard = {
    cells: Array
      .from({ length: size * size })
      .map((_, index) => ({
        index,
        x: index % size,
        y: Math.floor(index / size),
        tileIndex: null,
      })),
    tiles: {},
  }

  let count = 0
  while(count++ < 2) generateTile(board)

  return board
}

export function cellsByColumn(board: GameBoard) {
  return board.cells.reduce((result, cell) => {
    result[cell.x] = result[cell.x] || []
    result[cell.x][cell.y] = cell.index
    return result
  }, [] as number[][])
}

export function cellsByRow(board: GameBoard) {
  return board.cells.reduce((result, cell) => {
    result[cell.y] = result[cell.y] || []
    result[cell.y][cell.x] = cell.index
    return result
  }, [] as number[][])
}

export function slideTiles(board: GameBoard, groups: number[][]) {
  let slideCounts = 0
  const acceptable = (from: GridCell, to: GridCell) => {
    // 已有值且已指定合併對象的格子不處理
    if (to.tileIndex !== null && board.tiles[to.tileIndex]?.mergeIndex !== null) return false

    // 已有值且未指定合併對象但值不同的格子不處理
    if (to.tileIndex !== null && board.tiles[to.tileIndex]?.value !== board.tiles[from.tileIndex!]?.value) return false

    // 無值或值可被合併
    return true
  }

  groups.forEach(group => {
    for (let i = 1; i < group.length; i++) {
      const cellFrom = board.cells[group[i]] // 被移動的格子
      let cellTo: GridCell | null = null // 將前往的格子

      // 空格不需要處理
      if (cellFrom.tileIndex === null) continue

      for (let j = i - 1; j >= 0; j--) {
        const cell = board.cells[group[j]]
        if (!acceptable(cellFrom, cell)) break
        cellTo = cell
      }

      if (cellTo) {
        if (cellTo.tileIndex !== null) // merge tile
          board.tiles[cellTo.tileIndex]!.mergeIndex = cellFrom.tileIndex
        else // move tile
          cellTo.tileIndex = cellFrom.tileIndex

        board.tiles[cellFrom.tileIndex]!.x = cellTo.x
        board.tiles[cellFrom.tileIndex]!.y = cellTo.y
        cellFrom.tileIndex = null
        slideCounts++
      }
    }
  })
  return slideCounts
}

export function mergeTiles(board: GameBoard) {
  board.cells
    .filter(cell => cell.tileIndex !== null)
    .forEach(cell => {
      const tile = board.tiles[cell.tileIndex!]!

      if (tile.mergeIndex !== null) {
        tile.value += board.tiles[tile.mergeIndex]!.value
        delete board.tiles[tile.mergeIndex]
        tile.mergeIndex = null
      }

      if (tile.value >= targetValue)
        isClearance.value = true
    })
}

export function moveable(board: GameBoard) {
  const findTile = (cellIndex: number) => board.tiles[board.cells[cellIndex]?.tileIndex || -1]
  const some = (groups: number[][]) => groups.some(cells => cells.some((cell, index) => {
    const self = findTile(cell)
    const before = findTile(cells[index - 1])
    const after = findTile(cells[index + 1])
    return self?.value === before?.value || self?.value === after?.value
  }))

  if (board.cells.some(cell => cell.tileIndex === null)) return true

  let status = some(cellsByColumn(board))
  status = status || some(cellsByRow(board))

  return status
}

export function createGame(gameOptions: MaybeRef<CreateGameOptions>) {
  const { size, seed } = unref(gameOptions)

  random = generateRandom(seed)

  const state = useSessionStorage<GameState>('2048-state', {
    options: { target: targetValue, ...unref(gameOptions) },
    board: generateBoard(size),
  })

  nextTileIndex = Object.keys(state.value.board.tiles)
    .map((k) => +k)
    .reduce((max, n) => (n > max ? n : max) + 1)

  const { options } = unref(state)

  if (options.seed !== seed)
    random = generateRandom(unref(state).options.seed)

  targetValue = options.target || targetValue

  const reset = () => {
    nextTileIndex = 0
    state.value = {
      ...unref(state),
      board: generateBoard(unref(state).options.size),
    }
    isGameOver.value = false
    isClearance.value = false
    isContinue.value = false
  }

  return { state, reset }
}
