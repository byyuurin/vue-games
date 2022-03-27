<script lang="ts" setup>
import type { CellPosition, CellSize } from '/src/composables/n-puzzle'
import { isComplete, isLoading } from '/src/composables/n-puzzle'

interface Props {
  sequence: number
  origin: CellPosition
  position: CellPosition
  columns: number
  gaps: number
  invisible?: boolean
  reversed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  origin: () => ({ x: 0, y: 0 }),
  position: () => ({ x: 0, y: 0 }),
  columns: 0,
  gaps: 0,
  invisible: false
})

const slots = useSlots()

const el = ref<HTMLDivElement|null>(null)
const size = ref<CellSize>({ width: 0, height: 0 })

const matched = computed(() => props.origin.x === props.position.x && props.origin.y === props.position.y)
const style = computed(() => {
  const { origin, position, columns, gaps, reversed = false } = props
  const { width, height } = unref(size)
  const offset = {
    x: (reversed ? origin : position).x - origin.x,
    y: (reversed ? origin : position).y - origin.y
  }
  const self = {
    x: offset.x * (width + gaps),
    y: offset.y * (height + gaps)
  }
  const inner = {
    x: -1 * origin.x * width + origin.x * gaps,
    y: -1 * origin.y * height + origin.y * gaps,
    width: columns * width + (columns - 1) * gaps
  }
  return `
  --self-width: ${width}px;
  --self-height: ${height}px;
  --self-x: ${self.x}px;
  --self-y: ${self.y}px;
  --inner-width:${inner.width}px;
  --inner-x:${inner.x}px;
  --inner-y:${inner.y}px;
  `
})

function init() {
  size.value = {
    width: el.value!.offsetWidth,
    height: el.value!.offsetHeight
  }
}

onMounted(init)
watch([isLoading, isComplete], () => init())
</script>

<template>
  <div
    ref="el"
    relative flex justify-center items-center overflow-hidden
    bg="gray-500/10"
    class="group translate-x-$self-x translate-y-$self-y hover:cursor-pointer"
    :class="{
      'transition duration-150': !invisible,
      'invisible': !isComplete && invisible,
      '-z-1 pointer-events-none': isComplete || reversed || invisible
    }"
    :style="style"
  >
    <div absolute top-0 left-0 pointer-events-none transition duration-100
         :class="{
           'group-hover:bg-gray-500/10': !slots.default,
           'group-hover:opacity-50 w-$inner-width translate-x-$inner-x translate-y-$inner-y': slots.default,
           'opacity-50': reversed || !matched
         }"
    >
      <slot>
        <div flex justify-center items-center class="w-$self-width h-$self-height">
          {{ sequence }}
        </div>
      </slot>
    </div>
  </div>
</template>
