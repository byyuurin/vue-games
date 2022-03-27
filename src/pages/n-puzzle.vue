<route lang="yaml">
meta:
  title: N-Puzzle
</route>

<script lang="ts" setup>
import type { CreateGameOptions } from '/src/composables/n-puzzle'
import { createGame, isComplete, isLoading }from '/src/composables/n-puzzle'
const config = {
  easy: { columns: 3, rows: 3 },
  medium: { columns: 4, rows: 4 },
  hard: { columns: 5, rows: 5 }
}
const images = [
  'https://cdn.discordapp.com/attachments/757420273350868993/957120284085866516/LINE_ALBUM_300_220309_111.jpg',
  'https://cdn.discordapp.com/attachments/757420273350868993/957120284434006086/LINE_ALBUM_300_220309_132.jpg',
  'https://cdn.discordapp.com/attachments/757420273350868993/957120284706603008/LINE_ALBUM_300_220309_197.jpg',
  'https://cdn.discordapp.com/attachments/757420273350868993/957120284996018266/LINE_ALBUM_300_220309_286.jpg'
]
const randomImage = () => images[Math.floor(Math.random() * images.length)]
type GameConfig = keyof typeof config | 'customize'
const game = createGame({ ...config.easy, gaps: 1, background: randomImage() })
const { state } = game
const customizeVisible = ref(false)
const customize = ref({
  ...unref(state).options,
  background: '',
  url: ''
})
const reversed = ref(false)
const toggleReversed = useToggle(reversed)

function resetGame(option: GameConfig | CreateGameOptions) {
  let options: CreateGameOptions = {} as any

  switch (option) {
    case 'easy':
    case 'medium':
    case 'hard':
      options = {
        ...unref(state).options,
        ...config[option],
        background: randomImage()
      }
      break
    case 'customize':
      options = {
        ...unref(state).options,
        columns: customize.value.columns,
        rows: customize.value.rows,
        background: customize.value.url || customize.value.background
      }
      break
    default:
      options = option
  }

  isLoading.value = true
  customizeVisible.value = false
  state.value.options = options
  game.reset()
}

function beforeCustomize() {
  customize.value = {
    background: '',
    ...unref(state).options,
    url: ''
  }
  customizeVisible.value = true
}
</script>

<template>
  <div pb-4>
    <h2 text="5xl center ellipsis" leading="2em" overflow-hidden>
      N-Puzzle
    </h2>

    <div py-4 flex="~ wrap gap-2" justify-center>
      <button btn="~ sky" @click="game.reset">
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
      <button btn @click="beforeCustomize">
        Customize
      </button>
    </div>

    <puzzle-info
      :begin="state.timestamp.begin"
      :end="state.timestamp.end"
      :steps="state.steps"
    />

    <puzzle-board
      :state="state"
      :size="150"
      :src="state.options.background"
      :reversed="reversed"
      @click="game.move"
    />

    <div sticky bottom-20px z-2 px-4 flex="~ gap-2" justify-center items-end>
      <button v-show="!isComplete" btn="~ solid-yellow" @click="() => toggleReversed()">
        {{ reversed ? 'Continue' : 'Check Answer' }}
      </button>
    </div>

    <div v-show="customizeVisible" fixed top-0 left-0 z-20 w-full h-full bg="black/50 dark:black/90" flex="~" justify-center items-center select-none>
      <div flex-grow max-w-screen-sm mx-4 p-4 rounded bg="white/90 dark:white/10">
        <div text-2xl leading="3em">
          Customize Settings
        </div>
        <label flex="~ gap-1 col">
          Columns: {{ customize.columns }}
          <input v-model.number="customize.columns" p="2" bg="gray-500/10" text="red-200" type="range" min="2" max="8">
        </label>
        <label flex="~ gap-1 col">
          Rows: {{ customize.rows }}
          <input v-model.number="customize.rows" p="2" bg="gray-500/10" text="red-200" type="range" min="2" max="8">
        </label>
        <div flex="~ gap-1 col">
          Image
          <div py-4 text-center>
            <div inline-flex flex="wrap gap-2">
              <label
                v-for="src of images" :key="src"
                p-4 cursor-pointer rounded
                flex="~" items-center
                :class="{
                  'bg-gray-500/10': src !== customize.background,
                  'bg-teal-600/75': src === customize.background
                }"
              >
                <input v-model="customize.background" hidden type="radio" :value="src">
                <img max-w-100px :src="src" alt="image 1">
              </label>
            </div>
          </div>
        </div>
        <label flex="~ gap-1 col">
          Or image url
          <input
            v-model="customize.url" type="text"
            bg="gray-500/10"
            p-2 w-full dark:text-white rounded outline-none
          >
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
  學習參考(css): https://100.antfu.me/004
  學習參考(驗證邏輯): https://www.youtube.com/watch?v=ed2wmMBfveo&t=5318s

  # 完成順序
  [v] 基本樣式
  [v] 依序將內容顯示於各格子中
  [v] 打亂格子順序並將指定格子挖空
  [v] 格子尺寸自動計算與修正
  [v] 點擊空格附近格子時移動空格
  [v] 增加打亂前後切換顯示功能
  [v] 過關邏輯與樣式
  [v] 隨機序列有效性驗證(2x2)
-->

<!--
來源: https://blog.csdn.net/V5ZSQ/article/details/46843981

某状态的奇偶性定义为逆序对(不包括0的)总数的奇偶性。
此题目终态为偶数

首先，0的左右移动不改变奇偶性；然后是0的上下移动，如下：

-----
--0**
**x--
-----

x是任意数，现在要把x移上去，那么****中，假设有a个大于x，b个小于x，那么移动之后逆序数就会加上一个b-a，x所能影响的也就是这些，除此之外，其他都不变。

接着，如果列数为偶数，那么****的个数就是奇数，b,a奇偶性互异，b-a为奇数，所以移动一次后，原序列的逆序数的奇偶性变了。
考虑到最后0会移动到最后一行，所以奇偶性会改变n-i次(i为0的行数)，只需判断最后是否是偶数即可。

反之，如果列数为奇数，那么****的个数就是偶数，b,a奇偶性相同，b-a为偶数，所以移动一次后，原序列的逆序数的奇偶性没变。因为无论怎么移，奇偶性都不变，所以说一开始初态的奇偶性就必须与末态一致

所以得出如下结论:
n为奇数，0上下移动不改变奇偶性，故逆序数为偶的YES
n为偶数，0上下移动逆序数变化为±1，此时还要考虑0的竖直距离，逆序数%2 == 距离%2 时YES
 -->
