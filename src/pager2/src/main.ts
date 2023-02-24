import { createApp } from 'vue'
import App from './App.bat'
import router from './router/index'
//  import './styles/scss/main.scss'
const app = createApp(App)
// setupElementPlus(app)
// setupMyPlugin(app)

// const envMode = import.meta.env.MODE

app.use(router).mount('#app')
