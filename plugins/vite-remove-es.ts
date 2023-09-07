import type { Plugin } from 'vite'
// import type { EmittedAsset } from 'rollup'
interface removeEsOptions {
  isRemove?: boolean
}
const transformNoModuleHtml = (htmlText: string) => {
  let htmlArr = htmlText.split(/\r?\n/) || []
  let resultText = ''
  const removeString = `System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))`
  htmlArr.forEach((str) => {
    str = str.replace(/\s?nomodule\s?/g, ' ')
    str = str.replace(removeString, '')
    str = str.replace(/\s?crossorigin\s?/g, ' ')
    str = str.replace(/data-src/g, 'src')
    if (!/type="module"/i.test(str)) resultText += str
  })
  return resultText
}
export default function viteRemoveEs(options: removeEsOptions, enforce?: 'post' | 'pre'): Plugin {
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
    renderStart(ctx, out) {
      // console.log(11, out)
    },
    renderChunk(code, chunk) {
      const id = chunk.fileName
      let needRemove = false
      // const regx = /js\/(main|\.pnpm)\./
      const regx = /js\/(main|main-legacy)\./
      if (regx.test(id)) {
        // console.log('id:', id)
        needRemove = true
      }
      if (needRemove) {
        return {
          code: '',
        }
      }
    },
    async generateBundle(output, bundle, isWrite) {
      // const files = getFiles(bundle)
      console.log('bundle:', Object.keys(bundle))
      const firstKey = Object.keys(bundle)[0]
      const firstFile = bundle[firstKey] as any
      // console.log('ff:', firstFile)
      // console.log(1, isWrite)
      // firstFile.code = ''

      // console.log('zz:', output.chunkFileNames)
      // const htmlFile: any = {
      //   type: 'asset',
      //   source: '122222;var a = 1;',
      //   name: 'Rollup HTML Asset',
      //   fileName: 'jxl.js',
      // }
      // this.emitFile(htmlFile)
    },
    transformIndexHtml(html, ctx) {
      // console.log('html:', ctx)
      if (isRemove) {
        return transformNoModuleHtml(html)
        // const removeString = `System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))`
        // return html
        //   .replace(/<script type="module"(.*?)<\/script>/g, '')
        //   .replace(/<script nomodule/g, '<script')
        //   .replace(removeString, '')
        //   .replace('data-src', 'src')
      }
    },
  }
}
