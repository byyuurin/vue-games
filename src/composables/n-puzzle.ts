import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'
import { createRandom } from './shared/utils'

export const isLoading = ref(true)
export const isComplete = ref(false)

export interface CellPosition {
  x: number
  y: number
}

export interface CellSize {
  width: number
  height: number
}

export interface BoardCell {
  sequence: number
  origin: CellPosition
  position: CellPosition
  columns: number
  gaps: number
  invisible?: boolean
}

export interface CreateGameOptions {
  columns: number
  rows: number
  gaps: number
  seed?: string
  background?: string
}

function indexToPosition(i: number, columns: number): CellPosition{
  return {
    x: i % columns,
    y: Math.floor(i / columns)
  }
}

function resolvable(numbers: number[], columns: number, exclude: number) {
  let total = 0

  numbers.filter(n => n > 0).forEach((value, i) => {
    let next = i + 1

    while (next < numbers.length) {
      const nextValue = numbers[next]
      if (value > nextValue) total++
      next++
    }
  })

  return columns % 2
    // (columns % 2 === 1)
    // 列數為奇數時，逆序列數加總為偶數
    ? total % 2 === 0
    // (columns % 2 === 0)
    // 列數為偶數時，逆序列數加總奇偶與空行奇偶和守恆
    : total % 2 === exclude % 2
}

function generateBoard(options: CreateGameOptions, remove: CellPosition): BoardCell[] {
  const { columns, rows, gaps } = options
  const random = createRandom(options.seed)
  const numbers: number[] = [] // 打亂後的順序號碼
  const maybes: CellPosition[] = []
  let exclude = 0
  const cells = Array.from({ length: columns * rows }).map((_, i) => {
    const position = indexToPosition(i, columns)
    const cell: BoardCell = {
      sequence: i + 1,
      origin: position,
      position: position,
      columns,
      gaps
    }
    maybes.push(position)
    return cell
  }).map((cell) => {
    const position = maybes.splice(Math.floor(random() * maybes.length), 1)[0]
    cell.position = position

    if (position.x === remove.x && position.y === remove.y) {
      cell.invisible = true
      cell.sequence = 0
      exclude = cell.origin.y + position.y
    }

    numbers[position.y * columns + position.x] = cell.sequence

    return cell
  })

  if (!resolvable(numbers.filter(n => n > 0), columns, exclude))
    return generateBoard(options, remove)

  isComplete.value = false
  return cells
}

function moveable(from: CellPosition, to: CellPosition) {
  const nearby = [
    { ...from, x: from.x + 1 },
    { ...from, x: from.x - 1 },
    { ...from, y: from.y + 1 },
    { ...from, y: from.y - 1 }
  ]
  return nearby.some((p) => p.x === to.x && p.y === to.y)
}

function toggleCell(state: Ref<GameState>, from: CellPosition, to: CellPosition) {
  return unref(state).board.map((cell) => {
    if (cell.position.x === from.x && cell.position.y === from.y)
      return { ...cell, position: to }

    if (cell.position.x === to.x && cell.position.y === to.y)
      return { ...cell, position: from }

    return cell
  })
}

function checkStatus(state: Ref<GameState>) {
  const { timestamp, board } = unref(state)
  isComplete.value = board.every((cell)=>
    cell.origin.x === cell.position.x && cell.origin.y === cell.position.y)

  if (isComplete.value && !timestamp.end)
    state.value.timestamp.end = Date.now()

}

export interface GameState {
  timestamp: {
    begin: number
    end: number
  }
  options: CreateGameOptions
  board: BoardCell[]
  steps: number
}

export function createGame(gameOptions: MaybeRef<CreateGameOptions>) {
  const { rows } = unref(gameOptions)
  let current: CellPosition = { x: 0, y: rows - 1 }

  const state = useSessionStorage<GameState>('n-puzzle-state', {
    timestamp: { begin: 0, end: 0 },
    options: unref(gameOptions),
    board: generateBoard(unref(gameOptions), current),
    steps: 0
  })

  const reset = () => {
    const { options } = unref(state)
    current = { x: 0, y: options.rows - 1 }
    state.value = {
      timestamp: { begin: 0, end: 0 },
      options,
      board: generateBoard(options, current),
      steps: 0
    }
  }

  const move = (to: CellPosition) => {
    const { begin } = unref(state).timestamp
    if (!moveable(current, to)) return
    if (!begin) state.value.timestamp.begin = Date.now()

    state.value.board = toggleCell(state, current, to)
    current = to
    state.value.steps++
    checkStatus(state)
  }

  checkStatus(state)

  return { state, reset, move }
}
