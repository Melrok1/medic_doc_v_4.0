<template>
  <div class="home">

    <!-- <p v-if="stats.user">{{ stats.user.email }}</p>
    <p style="color: red"> {{ storeUser.email }}</p> -->

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


    const stats = reactive({
      user: {},
      toggle: false
    })

    // const storeUser = computed(() => {
    //   return stats.user = store.stats.user
    // })

    // HOOKS
    // onMounted(() => {
    // followUser();
    //   store.dispatch('setUser', stats.user);
    // }),
    // onUnmounted(() => {
    //   store.dispatch('setUser', null);
    // }),
    onMounted(() => {
      auth.onAuthStateChanged(user => {
        stats.toggle = !!user;
        if(user) {
          stats.user = user;
          store2.dispatch('setUser', stats.user);
          // stats.user.email = user.email;
          // stats.user.name = user.displayName;
        }
      })
    } 
    )


    return {
      stats,
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
