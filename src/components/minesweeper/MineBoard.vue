<script lang="ts" setup>
import type { BoardCell, CellPosition } from '../../composables/minesweeper'

interface Props {
  status: 'win' | 'lose' | null
  board: BoardCell[][]
}

withDefaults(defineProps<Props>(), { board: () => [] })

interface Emit {
  (event: 'click', position: CellPosition): void
  (event: 'dblclick', position: CellPosition): void
  (event: 'contextmenu', position: CellPosition): void
}

const emit = defineEmits<Emit>()
</script>

<template>
  <div relative p-6>
    <div text-center overflow-auto>
      <div inline-block>
        <div
          v-for="cells, y of board" :key="y"
          w-auto m-auto flex items-center
        >
          <mine-cell
            v-for="cell, x of cells" :key="x"
            flex-shrink-0
            v-bind="cell"
            @click="emit('click', cell.position)"
            @dblclick="emit('dblclick', cell.position)"
            @contextmenu.prevent="emit('contextmenu', cell.position)"
          />
        </div>
      </div>
      <div
        v-if="status"
        absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center
        bg="gray-50/50 dark:dark-50/50"
      >
        <span
          text="8xl shadow" select-none
          :class="{
            'text-white/10 dark:text-white/20': status==='lose',
            'text-orange-400/50 dark:text-orange-400/50': status==='win',
          }"
        >{{ status.toUpperCase() }}</span>
      </div>
    </div>
  </div>
</template>
