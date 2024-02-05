import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ProductList from '../views/ProductList.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductDetails from '../views/ProductDetails.vue'
import PanierView from '../views/PanierView.vue'
import ManageOrders from '../views/ManageOrders.vue'
import ManageUsers from '../views/ManageUsers.vue'

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
    path: '/gestion-commandes',
    name: 'gestion-commandes',
    component: ManageOrders
  },
  {
    path: '/gestion-utilisateurs',
    name: 'gestion-utilisateurs',
    component: ManageUsers
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
