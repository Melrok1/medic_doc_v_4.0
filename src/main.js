import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from '@/firebase/init.js'
import store from './store'
import './assets/icons'

let app = '';

auth.onAuthStateChanged(() => {
  if(!app) {
    app = createApp(App).use(store).use(router).mount('#app');
  }
})

// createApp(App).use(store).use(router).mount('#app')
