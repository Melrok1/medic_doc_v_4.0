<template>
  <!-- Pecient Login -->
  <form class="loginForm" v-if="state.active_form">
    <h3>Login</h3>
    <input type="email" name="inputEmail" v-model="state.login_register_email" placeholder="E-mail" required>
    <input type="password" name="inputPassword" v-model="state.login_register_password" placeholder="Password" required>
    <button type="submit">Prihlásiť</button>
    <p>Ak nemáte účet môžete si ho <span @click="state.active_form = false">vytvoriť</span> </p>
  </form>

  <!-- Pecient Register -->
  <form class="registerForm" v-if="!state.active_form">
    <h3>Register</h3>
    <input type="text" name="inputName" v-model="state.login_register_name" placeholder="Name" required>
    <input type="email" name="inputEmail" v-model="state.login_register_email" placeholder="E-mail" required>
    <input type="password" name="inputPassword" v-model="state.login_register_password" placeholder="Password" required>
    <input type="password" name="reInputPassword" v-model="state.login_register_rePassword" placeholder="Confirm password" required>
    <button type="submit">Registrovať</button>
    <p>Späť na <span @click="state.active_form = true">prihlásenie</span></p>
  </form>
</template>





<script>
import { reactive } from 'vue'

export default {
  name: 'LoginAndRegisterFrom',
  setup() {
    const state = reactive({
      active_form: true,
      login_register_email: null,
      login_register_password: null,
      login_register_name: null
    })

    return {
      state
    }
  }
}
</script>