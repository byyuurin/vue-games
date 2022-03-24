import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import { createRandom } from './shared/utils'

export interface CellPosition {
  x: number
  y: number
}

export interface BoardCell {
  position: CellPosition
  counts: number
  dangered?: boolean
  flagged?: boolean
  viewed?: boolean
  disabled?: boolean
}

export interface CreateGameOptions {
  width: number
  height: number
  mines: number
  friendly?: boolean
  seed?: string
}

interface GameCache {
  seed?: string
  flags: number
  dangers: number
  unknowns: number
}

type GameStatus = 'win' | 'lose'

interface GameState {
  timestamp: {
    begin: number
    end: number
  }
  options: CreateGameOptions
  status: GameStatus | null
  board: BoardCell[][]
}

function updateGameCache(cache: Ref<GameCache>, target: BoardCell, diff: Partial<BoardCell>) {
  let { flags, dangers, unknowns } = unref(cache)

  // toggle flag
  if ('flagged' in diff) flags += target.flagged ? -1 : 1
  if ('flagged' in diff && target.dangered) {
    unknowns -= diff.flagged ? 1 : -1
    dangers -= diff.flagged ? 1 : -1
  }

  // uncover or autoUncover
  if ('viewed' in diff && !target.viewed) unknowns--

  // generate mines
  if ('dangered' in diff) dangers += diff.dangered ? 1 : -1

  cache.value = { ...unref(cache), flags, dangers, unknowns }
}

function updateCell(cache: Ref<GameCache> | null, state: Ref<GameState>, position: CellPosition, diff: Partial<BoardCell>) {
  const { x, y } = position
  const raw = state.value.board[y][x]

  if (cache) updateGameCache(cache, raw, diff)

  state.value.board[y][x] = { ...raw, ...diff }
}

function nearbyPositions(center: CellPosition, options: MaybeRef<CreateGameOptions>) {
  const { width, height } = unref(options)
  const directions = [
    [1, 1], [1, 0], [1, -1],
    [0, 1], [0, -1],
    [-1, 1], [-1, 0], [-1, -1]
  ]
  return directions.map(([offsetX, offsetY]) => ({
    x: center.x + offsetX,
    y: center.y + offsetY
  })).filter(({ x, y }) => x >= 0 && x < width && y >= 0 && y < height)
}

function expandCells(cache: Ref<GameCache>, state: Ref<GameState>, current: BoardCell) {
  const { options } = unref(state)
  // 不處理已展開區塊
  if (current.viewed) return

  // 不處理地雷或已標記區塊
  if (!current.dangered && !current.flagged)
    updateCell(cache, state, current.position, { viewed: true })

  // 周圍無地雷的區塊可繼續展開
  if (current.counts === 0) {
    nearbyPositions(current.position, options).forEach((position) => {
      const target = state.value.board[position.y][position.x]
      expandCells(cache, state, target)
    })
  }
}

function generateBoard(options: MaybeRef<CreateGameOptions>) {
  const { width, height } = unref(options)
  return Array.from({ length: height })
    .map((_, y) => Array.from({ length: width })
      .map((_, x) => ({ position: { x, y }, counts: 0 } as BoardCell)))
}

function generateMines(cache: Ref<GameCache>, state: Ref<GameState>, current: CellPosition) {
  const { options } = unref(state)
  const { width, height, mines, friendly = false } = options
  const maybes: CellPosition[] = []
  const excludes = [current, ...( friendly ? nearbyPositions(current, options) : [])]
  const random = createRandom(cache.value.seed)

  const randomPosition = () => maybes.splice(Math.floor(random() * maybes.length), 1)[0]
  const isExclude = (p: CellPosition) =>
    excludes.filter(({ x, y }) => p.x === x && p.y === y).length > 0

  // 更新地雷格周圍八格的地雷計數
  const updateMineCounts = (center: CellPosition) => {
    nearbyPositions(center, options).forEach((position) => {
      const { counts } = state.value.board[position.y][position.x]
      updateCell(null, state, position, { counts: counts + 1 })
    })
  }

  // 建立所有可能出現地雷的座標
  for (let y = 0;y < height; y++) {
    for (let x = 0; x < width; x++)
      if (!isExclude({ x, y })) maybes.push({ x, y })
  }

  let times = 0
  while (times < mines) {
    const position = randomPosition()

    updateCell(cache, state, position, { dangered: true })
    updateMineCounts(position)

    times++
  }
}

