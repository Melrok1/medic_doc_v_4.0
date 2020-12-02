<template>
  <div id="app">
    <mainNavBar />
    <router-view/>
  </div>
</template>


<script>
import mainNavBar from '@/components/MainNavBar.vue'

export default {
  name: 'App',

  // COMPONENTS
  components: {
    mainNavBar
  }
}
</script>


<style lang="scss">

#app {
  padding: 25px 0 0 0;
}

</style>
