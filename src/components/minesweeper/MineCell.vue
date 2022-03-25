<script lang="ts" setup>
import { isDev } from '/src/composables/shared'
import type { CellPosition } from '../../composables/minesweeper'

interface Props {
  position: CellPosition
  counts?: number
  dangered?: boolean
  flagged?: boolean
  viewed?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), { counts: 0, position: () => ({ x: 0, y: 0 }) })

const statusClasses = computed(() => {
  const result: string[] = []
  const colors = [
    'text-transparent',
    'text-indigo-600',
    'text-blue-600',
    'text-teal-600',
    'text-green-600',
    'text-yellow-600',
    'text-amber-600',
    'text-orange-600',
    'text-red-600'
  ]

  if (props.viewed) {
    if (props.dangered)
      result.push('bg-red-500/50')
    else
      result.push(colors[props.counts])
  }
  else {
    result.push('bg-gray-500')

    if (!props.flagged)
      result.push('hover:bg-opacity-20 active:bg-opacity-25')
  }

  return result
})
</script>

<template>
  <button
    m="1px"
    border="0.5 gray-400/10"
    bg-opacity-10
    inline-block min-w-10 min-h-10 rounded-sm
    flex justify-center items-center
    text-xl font-bold select-none
    disabled:pointer-events-none
    :disabled="disabled"
    :class="statusClasses"
  >
    <template v-if="viewed || flagged">
      <i v-if="flagged" i-mdi-flag text-red-500 />
      <i v-else-if="dangered" i-mdi-mine />
      <span v-else>{{ counts }}</span>
    </template>
    <template v-else-if="isDev">
      <i v-if="dangered" text="gray-500/50" i-mdi-mine />
      <i v-else-if="flagged" text="gray-500/50" i-mdi-flag text-red-500 />
      <span v-else text="gray-500/50">{{ counts }}</span>
    </template>
  </button>
</template>
