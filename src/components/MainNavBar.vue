<template>
  <div class="mainNavBar">
    <nav :class="{stickyBar: scrollPosition > 0}">
      <router-link to="/">Login</router-link> 
      <router-link to="/medicalRecords">MedicalRecords</router-link> 
      <router-link to="/404">404</router-link>
      <a @click="logout()"> logout </a>
    </nav>
  </div>
</template>



<script>
import { auth } from '@/firebase/init.js'

export default {
  name: 'MainNavBar',

   // DATA
  data() {
    return {
      scrollPosition: null
    }
  },

  // METHODS
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    logout() {
      console.log('user is logged out');
      auth.signOut().then(console.log('rly loged out ?')
      ).then(
        () => {
          // store2.dispatch('setUser', {})
          this.$router.replace('/')
        },
      )
    }
  },

  // MOUNTED
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  }
}
</script>



<style lang="scss" scoped>

.mainNavBar {

  nav {
    @include displayFlex(row, center, center);
    background: transparent;
    width: 100%;
    position: fixed;
    top: 0;
    transition: all 2s cubic-bezier(.77,.01,.26,.98);   

    a {
      text-decoration: none;
      color: #858585;
      margin-right: 1rem;
      transition: all 2s cubic-bezier(.77,.01,.26,.98); 
    }
  }

  .stickyBar {
    background: #858585;

    a {
      color: #fff;
    }
  }

}


</style>