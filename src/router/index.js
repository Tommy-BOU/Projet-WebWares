import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ProductList from '../views/ProductList.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserList from '../views/UserList.vue'
import ProductDetails from '../views/ProductDetails.vue'
import PanierView from '../views/PanierView.vue'
import ConfirmationView from '../views/ConfirmationView.vue'

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: MainPage
  },
  {
    path: '/produits',
    name: 'produits',
    component: ProductList
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: RegisterView
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: LoginView
  },
  {
    path: '/deconnexion',
    name: 'deconnexion',
    component: LogoutView
  },
  {
    path: '/utilisateurs',
    name: 'utilisateurs',
    component: UserList
  },
  {
    path: '/produits-details/:id',
    name: 'produits-details',
    component: ProductDetails
  },
  {
    path: '/panier',
    name: 'panier',
    component: PanierView
  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: ConfirmationView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
