<script lang="ts" setup>
import { breakpoints } from '/src/composables/shared'
import { cellsByColumn, cellsByRow, generateTile, isClearance, isContinue, isGameOver, mergeTiles, moveable, slideTiles } from '/src/composables/2048'
import type { GameState } from '/src/composables/2048'

interface Props {
  state: GameState
}

const props = defineProps<Props>()

const emit = defineEmits(['reset'])

const style = computed(() => {
  const { size } = props.state.options
  const scale = breakpoints.lg.value ? 0.5 : 1
  const gap = (size > 4 ? 1 : 2) * scale
  const width = Math.ceil((90 - gap * (size + 1)) * scale / size)
  const fontSize = Math.floor(width * 10 / 3) / 10

  return `
  --font-size: ${fontSize}vmin;
  --grid-size: repeat(${size}, ${width}vmin);
  --grid-gap: ${gap}vmin;
  --cell-size: ${width}vmin;
  font-size: var(--font-size);
  border-width: var(--grid-gap);
  `
})

let slideCounts = 0

onMounted(() => {
  const { board, options } = props.state
  isGameOver.value = !moveable(board)
  isClearance.value = !isGameOver.value && Object.keys(board.tiles).some((i) => board.tiles[+i].value >= options.target!)

  if (!(isGameOver.value || isClearance.value && !isContinue.value ))
    setupInput()
})

watch([isGameOver, isClearance], (value, before) => {
  if (before[0] === true)
    return setupInput()
  if (before[1] === true)
    return setupInput()
})

function setupInput() {
  window.addEventListener('keydown', handleKeyup, { once: true })
}

function handleKeyup(e: KeyboardEvent) {
  const { board } = props.state

  switch (e.key) {
    case 'ArrowUp':
      slideCounts = slideTiles(board, cellsByColumn(board))
      break
    case 'ArrowDown':
      slideCounts = slideTiles(board, cellsByColumn(board).map(cells => cells.reverse()))
      break
    case 'ArrowLeft':
      slideCounts = slideTiles(board, cellsByRow(board))
      break
    case 'ArrowRight':
      slideCounts = slideTiles(board, cellsByRow(board).map(cells => cells.reverse()))
      break
  }

  if (slideCounts === 0 && moveable(board))
    setupInput()
}

function handleTransitionEnd() {
  const { board } = props.state

  if (slideCounts && --slideCounts === 0) {
    mergeTiles(board)
    generateTile(board)

    if (moveable(board)) {
      if (!isClearance.value || isContinue.value)
        setupInput()
    }
    else{
      isGameOver.value = true
    }
  }
}

function handleReplay() {
  isGameOver.value = false
  emit('reset')
}

function handleContinue() {
  isContinue.value = true
  setupInput()
}
</script>

<template>
  <div relative p-6 text-center select-none>
    <div
      relative rounded-xl inline-grid
      grid="rows-$grid-size cols-$grid-size gap-$grid-gap"
      leading="$cell-size"
      bg="gray-500/10"
      border="transparent solid"
      children:rounded="$grid-gap"
      children:w="$cell-size"
      children:h="$cell-size"
      :style="style"
      @transitionend="handleTransitionEnd"
    >
      <div v-for="cell of state.board.cells" :key="cell.index" bg="gray-500/10" />
      <grid-tile v-for="tile, i of state.board.tiles" :key="i" v-bind="tile" />
    </div>
    <div
      absolute top-0 left-0 w-full h-full bg-transparent
      transition duration-1000
      flex="~ col" justify-center items-center
      text="10vmin"
      :class="isGameOver || isClearance && !isContinue ? 'z-10 bg-white/80 dark:bg-black/80' : '-z-100 opacity-0'"
    >
      <template v-if="isGameOver">
        <span>GAME OVER</span>
        <button btn text="3vmin" @click="handleReplay">
          REPLAY
        </button>
      </template>
      <template v-if="isClearance && !isContinue">
        <span text="orange-400 dark:yellow-400">YOU WIN</span>
        <button btn="~ orange dark:yellow" text="3vmin" @click="handleContinue">
          CONTINUE
        </button>
      </template>
    </div>
  </div>
</template>
