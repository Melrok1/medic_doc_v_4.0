<template>
  <div class="page404">
    <router-link to="/" class="link"> Medic Doc </router-link>
    <div class="headerWrap">
      <h1>404</h1>
    </div>
    <p>stránka nenájdená</p>
  </div>
</template>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<script>
import { reactive } from 'vue'


export default {
  name: 'Page404',
  setup() {

    const state = reactive({

    })

    return {
      state
    }
  }
}
</script>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<style lang="scss" scoped>

.page404 {
  @include displayFlex(column, center, center);
  height: 100vh;

  .link {
    width: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: none;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 1.8rem;
    color: #fff;
    padding: 0.2rem 0;
    background: $Primary_color;
  }

  h1 {
    color: #fff;
    font-size: 7.5rem;
    letter-spacing: 8px;
    // z-index: 99;
  }
  
  .headerWrap {
    @include displayFlex(column, center, center);
    position: relative;
    width: 20rem;
    height: 20rem;
    // clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    // z-index: 2;
    filter: drop-shadow(2px 2px 2px rgb(89, 89, 89));

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #74b8df;
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      z-index: -1;
    }

    &::after {
      content: '';
      position: absolute;
      top: -10px;
      right: -10px;
      bottom: -10px;
      left: -10px;
      background: #fff;
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      z-index: -2;
    }

  }

  p {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    margin-top: 2rem;
  }

}

</style>