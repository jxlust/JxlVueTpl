import type { Plugin } from 'vite'
interface removeEsOptions {
  isRemove?: boolean
}
export function viteRemoveEs(options: removeEsOptions, enforce?: 'post' | 'pre'): Plugin {
  // const entries = getEntries(options)
  const { isRemove } = options
  return {
    name: 'vite:removeEs',
    apply: 'build',
    // pre 会较于 post 先执行
    enforce: 'post',
    // transform(code, id) {
    //   if (id.indexOf('.html') >= 0) {
    //     console.log('id:', id)
    //   }
    //   return {
    //     code,
    //     map: null,
    //   }
    // },
    // renderChunk(code, chunk) {
    // },
    async generateBundle(output, bundle) {
      // const files = getFiles(bundle)
      // console.log('bundle:', bundle)
    },
    transformIndexHtml(html) {
      console.log('html:', html)
      if (isRemove) {
        const removeString = `System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))`
        return html
          .replace(/<script type="module"(.*?)<\/script>/g, '')
          .replace(/<script nomodule/g, '<script')
          .replace(removeString, '')
          .replace('data-src', 'src')
      }
    },
  }
}
