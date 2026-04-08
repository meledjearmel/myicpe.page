import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initDocumentTheme } from '@/theme/documentTheme.js'

initDocumentTheme()

createApp(App).use(router).mount('#app')
