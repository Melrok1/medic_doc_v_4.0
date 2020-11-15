<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

body {
  min-height: 100vh;
  background-color: #fdfdfd;
  background-image: url("#{$path--rel}/mainBackground_comprim.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  // padding-bottom: 2rem;
}


.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
