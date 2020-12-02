import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import About from '@/views/About.vue'
import Page404 from '@/views/Page404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router
