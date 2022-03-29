<script lang="ts" setup>
const route = useRoute()
const appTitle = 'Vue Games'
const title = ref('')

useHead({ title })

const toHtmlTitle = (title = '') => {
  if (title && title !== appTitle) return `${title} - ${appTitle}`
  return appTitle
}

watch(() => route.meta, (meta) => {
  if (typeof route.name === 'string') title.value = toHtmlTitle(route.name)
  if (typeof meta.title === 'string') title.value = toHtmlTitle(meta.title)
})
</script>

<template>
  <div font-sans flex="~ col" h-full overflow-auto @contextmenu.capture="(e) => e.preventDefault()">
    <app-header />
    <div flex="grow">
      <div w-full min-h-full>
        <router-view />
      </div>
    </div>
  </div>
</template>
