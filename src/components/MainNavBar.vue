<template>
  <div class="mainNavBar">
    <nav :class="{stickyBar: scrollPosition > 0}">
      <router-link to="/">Login</router-link> 
      <router-link to="/about">About</router-link> 
      <router-link to="/404">404</router-link>
    </nav>
  </div>
</template>



<script>
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