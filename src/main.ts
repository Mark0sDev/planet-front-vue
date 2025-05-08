import '@/app/styles/main.scss'

import { createApp } from 'vue'
import { router } from '@/app/router'
import i18n from './plugins/i18n'

import App from './app/App.vue'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.mount('#app')
