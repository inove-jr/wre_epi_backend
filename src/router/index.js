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
import BannerConfigForm from '../components/UserPageForms/BannerConfigForm.vue'
import ListaPedidios from '../components/ListPedidos.vue'
import PasswordRecovery from '../views/PasswordRecovery.vue'
import ChangePassword from '../views/ChangePassword.vue'
import SearchView from "../views/SearchView.vue"


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
    props: true
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
    path: '/password-recovery',
    name: 'passwordRecovery',
    component: PasswordRecovery
  },
  {
    path: '/change-password/:token',
    name: 'changePassword',
    component: ChangePassword
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
    path: "/perfil",
    component: UserView,
    children: [
      {
        path: "/perfil/:userId",
        name: "userPefil",
        component: UserData,
        props: true,
      },
      {
        path: "/perfil/pedidos/:userId",
        name: "listPedidos",
        component: ListaPedidios,
      },
      {
        path: "/perfil/produt-cad/:userId",
        name: "productCad",
        component: ProductCadForm,
      },
      {
        path: "/perfil/section-cad/:userId",
        name: "sectionCad",
        component: SectionCadForm,
      },
      {
        path: "/perfil/banners/:userId",
        name: "bannerConfig",
        component: BannerConfigForm,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
