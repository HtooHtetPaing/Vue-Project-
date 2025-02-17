import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './assets/index.css'

const app = createApp(App);
const pinia = createPinia()

// app.use(createPinia())
app.use(VueQueryPlugin)
app.use(pinia)
app.use(router)

app.mount('#app')
