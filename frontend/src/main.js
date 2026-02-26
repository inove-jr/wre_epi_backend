import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import VueCookies from 'vue3-cookies'
import VCreditCard from 'v-credit-card';
import { baseApiUrl,userKey } from "@/global";
import axios from "axios"

// createApp(App)
// .use(store)
// .use(router)
// .use(VueCookies)
// .component('v-credit-card', VCreditCard).mount('#app')

const validateToken = async () => {
  const userData = JSON.parse(localStorage.getItem(userKey))

  if (!userData) {
    store.commit('setIsLoggedIn', false)
    return
  }

  try {
    const url = `${baseApiUrl}/validateToken`
    const res = await axios.post(url, userData)
    console.log(res.data)
    if (res.data.valid) {
      store.commit('setIsLoggedIn', true)
      store.commit('setUser', userData)
      store.commit('setIsAdmin', res.data.isAdmin)
      console.log(res.data.isAdmin)
    } else {
      localStorage.removeItem(userKey)
      store.commit('setIsLoggedIn', false)
    }
  } catch (error) {
    console.error('Erro ao validar token:', error.message)
    localStorage.removeItem(userKey)
    store.commit('setIsLoggedIn', false)
  }
}

validateToken().then(() => {
    createApp(App)
      .use(store)
      .use(router)
      .use(VueCookies)
      .component('v-credit-card', VCreditCard)
      .mount('#app')
  })