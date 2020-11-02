import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/init.js'
import Home from '../views/Home.vue'
import About from '@/views/About.vue'
import MedicalRecords from '@/views/MedicalRecords.vue'
import Page404 from '@/views/Page404.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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

// router.beforeEach((to, from, next) => {
//   const curentUser = auth.currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   console.log(requiresAuth + '<<<< requiresAuth')
//   console.log(curentUser + '<<<<<<<< CurentUser')
//   if(requiresAuth && !curentUser) next('/');
//   else if (!requiresAuth && curentUser) next('/about');
//   else next('/medicalRecords');
// })

// router.beforeEach(async(to, from, next) => {
//   const user = store.state.user;

//   if(!user) {
//     await store.dispatch('setUser', {userName: '@_?'});
//     console.log('pls login or register');
//     next({name: 'Home'});
//   }else {
//     next({name: 'MedicalRecords'});
//   }
//   const isAdmin = false;
//   const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
//   if(requiresAdmin && !isAdmin) next({name: 'Home'})
//   else next();
// })

export default router
