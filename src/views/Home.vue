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
import { reactive, onMounted, computed } from 'vue'
import { auth } from '@/firebase/init.js'
import { useStore } from 'vuex'
// import store from '@/store'

export default {
  name: 'Home',
  components: {
    pacientLoginAndRegisterForm
  },
  setup() {
    const store2 = useStore();
    const storeUser = computed(() => store2.state.userFromStore)


    const state = reactive({
      user: {},
      toggle: false
    })

    // HOOKS
    onMounted(() => {
      auth.onAuthStateChanged(user => {
        state.toggle = !!user;
        if(user) {
          state.user = user;
          store2.dispatch('setUser', state.user);
          // state.user.email = user.email;
          // state.user.name = user.displayName;
        }
      })
    } 
    )


    return {
      state,
      storeUser
    }

  }
}
</script>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<style lang="scss" scoped>

.home {
  @include displayFlex(column, center, center);
  min-height: 100vh;
  
  p {
    width: 50%;
    transform: translateY(-200px);
  }
}

</style>
