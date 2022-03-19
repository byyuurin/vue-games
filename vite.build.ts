import type { BuildOptions } from 'vite'

const regex = /[.]{3}([^.]+)(.css)?/
const replace = (template: string, value: string) => template.replace(/\[name\]/, value.replace(regex, '$1'))

const buildOptions: BuildOptions = {
  rollupOptions: {
    output: {
      // https://rollupjs.org/guide/en/#outputassetfilenames
      assetFileNames: (info) => {
        const template = 'assets/[name].[hash][extname]'
        if (regex.test(info.name)) return replace(template, info.name)
        return template
      },
      // https://rollupjs.org/guide/en/#outputchunkfilenames
      chunkFileNames: (info) => {
        const template = '[name].[hash].js'
        if (regex.test(info.name))return replace(template, info.name)
        return template
      }
    }
  }
}

export default buildOptions
