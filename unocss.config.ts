import { defineConfig, presetAttributify, presetIcons, presetWind } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'
import { createShortcuts } from './src/utils/style-shortcuts'

export default defineConfig({
  theme: {
    colors: {
      vue: '#42b983'
    }
  },
  shortcuts: createShortcuts({
    'theme-container': 'text-gray-700 bg-white dark:bg-dark-800 dark:text-light-700'
  }),
  presets: [
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        width: '1.2em',
        height: '1.2em',
        verticalAlign: 'middle'
      }
    }),
    presetWind()
  ],
  transformers: [transformerDirective()],
  safelist: []
})
