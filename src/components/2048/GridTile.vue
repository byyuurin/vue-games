<script lang="ts" setup>
interface Props {
  x: number
  y: number
  value: number
  mergeIndex: number|null
}
const props = defineProps<Props>()

const style = computed(() => {
  const hue = Math.log2(props.value) * 18
  return `
  --hue: ${hue};
  --x: ${props.x};
  --y: ${props.y};
  `
})
</script>

<template>
  <div class="tile" :style="style" v-text="value" />
</template>

<style>
@keyframes tile-generated {
  0% {
    opacity: 0.5;
    transform: scale(0.5)
  }
}
</style>

<style scoped>
.tile {
  --top: calc((var(--cell-size) + var(--grid-gap)) * var(--y));
  --left: calc((var(--cell-size) + var(--grid-gap)) * var(--x));
  --background: hsl(var(--hue), 50%, 40%);
  --color: hsl(var(--hue), 50%, 80%);
  @apply transition-all duration-100 animate-name-tile-generated animate-duration-200 animate-ease-in-out
  absolute top-$top left-$left font-bold text-$color bg-$background;
}
</style>
