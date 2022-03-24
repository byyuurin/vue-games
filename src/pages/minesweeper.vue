<route lang="yaml">
meta:
  title: Minesweeper
</route>

<script lang="ts" setup>
import { breakpoints } from '../composables/shared'
import type { CreateGameOptions, MineBlock } from '../composables/minesweeper'
import { createGame } from '../composables/minesweeper'

const helpVisible = ref(true)
const helpEl = ref<HTMLDivElement|null>(null)
const help = useDraggable(helpEl, { initialValue: { x: 200, y: 400 } })

const config = computed(() => {
  const result = {
    easy: { width: 8, height: 8, mines: 10 },
    medium: { width: 16, height: 16, mines: 40 },
    hard: { width: 30, height: 16, mines: 99 }
  }

  return result
})

type GameConfig = keyof typeof config.value | 'customize'

const gameOptions = ref<CreateGameOptions>({
  ...unref(config)['easy'],
  friendly: true
})
const game = createGame(gameOptions)
const { state, dashboard } = game
const customizeVisible = ref(false)
const customize = ref<CreateGameOptions>({
  ...unref(state).options,
  mines: 15
})
const customizeMines = computed(() => {
  const { width, height, mines } = unref(customize)
  return Math.round(width * height * mines / 100)
})
const now = useNow()
const timeAgo = computed(() => {
  const { begin, end } = state.value.timestamp
  let diff = 0

  if (begin && end)
    diff = end - begin

  if (begin && !end)
    diff = +now.value - begin


  return (diff / 1000).toFixed(2).split('.')
})

function blockAttrs(item: MineBlock) {
  const { counts, dangered, flagged, viewed, disabled } = item
  return { counts, dangered, flagged, viewed, disabled }
}

function resetGame(option: GameConfig | CreateGameOptions) {
  const { friendly } = unref(gameOptions)
  let options: CreateGameOptions = {} as any

  // https://zh.wikipedia.org/wiki/%E8%B8%A9%E5%9C%B0%E9%9B%B7
  switch (option) {
    case 'easy':
    case 'medium':
    case 'hard':
      options = { ...unref(config)[option], friendly }
      break
    case 'customize':
      options = {
        width: customize.value.width,
        height: customize.value.height,
        mines: customizeMines.value,
        friendly: customize.value.friendly
      }
      break
    default:
      options = option
  }

  if (!breakpoints.xl.value && options.width > options.height) {
    const { width } = options
    options.width = options.height
    options.height = width
  }

  customizeVisible.value = false
  gameOptions.value = options
  game.reset()
}
</script>

