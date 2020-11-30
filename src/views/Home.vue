<template>
  <div class="home">
    <h1>Home</h1>
    <p>{{ scrollPosition }}</p>
  </div>
</template>




<script>

export default {
  name: 'Home',
  data() {
    return {
      scrollPosition: null
    }
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  }
}
</script>





<style lang="scss" scoped>

.home {
  height: 200vh;

  p {
    position: fixed;
    top: 50px;
    left: 0;
  }
}

</style>
