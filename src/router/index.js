import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import Login from '../views/Login.vue'
import CadastroView from '../views/CadastroView.vue'
import ConfirmBuyView from '../views/ConfirmBuyView.vue'
import UserView from '../views/UserView.vue'
import UserData from '../components/UserPageForms/UserData.vue'
import ProductCadForm from '../components/UserPageForms/ProductCadForm.vue'
import SectionCadForm from '../components/UserPageForms/SectionCadForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product/:id',
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
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: UserView,
    children: [
      {
        path: '',
        name: 'userPefil',
        component: UserData,
      },
      {
        path: 'produt-cad',
        name: 'productCad',
        component: ProductCadForm,
      },
      {
        path: 'section-cad',
        name: 'sectionCad',
        component: SectionCadForm,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
