<template>
  <div class="loginAndRegisterForm">
    <!-- v-if="active_form && !storeUser.email" -->

    <!-- Pecient Login -->
    <form class="loginForm baseForm" 
      v-if="active_form"
      
      @submit.prevent="loginUser"
    >

      <h3>Login</h3>
      <input type="email" name="inputEmail" v-model="login_register_email" placeholder="E-mail" required>
      <input type="password" name="inputPassword" v-model="login_register_password" placeholder="Password" required>
      <p class="err_msg">{{ err_msg }}</p>
      <button type="submit" class="btnDefault">Prihlásiť</button>
      <p class="sw_msg">Ak nemáte účet môžete si ho <span @click="active_form = false">vytvoriť</span> </p>

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
      <button type="submit" class="btnDefault">Registrovať</button>
      <p class="sw_msg">Späť na <span @click="active_form = true">prihlásenie</span></p>

    </form>

    <!-- Pacient after login -->
    <!-- <form class="baseForm" 
      @submit.prevent 
      v-if="storeUser.displayName"
    >

      <p> Je prihlásený účet <strong> {{ storeUser.email }} </strong> </p>
      <div class="btnWrap">
        <button @click="enter" class="btnDefault">Vstúpiť</button>
        <button @click="logout" class="btnDefault">Odhlásiť</button>
      </div>

    </form> -->

  </div>
</template>


<!--////////////////////////////////////////////// JS ////////////////////////////////////////////// -->


<script>
import { auth } from '@/firebase/init.js'

export default {
  name: 'LoginAndRegisterForm',

  // DATA
  data() {
    return {
      err_msg: '',
      active_form: true,
      login_register_name: null,
      login_register_email: null,
      login_register_password: '',
      login_register_rePassword: '',
      login_register_ConfirmPassword: false
    }
  },

  // COMPUTED
  computed: {
    confirmPassword() {
      if(this.login_register_password == this.login_register_rePassword) {
        this.confirmPasswordStatus(true);
        return 'green';
      }else {
        this.confirmPasswordStatus(false);
        return 'red';
      }
    }
  },

  // METHODS
  methods: {
    confirmPasswordStatus(x) {
      if(this.login_register_password.length > 0 && this.login_register_rePassword.length > 0) {
        this.login_register_ConfirmPassword = x;
      } else {
        this.login_register_ConfirmPassword = false;
      }
    },

    loginUser() {
      auth.signInWithEmailAndPassword(this.login_register_email, this.login_register_password).then (
        // console.log('user is logged in'),
        () => {this.$router.push('MedicalRecords')}
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

    registerUser() {
      if(this.login_register_ConfirmPassword) {
        auth.createUserWithEmailAndPassword(this.login_register_email, this.login_register_password).then(
          async () => {
            const user = auth.currentUser;
            if(user) {
              await user.updateProfile({
                displayName: this.login_register_name
              });
              // await db.collection('users').doc(user.uid).collection('Medical_Records').doc();
              // await db.collection('users').doc(user.uid).collection('Personal_Records').add({});
              this.$router.push('MedicalRecords');
            }else {
              console.log('displayName upradte err');
            }
          },
          // console.log('add new user'),
        )
      }else {
        this.err_msg = 'Zadané hesla sa nezhodujú !';
      }
    },

    logout() {
      console.log('user is logged out');
      auth.signOut().then(console.log('rly loged out ?')
      ).then(
        () => {
          // store2.dispatch('setUser', {})
          this.$router.replace('/')
        },
      )
    },

    enter() {
      this.$router.push('MedicalRecords');
    }
  }
}
</script>


<!--////////////////////////////////////////////// CSS ////////////////////////////////////////////// -->


<style lang="scss" scoped>

// .loginAndRegisterForm {

// }

</style>