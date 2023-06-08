import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import VueCookies from 'vue3-cookies'
import VCreditCard from 'v-credit-card';

createApp(App)
.use(store)
.use(router)
.use(VueCookies)
.component('v-credit-card', VCreditCard).mount('#app')

