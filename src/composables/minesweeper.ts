import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

interface MinePosition {
  x: number
  y: number
}

export interface MineBlock {
  position: MinePosition
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
}

type GameStatus = 'win' | 'lose'

interface GameState {
  timestamp: {
    begin: number
    end: number
  }
  status: GameStatus | null
  board: MineBlock[][]
}

function updateBlock(state: Ref<GameState>, position: MinePosition, diff: Partial<MineBlock>) {
  const { x, y } = position
  const raw = state.value.board[y][x]
  state.value.board[y][x] = { ...raw, ...diff }
}

function nearbyPositions(center: MinePosition, options: MaybeRef<CreateGameOptions>) {
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

function expandBlocks(state: Ref<GameState>, current: MineBlock, options: MaybeRef<CreateGameOptions>) {
  // 不處理已展開區塊
  if (current.viewed) return

  // 不處理地雷或已標記區塊
  if (!current.dangered && !current.flagged)
    updateBlock(state, current.position, { viewed: true })

  // 周圍無地雷的區塊可繼續展開
  if (current.counts === 0) {
    nearbyPositions(current.position, options).forEach((position) => {
      const target = state.value.board[position.y][position.x]
      expandBlocks(state, target, options)
    })
  }
}

function generateBoard(options: MaybeRef<CreateGameOptions>) {
  const { width, height } = unref(options)
  return Array.from({ length: height })
    .map((_, y) => Array.from({ length: width })
      .map((_, x) => ({ position: { x, y }, counts: 0 } as MineBlock)))
}

function generateMines(state: Ref<GameState>, options: MaybeRef<CreateGameOptions>, exclude: MinePosition) {
  const { width, height, mines, friendly = false } = unref(options)
  const positions = nearbyPositions(exclude, options).concat(exclude)
  const seeds: MinePosition[] = []

  const random = () => seeds.splice(Math.floor(Math.random() * seeds.length), 1)[0]
  const safely = (p: MinePosition) => positions.filter(({ x, y }) => p.x === x && p.y === y).length > 0

  // 更新地雷格周圍八格的地雷計數
  const updateMineCounts = (center: MinePosition) => {
    nearbyPositions(center, options).forEach((position) => {
      const { counts } = state.value.board[position.y][position.x]
      updateBlock(state, position, { counts: counts + 1 })
    })
  }

  for (let y = 0;y < height; y++) {
    for (let x = 0; x < width; x++)
      if (!(friendly && safely({ x, y }))) seeds.push({ x, y })
  }

  let times = 0
  while (times < mines) {
    const position = random()

    updateBlock(state, position, { dangered: true })
    updateMineCounts(position)

    times++
  }
}

export function createGame(options: MaybeRef<CreateGameOptions>) {

  const state = useSessionStorage<GameState>('minesweeper-state', {
    timestamp: { begin: 0, end: 0 },
    status: null,
    board: generateBoard(options)
  })

  const dashboard = computed(() => {
    const { width, height } = unref(options)
    const { timestamp } = unref(state)
    let unknowns = width * height // 未知數量
    let flags = 0 // 已標記數量
    let dangers = 0 // 危險數量

    state.value.board.forEach((row) => row.forEach((column) =>{
      flags += column.flagged ? 1 : 0

      if (column.viewed) return unknowns--
      if (column.dangered && column.flagged) return unknowns--
      if (column.dangered) return dangers++
    }))

    return {
      started: timestamp.begin > 0,
      flags,
      dangers,
      unknowns,
      unusedFlags: unref(options).mines - flags
    }
  })

  const find = (position: MinePosition) => unref(state).board[position.y][position.x]

  /**
   * 重置遊戲
   */
  const reset = () => {
    state.value.board = generateBoard(options)

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
  // 2. 未顯示數量 = 剩餘地雷數量
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
  const uncover = (position: MinePosition) => {
    if (!dashboard.value.started) {
      generateMines(state, options, position)
      state.value.timestamp.begin = Date.now()
    }

    const target = find(position)

    if (state.value.status) return
    if (target.flagged) return
    if (target.dangered) return stop('lose')

    expandBlocks(state, target, options)
    checkStatus()
  }

  /**
   * 自動展開
   * @param position 座標
   */
  const autoUncover = (position: MinePosition) => {
    const target = find(position)

    if (state.value.status) return
    if (!target.viewed) return

    const nearbyBlocks = nearbyPositions(target.position, options).map((position) => find(position))
    let dangerCounts = 0

    nearbyBlocks.forEach((item) => {
      if (item.dangered && !item.flagged) dangerCounts++
    })

    if (dangerCounts === 0)
      nearbyBlocks.forEach((block) => expandBlocks(state, block, options))

    checkStatus()
  }

  /**
   * 標記(插旗)
   * @param position 座標
   */
  const mark = (position: MinePosition) => {
    const { mines } = unref(options)
    const target = find(position)

    if (state.value.status) return
    if (target.viewed) return
    if (dashboard.value.flags >= mines && !target.flagged) return

    updateBlock(state, position, { flagged: !target.flagged })
    checkStatus()
  }

  return { state, dashboard, reset, uncover, autoUncover, mark }
}
