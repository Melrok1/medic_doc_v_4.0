import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/firebase/init.js'
import Login from '@/views/Login.vue'
import MedicalRecords from '@/views/MedicalRecords.vue'
import Page404 from '@/views/Page404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/medicalRecords',
    name: 'MedicalRecords',
    component: MedicalRecords,
    meta: {
      requiresAuth: true
    }
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


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;
  if (requiresAuth && !currentUser){
    next('/');
  }else{
    next();
  }
});

export default router
