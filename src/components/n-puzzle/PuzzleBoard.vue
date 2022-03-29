<script lang="ts" setup>
import { breakpoints } from '/src/composables/shared'
import type { CellPosition, GameState } from '/src/composables/n-puzzle'
import { isComplete, isLoading } from '/src/composables/n-puzzle'

interface Props {
  state: GameState
  src?: string
  size: number
  reversed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  size: 100
})

interface Emit {
  (event: 'click', position: CellPosition): void
}

const emit = defineEmits<Emit>()

const el = ref<HTMLDivElement|null>(null)
const size = ref({
  width: props.size,
  height: props.size,
  gaps: props.state.options.gaps
})

const imageMaxWidth = computed(() => {
  const { columns, gaps } = props.state.options
  return breakpoints.md.value || !el.value
    ? props.size
    : Math.floor((el.value.offsetWidth - 20 - (columns - 1) * gaps) / columns)
})
const style = computed(() => {
  const { width, height, gaps } = unref(size)
  const { columns } = props.state.options
  return `
    --fetch-width: ${imageMaxWidth.value}px;
    --puzzle-width: ${width * columns + (columns - 1) * gaps}px;
    --cell-width: ${width}px;
    --cell-height: ${height}px;
    --cell-gap: ${isComplete.value ? 0 : gaps}px;
  `
})

function handleLoadSuccess(e: Event) {
  const { width, height } = e.target as HTMLImageElement

  size.value = { ...unref(size), width, height }

  nextTick(()=> {
    isLoading.value = false
  })
}

watch(()=> [props.src], () => {
  isLoading.value = true
}, {
  immediate: true
})
</script>

<template>
  <div relative p-6 :style="style">
    <div ref="el" text-center overflow-auto select-none>
      <div inline-block>
        <div flex="~ gap-$cell-gap wrap"
             w="$puzzle-width"
             text="4xl dark/20 dark:white/20"
             bg="gray-500/10"
             rounded overflow-hidden
        >
          <puzzle-cell
            v-for="cell, i in state.board"
            :key="i" v-bind="cell" :reversed="reversed"
            w="$cell-width" h="$cell-height"
            @click="emit('click', cell.position)"
          >
            <template v-if="!isLoading && src" #default>
              <img w-full object-cover :src="src">
            </template>
          </puzzle-cell>
        </div>
        <img
          v-if="isLoading && src"
          z="-9999" fixed invisible h-auto :src="src"
          class="w-$fetch-width"
          @load="handleLoadSuccess"
        >
      </div>
    </div>
  </div>
</template>
