import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { setupElementPlus } from './plugins/elementPlus'
import { setupMyPlugin } from './plugins/myPlugin'
import { setupStore } from './stores'
import ElementPlus from 'element-plus' //引入element-plus库
import VForm3 from 'vform3-builds' //引入VForm3库
import axios from 'axios' //如果需要axios，请引入
import 'element-plus/dist/index.css' //引入element-plus样式
import './styles/scss/main.scss'
import 'vform3-builds/dist/designer.style.css' //引入VForm3样式
import 'virtual:svg-icons-register'

import { AsyncComponent } from '@/views/auto-render2/loader'
const app = createApp(App)
// setupElementPlus(app)
setupStore(app)
setupMyPlugin(app)
app.use(ElementPlus)
app.use(AsyncComponent)
app.use(VForm3) //全局注册VForm3(同时注册了v-form-designe、v-form-render等组件)
/* 注意：如果你的项目中有使用axios，请用下面一行代码将全局axios复位为你的axios！！ */
;(window as any).axios = axios
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
