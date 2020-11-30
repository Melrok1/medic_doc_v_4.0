<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link> 
      <router-link to="/404">404</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  #nav {
    background: rgb(133, 133, 133);
    @include displayFlex(row, center, center);

    a {
      text-decoration: none;
      color: black;
      margin-right: 1rem;
    }
  }
</style>
