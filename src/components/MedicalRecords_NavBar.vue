<template>
  <nav>
    <a href="#" v-if="state.user" @click="showUserProfile">{{ state.user.email }}</a>
    <a href="#" @click="logout">Odhlásiť</a>
  </nav>

</template>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<script>
import { reactive, onMounted } from 'vue'
import { auth } from '@/firebase/init.js'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  name: 'MedicalRecordsNavBar',
  setup() {
    const store2 = useStore();
    // const storeUser = computed(() => store2.state.userFromStore);
    
    const state = reactive({
      user: null,
      toggle: false,
      showUserProfileLocalVar: false
    })

    function logout() {
      console.log('user is logged out');
      auth.signOut().then(console.log('rly loged out ?')
      ).then(
        () => {
          router.replace('/')
          store2.dispatch('setUser', {})
        },
      )
    }

    function showUserProfile() {
      state.showUserProfileLocalVar = !state.showUserProfileLocalVar;
      console.log(state.showUserProfileLocalVar);
      store2.dispatch('showProfile', state.showUserProfileLocalVar);
    }

    onMounted(() => {
      auth.onAuthStateChanged(user => {
        state.toggle = !!user;
        if(user) {
          state.user = user;
        }
      })
    } 
    )

    return {
      state,
      logout,
      store2,
      showUserProfile
    }
  }
}
</script>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<style lang="scss" scoped>

nav {
  @include displayFlex(row, flex-end, center);
  width: 100%;
  height: 2.2rem;
  background: $Primary_color;
  border-bottom: 3px solid $Primary_color;
  border-bottom: 3px solid darken($Primary_color, 5%);

  a {
    margin-right: 4rem;
    color: #fff;
    text-decoration: none;
    font-weight: 800;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    // border: 1px solid black;
  }

  a:last-child {
    margin-right: 0rem;
  }
}

</style>