<template>
  <div pb-4 @contextmenu.capture="(e) => e.preventDefault()">
    <h2 text="5xl center ellipsis" leading="2em" overflow-hidden>
      Minesweeper
    </h2>

    <div v-show="helpVisible" ref="helpEl"
         relative m-auto p-4
         xl="fixed z-5 p-0"
         :style="!breakpoints.xl.value ? '' : help.style.value"
    >
      <div whitespace-nowrap select-none rounded
           bg="sky-500 opacity-10 dark:opacity-25"
           xl="cursor-move opacity-80 hover:opacity-100 transition duration-250"
      >
        <div p-4 text-2xl font-bold
             bg="dark/10 dark:black/20"
             flex="~ gap-2" justify-between items-center
        >
          <span>How to play</span>
          <button icon-button i-maki-cross text-2xl
                  xl="top-5 right-4"
                  @click="helpVisible = false"
          />
        </div>
        <div p-4 grid="~ cols-3 gap-x-8 gap-y-4" auto-cols-auto items-center>
          <p col-span-2>
            Uncover
          </p>
          <div flex items-center children:flex-shrink-0>
            <i i-iconoir-mouse-button-left text="2xl" />
          </div>

          <p col-span-2>
            Uncover (conditional)
          </p>
          <div flex items-center children:flex-shrink-0>
            <i i-iconoir-mouse-button-left text="2xl" />
            <i i-iconoir-mouse-button-left text="2xl" />
          </div>

          <p col-span-2>
            Flagging
          </p>
          <div flex items-center children:flex-shrink-0>
            <i i-iconoir-mouse-button-right text="2xl" />
          </div>
        </div>
      </div>
    </div>

    <div py-4 flex="~ wrap gap-2" justify-center>
      <button btn="~ sky" :disabled="!dashboard.started" @click="resetGame(state.options)">
        New Game
      </button>
      <button btn @click="resetGame('easy')">
        Easy
      </button>
      <button btn @click="resetGame('medium')">
        Medium
      </button>
      <button btn @click="resetGame('hard')">
        Hard
      </button>
      <button btn @click="customizeVisible=true">
        Customize
      </button>
    </div>

    <div text="2xl black/75 dark:white/75" flex="~ gap-4" justify-center items-center>
      <div flex="~ gap-1" justify-center items-center>
        <i i-mdi-clock-time-twelve-outline />
        <div>
          <span>{{ timeAgo[0] }}</span>
          <span text-lg self-end>.{{ timeAgo[1] }}</span>
        </div>
      </div>

      <div flex="~ gap-1" justify-center items-center>
        <i i-mdi-mine />
        <div>{{ dashboard.unusedFlags }}</div>
      </div>
    </div>

    <div relative p-6>
      <div container m-auto text-center overflow-auto>
        <div inline-block>
          <div v-for="blocks, y of state.board" :key="y" w-auto m-auto flex items-center>
            <mine-block v-for="item, x of blocks" :key="x"
                        flex-shrink-0
                        v-bind="blockAttrs(item)"
                        @click="game.uncover(item.position)"
                        @dblclick="game.autoUncover(item.position)"
                        @contextmenu.prevent="game.mark(item.position)"
            />
          </div>
        </div>
      </div>
      <div v-if="state.status" absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg="gray-50/50 dark:dark-50/50">
        <span text="8xl shadow" select-none
              :class="{
                'text-white/10 dark:text-white/20': state.status==='lose',
                'text-orange-400/50 dark:text-orange-400/50': state.status==='win',
              }"
        >{{ state.status.toUpperCase() }}</span>
      </div>
    </div>

    <div v-show="customizeVisible" fixed top-0 left-0 z-20 w-full h-full bg="black/50 dark:black/90" flex="~" justify-center items-center select-none>
      <div flex-grow max-w-screen-sm mx-4 p-4 rounded bg="white/90 dark:white/10">
        <div text-2xl leading="3em">
          Customize Settings
        </div>
        <label flex="~ gap-1 col">
          Width: {{ customize.width }}
          <input v-model.number="customize.width" p="2" bg="gray-500/10" text="red-200" type="range" min="4" max="30">
        </label>
        <label flex="~ gap-1 col">
          Height: {{ customize.height }}
          <input v-model.number="customize.height" p="2" bg="gray-500/10" text="red-200" type="range" min="4" max="30">
        </label>
        <label flex="~ gap-1 col">
          Mines: {{ customizeMines }} ({{ customize.mines }}%)
          <input v-model.number="customize.mines" p="2" bg="gray-500/10" text="red-200" type="range" min="15" max="50">
        </label>
        <label flex="~ gap-4" items-center>
          Friendly:
          <input v-model="customize.friendly" p="2" bg="gray-500/10" text="red-200" type="checkbox">
        </label>

        <div py-8 flex="~ gap-4" justify-center>
          <button btn="~ sky" @click="resetGame('customize')">
            Confirm
          </button>
          <button btn="solid-sky" @click="customizeVisible=false">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
  學習參考1: https://github.com/antfu/vue-minesweeper
  學習參考2: https://www.bilibili.com/video/BV1ia411b7jY/

  # 完成順序
  - [v] 基本參數與樣式
  - [v] 依據參數生成陣列基本內容(不含地雷)
  - [v] 依據參數生成地雷
  - [v] 左鍵點選時自動展開相鄰區塊(限counts為0時)
  - [v] 右鍵點選時標示旗子, 再點時取消
  - [v] 左鍵連點時若周圍安全則自動展開(不可有未標記的地雷)
  - [v] 失敗邏輯與畫面
  - [v] 過關邏輯與畫面
  - [v] 提示剩餘標記次數
  - [v] 優化遊玩體驗 - 第一次點選的格子周圍皆沒有地雷
  - [v] 優化地雷隨機產生邏輯
  - [v] 提示遊戲進行時間
  - [v] 保存遊戲狀態(Session Storage)
  - [v] 增加自定選項
  - [v] 改善記憶體佔用
  - [v] 修正捲軸出現後內容缺失情況
  - [v] 操作說明提示
-->
