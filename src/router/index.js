import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('../views/BoardAdmin.vue')
  },
  {
    path: '/qr',
    name: 'qr',
    // lazy-loaded
    component: () => import('../views/BoardUser.vue')
  },
  {
    path: '/create',
    name: 'create',
    // lazy-loaded
    component: () => import('../views/CreateQr.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    // lazy-loaded
    component: () => import('../views/EditQr.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
