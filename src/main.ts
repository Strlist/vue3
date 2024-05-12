import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import Pinia from './store'
import '@arco-design/web-vue/dist/arco.css';
import "@/mockjs/index";
import '@/api/interceptor';
const app = createApp(App);
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon)
app.use(Pinia)
app.mount('#app')
