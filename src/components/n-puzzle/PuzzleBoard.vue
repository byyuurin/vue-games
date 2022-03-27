<script lang="ts" setup>
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

const size = ref({
  width: props.size,
  height: props.size,
  gaps: props.state.options.gaps
})

const style = computed(() => {
  const { width, height, gaps } = unref(size)
  const { columns } = props.state.options
  return `
    --puzzle-width: ${width * columns + (columns - 1) * gaps}px;
    --cell-width: ${width}px;
    --cell-height: ${height}px;
    --cell-gap: ${isComplete.value ? 0 : gaps}px;
  `
})

watch(()=> props.src, () => {
  isLoading.value = true
})

function handleLoadSuccess(e: Event) {
  const { columns, rows } = props.state.options
  const el = e.target as HTMLImageElement
  const ceil = (n: number) => Math.ceil(n)

  const box = {
    scale: 1.0,
    width: el.width / columns,
    height: el.height / rows
  }

  if (box.width < box.height && box.width < props.size)
    box.scale = props.size / box.width

  if (box.height < box.width && box.height < props.size)
    box.scale = props.size / box.height


  size.value = {
    ...unref(size),
    width: ceil(box.width * box.scale),
    height: ceil(box.height * box.scale)
  }

  nextTick(()=> {
    isLoading.value = false
  })
}
</script>

<template>
  <div relative p-6 :style="style">
    <div text-center overflow-auto select-none>
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
          v-if="isLoading && src" z="-9999" fixed invisible w-100px h-auto :src="src"
          @load="handleLoadSuccess"
        >
      </div>
    </div>
  </div>
</template>
