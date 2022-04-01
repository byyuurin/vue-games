<route lang="yaml">
meta:
  title: 2048
</route>

<script lang="ts" setup>
import { createGame } from '/src/composables/2048'
const { state, reset } = createGame({ size: 4 })
</script>

<template>
  <div pb-4>
    <h2 text="5xl center ellipsis" leading="2em" overflow-hidden>
      2048
    </h2>
    <div text-center>
      <button btn="~ sky" @click="reset">
        New Game
      </button>
    </div>
    <grid-board :state="state" @reset="reset" />
  </div>
</template>

<!--
  學習參考: https://www.youtube.com/watch?v=wOVEe9eawXc

  # 完成順序
  [v] 基本樣式與動畫
  [v] 依據參數生成陣列基本內容
  [v] 方塊依據數值改變樣式
  [v] 按下方向鍵時滑動方塊
  [v] 方塊值相同時合併
  [v] 遊戲結束畫面(Game over)
  [v] 保存遊戲狀態(Session Storage)
  [v] 達成目標值畫面與繼續遊玩選項
 -->
