import { createStore } from 'vuex'
import axios from 'axios'

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

export default createStore({
  state: {
    isLoggedIn,
    paymentUrl:'',
    isAdmin: false,
  },
  getters: {
    paymentUrl: state=>state.paymentUrl,
    isAdmin: state => state.isAdmin
  },
  mutations: {
    setUser(state,user){
      state.user = user
      if(user){
        axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      } else{
        delete axios.defaults.headers.common['Authorization']
      }
    },
    setIsLoggedIn(state,value){
      state.isLoggedIn = value;
      console.log(state.isLoggedIn)
      localStorage.setItem('isLoggedIn', value)
    },
    setIsAdmin(state,value){
      state.isAdmin = value;
      console.log(state.isAdmin)
    },
    setValidatingToken(state, value) {
      state.validatingToken = value;
    },

    paymentUrl(state,url){
      state.paymentUrl=url
    },
  },
  actions: {
    updatePaymentUrl({commit},url){
        commit('paymentUrl',url);
    }
  },
  modules: {
  }
})
