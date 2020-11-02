<template>
  <!-- Pecient Login -->
  <form class="loginForm baseForm" v-cloak v-if="state.active_form && !storeUser.email" @submit.prevent="loginUser">
    <h3>Login</h3>
    <input type="email" name="inputEmail" v-model="state.login_register_email" placeholder="E-mail" required>
    <input type="password" name="inputPassword" v-model="state.login_register_password" placeholder="Password" required>
    <p class="err_msg">{{ state.err_msg }}</p>
    <button type="submit">Prihlásiť</button>
    <p>Ak nemáte účet môžete si ho <span @click="state.active_form = false">vytvoriť</span> </p>
  </form>

  <!-- Pecient Register -->
  <form class="registerForm baseForm" v-cloak v-if="!state.active_form" @submit.prevent="registerUser">
    <h3>Register</h3>
    <input type="text" name="inputName" v-model="state.login_register_name" placeholder="Name" required>
    <input type="email" name="inputEmail" v-model="state.login_register_email" placeholder="E-mail" required>
    <input type="password" name="inputPassword" v-model="state.login_register_password" placeholder="Password" required>
    <input 
      type="password" 
      name="reInputPassword" 
      placeholder="Confirm password" 
      v-model="state.login_register_rePassword" 
      :style="{color: confirmPassword}"
      required
    >
    <p class="err_msg">{{ state.err_msg }}</p>
    <button type="submit">Registrovať</button>
    <p>Späť na <span @click="state.active_form = true">prihlásenie</span></p>
  </form>

  <!-- Pacient after login -->
  <form class="baseForm" v-cloak @submit.prevent v-if="storeUser.displayName">
    <p> Je prihlásený účet <strong> {{ storeUser.email }} </strong> </p>
    <div class="btnWrap">
      <button @click="enter">Vstúpiť</button>
      <button @click="logout">Odhlásiť</button>
    </div>
  </form>

</template>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<script>
import { computed, reactive } from 'vue'
import { auth } from '@/firebase/init.js'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  name: 'LoginAndRegisterFrom',
  setup() {
    const store2 = useStore();
    const storeUser = computed(() => store2.state.userFromStore);

    const state = reactive({
      active_form: true,
      login_register_name: null,
      login_register_email: null,
      login_register_password: null,
      login_register_rePassword: null,
      login_register_ConfirmPassword: false,
      err_msg: null
    })

    const confirmPassword = computed(() => {
      if(state.login_register_password == state.login_register_rePassword) {
        state.login_register_ConfirmPassword = true;
        return 'green'
      }else {
        state.login_register_ConfirmPassword = false;
        return 'red'
      }
    })

    function loginUser() {
      auth.signInWithEmailAndPassword(state.login_register_email, state.login_register_password).then (
        // console.log('user is logged in')
        () => {router.push('MedicalRecords')}
      ).catch(err => {
        if (err.code == "auth/user-not-found") {
          state.err_msg = "pacient nenájdený / zaregistrujte sa prosím"
        }else if(err.code == "auth/wrong-password") {
          state.err_msg = "nesprávne heslo"
        }else {
          state.err_msg = err.code
        }
      })
    }

    function registerUser() {
      if(state.login_register_ConfirmPassword) {
        auth.createUserWithEmailAndPassword(state.login_register_email, state.login_register_password).then(
          async () => {
            const user = auth.currentUser;
            if(user) {
              await user.updateProfile({
                displayName: state.login_register_name
              });
              router.push('MedicalRecords');
            }else {
              console.log('displayName upradte err');
            }
          },
          // console.log('add new user'),
        )
      }else {
        state.err_msg = 'Zadané hesla sa nezhodujú !';
      }
    }

    function logout() {
      console.log('user is logged out');
      auth.signOut().then(console.log('rly loged out ?')
      ).then(
        () => {
          store2.dispatch('setUser', {})
          router.replace('/')
        },
      )
    }

    function enter() {
      router.push('MedicalRecords');
    }

    return {
      state,
      loginUser,
      registerUser,
      logout,
      confirmPassword,
      storeUser,
      enter
    }
  }
}
</script>




<style lang="scss" scoped>

.err_msg {
  color: red;
  font-size: 0.8rem;
  font-weight: 100;
}

.btnWrap {
  width: 100%;
  @include displayFlex(row, space-evenly, center);
}

</style>