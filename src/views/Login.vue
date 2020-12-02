<template>
  <div class="login">
    <loginAndRegisterForm />
  </div>
</template>




<script>
import loginAndRegisterForm from '@/components/Login_pacientLoginAndRegisterForm.vue'

export default {
  name: 'Login',

  // COMPONTNTS
  components: {
    loginAndRegisterForm
  },

  // DATA
  data() {
    return {
      
    }
  }
}
</script>





<style lang="scss" scoped>

.login {
  @include displayFlex(row, center, center);
  min-height: calc(100vh - 25px);

  p {
    position: fixed;
    top: 50px;
    left: 0;
  }
}

</style>
