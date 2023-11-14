import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

import 'vuetify/styles'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

import App from './App.vue'
import './assets/main.css'

createApp(App).use(vuetify).mount('#app')
