import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupElementPlus } from './plugins/element-plus';
// import store from './store'
import './assets/css/base.css';
// import './assets/css/main.styl';
// import BaseComponents from './components/base'
// import BaseDirective from './directive'
const app = createApp(App);

setupElementPlus(app);
// app.use(BaseComponens)
// app.use(BaseDirective)

app.use(router).mount('#app');
