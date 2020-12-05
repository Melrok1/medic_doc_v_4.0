<template>
  <div class="loginAndRegisterForm">

    <!-- Pecient Login -->
    <form class="loginForm baseForm" 
      v-if="active_form && !storeUser.email"
      @submit.prevent="loginUser"
    >

      <h3>Login</h3>
      <input type="email" name="inputEmail" v-model="login_register_email" placeholder="E-mail" required>
      <input type="password" name="inputPassword" v-model="login_register_password" placeholder="Password" required>
      <p class="err_msg">{{ err_msg }}</p>
      <button type="submit">Prihlásiť</button>
      <p>Ak nemáte účet môžete si ho <span @click="active_form = false">vytvoriť</span> </p>

    </form>

    <!-- Pecient Register -->
    <form class="registerForm baseForm" 
      v-if="!active_form"
      @submit.prevent="registerUser"
    >

      <h3>Register</h3>
      <input type="text" name="inputName" v-model="login_register_name" placeholder="Name" required>
      <input type="email" name="inputEmail" v-model="login_register_email" placeholder="E-mail" required>
      <input type="password" name="inputPassword" v-model="login_register_password" placeholder="Password" required>
      <input 
        type="password" 
        name="reInputPassword" 
        placeholder="Confirm password" 
        v-model="login_register_rePassword" 
        :style="{color: confirmPassword}"
        required
      >
      <p class="err_msg">{{ err_msg }}</p>
      <button type="submit">Registrovať</button>
      <p>Späť na <span @click="active_form = true">prihlásenie</span></p>

    </form>

    <!-- Pacient after login -->
    <form class="baseForm" 
      @submit.prevent 
      v-if="storeUser.displayName"
    >

      <p> Je prihlásený účet <strong> {{ storeUser.email }} </strong> </p>
      <div class="btnWrap">
        <button @click="enter">Vstúpiť</button>
        <button @click="logout">Odhlásiť</button>
      </div>

    </form>

  </div>
</template>


<!--////////////////////////////////////////////// JS ////////////////////////////////////////////// -->


<script>
import { auth } from '@/firebase/init.js'

export default {
  name: 'LoginAndRegisterForm',
  data() {
    return {
      err_msg: '',
      active_form: true,
      login_register_name: null,
      login_register_email: null,
      login_register_password: null,
      login_register_rePassword: null,
    }
  },
  methods: {

    loginUser() {
      auth.signInWithEmailAndPassword(this.login_register_email, this.login_register_password).then (
        console.log('user is logged in')
        // () => {router.push('MedicalRecords')}
      ).catch(err => {
        if (err.code == "auth/user-not-found") {
          this.err_msg = "pacient nenájdený / zaregistrujte sa prosím"
        }else if(err.code == "auth/wrong-password") {
          this.err_msg = "nesprávne heslo"
        }else {
          this.err_msg = err.code
        }
      })
    },


  }
}
</script>


<!--////////////////////////////////////////////// CSS ////////////////////////////////////////////// -->


<style lang="scss" scoped>

// .loginAndRegisterForm {

// }

</style>