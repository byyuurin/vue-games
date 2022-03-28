<script lang="ts" setup>
interface Props {
  title: string
  visible: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
}

const props = defineProps<Props>()

const style = computed(() => {
  if (typeof props.size === 'number')
    return `--dialog-size: ${props.size}px`
  else
    return ''
})
</script>

<template>
  <teleport to="body">
    <div
      v-show="visible"
      fixed top-0 left-0 z-20 w-full h-full select-none overflow-auto
      flex justify-center items-end sm:items-center
      bg="black/50 dark:black/90"
      :style="style"
    >
      <div
        flex-grow px-4 max-h-full
        before:content-none before:block before:h-4
        after:content-none after:block after:h-4
        :class="{
          'max-w-screen-sm': size === 'sm',
          'max-w-screen-md': size === 'md',
          'max-w-screen-lg': size === 'lg',
          'max-w-screen-xl': size === 'xl',
          'max-w-$dialog-size': typeof size === 'number'
        }"
      >
        <div p-4 rounded bg="white/90 dark:white/10">
          <div text-2xl leading="3em" v-text="title" />
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>
