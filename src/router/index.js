import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import Login from '../views/Login.vue'
import CadastroView from '../views/CadastroView.vue'
import ConfirmBuyView from '../views/ConfirmBuyView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product:id',
    name: 'product',
    component: ProductView
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCart
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: CadastroView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/confirm',
    name: 'confirmarCompra',
    component: ConfirmBuyView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
