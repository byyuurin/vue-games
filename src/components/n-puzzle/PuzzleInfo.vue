<script lang="ts" setup>
interface Props {
  begin: number
  end: number
  steps: number
}
const props = defineProps<Props>()

const now = useNow()
const timeAgo = computed(() => {
  const { begin, end } = props
  let diff = 0

  if (begin && end)
    diff = end - begin

  if (begin && !end)
    diff = +now.value - begin

  return (diff / 1000).toFixed(2).split('.')
})
</script>

<template>
  <div text="2xl black/75 dark:white/75" flex="~ gap-4" justify-center items-center>
    <div flex="~ gap-1" justify-center items-center>
      <i i-mdi-clock-time-twelve-outline />
      <div>
        <span>{{ timeAgo[0] }}</span>
        <span text-lg self-end>.{{ timeAgo[1] }}</span>
      </div>
    </div>

    <div flex="~ gap-1" justify-center items-center>
      <i i-ic-baseline-directions-run />
      <div>{{ steps }}</div>
    </div>
  </div>
</template>
