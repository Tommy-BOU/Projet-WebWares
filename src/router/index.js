import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ProductList from '../views/ProductList.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductDetails from '../views/ProductDetails.vue'

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
    path: '/produits-details/:id',
    name: 'produits-details',
    component: ProductDetails
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
