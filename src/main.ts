import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupElementPlus } from './plugins/elementPlus'
import { setupMyPlugin } from './plugins/myPlugin'
import { setupStore } from './stores'
import './styles/scss/main.scss'

const app = createApp(App)
setupElementPlus(app)
setupStore(app)
setupMyPlugin(app)

const envMode = import.meta.env.MODE
//vconsole 动态导入控制
// if (['sit', 'development'].includes(envMode)) {
//   import('vconsole').then((module) => {
//     const vconsole = module.default
//     new vconsole()
//   })
// }

// app.use(BaseComponens)
// app.use(BaseDirective)

// import命令会被 JavaScript 引擎静态分析，不能放在代码块里（if代码中）
// import()函数支持动态加载模块和按条件导入，可以放在代码块里（if代码中）
// 至于true为什么要加引号，大家体验一下不加的情况就能明白了，.env.development文件中的value都自动加了引号。
// console.log(process.env.NODE_ENV,typeof process.env.NODE_ENV)
console.log('vite import meta:', envMode)
envMode === 'development' && import('./mock')
app.use(router).mount('#app')
