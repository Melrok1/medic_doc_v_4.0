<template>
  <div class="home">

    <section class="doctorForms">
      <!-- TODO ///// sprav prihlasovanie pre lekárov na základe rod. cisla a spec. hesla -->
    </section>

    <section class="pacientFroms">
      <pacientLoginAndRegisterForm />
    </section>

  </div>
</template>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<script>
import pacientLoginAndRegisterForm from '@/components/Home_PacientLoginAndRegisterForm'

export default {
  name: 'Home',
  components: {
    pacientLoginAndRegisterForm
  }
}
</script>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<style lang="scss" scoped>

.home {
  @include displayFlex(column, center, center);
  min-height: 100vh;
}

</style>
