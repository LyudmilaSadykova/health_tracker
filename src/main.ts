import './assets/main.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
    },
    icons: {
        defaultSet: 'md',
        aliases,
        sets: {
          md,
        },
      }
  })

const app = createApp(App)

app.use(createPinia()).use(router).use(vuetify).mount('#app');
