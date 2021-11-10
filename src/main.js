import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 清除默认css样式
import '@/../public/css/reset.css';
// 引入 Echarts
import * as echarts from 'echarts';

let app = createApp(App)
app.config.globalProperties.$echarts = echarts;

app.use(store).use(router).mount('#app')
