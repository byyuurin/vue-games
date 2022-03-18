import '@unocss/reset/tailwind.css'
import 'uno.css'
import '/src/styles/main.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'

const head = createHead()

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(head).use(router).mount('#app')
