import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '../src/plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { defineRule } from '@vee-validate/rules';
import { required, email, min } from '@vee-validate/rules';



loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
