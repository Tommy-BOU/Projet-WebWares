import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ProductList from '../views/ProductList.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductDetails from '../views/ProductDetails.vue'
import PanierView from '../views/PanierView.vue'
import ManageOrders from '../views/ManageOrders.vue'
import ManageUsers from '../views/ManageUsers.vue'
import ManageProducts from '../views/ManageProducts.vue'
import ManageCategory from '../views/ManageCategory.vue'

import TermesConditions from '../views/TermesConditions.vue'
import PolitiqueDeConfidentialite from '../views/PolitiqueDeConfidentialite.vue'
import MentionsLegales from '../views/MentionsLegales.vue'




const routes = [
  {
    path: '/',
    name: 'accueil',
    component: MainPage
  },
  {
    path: '/profil',
    name: 'profil',
    component: ProfileView
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
  {

    path: '/gestion-produits',
    name: 'gestion-produits',
    component: ManageProducts
  },
  {
    path: '/gestion-categories',
    name: 'gestion-categories',
    component: ManageCategory
  },
  {
    path: '/termes-conditions',
    name: 'termes-conditions',
    component: TermesConditions
  },
  {
    path: '/politique-de-confidentialite',
    name: 'politique-de-confidentialite',
    component: PolitiqueDeConfidentialite
  },
  {
    path: '/mentions-legales',
    name: 'mentions-legales',
    component: MentionsLegales
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router