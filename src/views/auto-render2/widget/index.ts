import { App, defineAsyncComponent } from 'vue'

const NameSpace = 'Jxl'
const AsyncComponent = {
  install(app: App) {
    //vite glob 动态加载
    const asyncModulesFiles: any = import.meta.glob('./widget/**/*.tsx')
    // 采用动态加载的方式导出
    for (const key of Object.keys(asyncModulesFiles)) {
      console.error('loader glob :', key)
      const value = asyncModulesFiles[key]
      //名称 正则匹配出来
      const fileName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
      console.error('moduleName:', fileName)
      if (value) {
        const asyncComp = defineAsyncComponent({
          loader: value,
          delay: 200,
          timeout: 3000,
        })
        app.component(`${NameSpace}${fileName}`, asyncComp)
      } else {
        console.error(`${key} is not a valid component`)
      }
      //具体的内容，都是每个js中返回值  value.default
      // AsyncModules[moduleName] = value
    }
  },
}
export { AsyncComponent }
