import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppingMall from '../views/ShoppingMall.vue'
import REgister from '../views/Register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ShoppingMall',
    component: ShoppingMall
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