function createGameCache(state: GameState) {
  const { board, options } = state
  let unknowns = options.width * options.height // 未知數量
  let flags = 0 // 已標記數量
  let dangers = 0 // 危險數量

  board.forEach(items=>items.forEach(item=>{
    if (item.flagged) flags++
    if (item.flagged && item.dangered) return unknowns--
    if (item.viewed) return unknowns--
    if (item.dangered) return dangers++
  }))

  return ref<GameCache>({
    seed: options.seed,
    flags,
    dangers,
    unknowns
  })
}

export function createGame(gameOptions: MaybeRef<CreateGameOptions>) {
  const state = useSessionStorage<GameState>('minesweeper-state', {
    options: unref(gameOptions),
    timestamp: { begin: 0, end: 0 },
    status: null,
    board: generateBoard(gameOptions)
  })

  const cache = createGameCache(unref(state))

  const dashboard = computed(() => {
    const { timestamp, options } = unref(state)
    const { flags, dangers, unknowns } = unref(cache)
    return {
      flags, dangers, unknowns,
      started: timestamp.begin > 0,
      unusedFlags: options.mines - flags
    }
  })

  const find = (position: CellPosition) => unref(state).board[position.y][position.x]

  /**
   * 重置遊戲
   */
  const reset = () => {
    const { width, height } = unref(gameOptions)
    cache.value = {
      ...unref(cache),
      dangers: 0,
      flags: 0,
      unknowns: width * height
    }
    state.value.board = generateBoard(unref(gameOptions))
    state.value.options = unref(gameOptions)

    if (!dashboard.value.started) return

    state.value.status = null
    state.value.timestamp = { begin: 0, end: 0 }
  }

  const stop = (type: GameStatus) => {
    state.value.status = type
    state.value.board.forEach(y => y.forEach(x=>{
      x.viewed = x.viewed || x.dangered
      x.disabled = true
    }))
    state.value.timestamp.end = Date.now()
  }

  // 過關條件
  // 1. 全部地雷被標記
  // 2. 剩餘地雷數量 = 未顯示數量
  const checkStatus = () => {
    const { started, dangers, unknowns } = unref(dashboard)

    if (!started) return
    if (dangers === 0) return stop('win')
    if (dangers === unknowns) return stop('win')
  }

  /**
   * 展開內容
   * @param position 座標
   */
  const uncover = (position: CellPosition) => {
    if (!dashboard.value.started) {
      generateMines(cache, state, position)
      state.value.timestamp.begin = Date.now()
    }

    const target = find(position)

    if (state.value.status) return
    if (target.flagged) return
    if (target.dangered) return stop('lose')

    expandCells(cache, state, target)
    checkStatus()
  }

  /**
   * 自動展開
   * @param position 座標
   */
  const autoUncover = (position: CellPosition) => {
    const { options } = unref(state)
    const target = find(position)

    if (state.value.status) return
    if (!target.viewed) return

    const nearbyCells = nearbyPositions(target.position, options).map((position) => find(position))
    let dangerCounts = 0

    nearbyCells.forEach((item) => {
      if (item.dangered && !item.flagged) dangerCounts++
    })

    if (dangerCounts === 0)
      nearbyCells.forEach((cell) => expandCells(cache, state, cell))

    checkStatus()
  }

  /**
   * 標記(插旗)
   * @param position 座標
   */
  const mark = (position: CellPosition) => {
    const { mines } = unref(state).options
    const target = find(position)

    if (state.value.status) return
    if (target.viewed) return
    if (dashboard.value.flags >= mines && !target.flagged) return

    updateCell(cache, state, position, { flagged: !target.flagged })
    checkStatus()
  }

  return { cache, state, dashboard, reset, uncover, autoUncover, mark }
}
