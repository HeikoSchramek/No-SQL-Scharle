import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)


// Einfacher Ereignisbus
const eventBus = {
  emit(event, data) {
    app.config.globalProperties.$emit(event, data);
  },
  on(event, callback) {
    app.config.globalProperties.$on(event, callback);
  },
  off(event, callback) {
    app.config.globalProperties.$off(event, callback);
  },
};

app.provide('eventBus', eventBus);


app.use(router)

app.mount('#app')
