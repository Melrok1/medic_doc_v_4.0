<template>
  <div class="home">
    <!-- <h1>Home</h1> -->
    <form class="loginForm" v-if="state.active_form">
      <h3>Login</h3>
      <input type="email" name="inputEmail" v-model="state.login_register_email" placeholder="E-mail" required>
      <input type="password" name="inputPassword" v-model="state.login_register_password" placeholder="Password" required>
      <button type="submit">Prihlásiť</button>
      <p>Ak nemáte účet môžete si ho <span @click="state.active_form = false">vytvoriť</span> </p>
    </form>

    <form class="registerForm" v-if="!state.active_form">
      <h3>Register</h3>
      <input type="text" name="inputName" v-model="state.login_register_name" placeholder="Name" required>
      <input type="email" name="inputEmail" v-model="state.login_register_email" placeholder="E-mail" required>
      <input type="password" name="inputPassword" v-model="state.login_register_password" placeholder="Password" required>
      <input type="password" name="reInputPassword" v-model="state.login_register_rePassword" placeholder="Confirm password" required>
      <button type="submit">Registrovať</button>
      <p>Späť na <span @click="state.active_form = true">prihlásenie</span></p>
    </form>
  </div>
</template>


<!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->


<script>
import { reactive } from 'vue'

export default {
  name: 'Home',
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


<!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->


<style lang="scss" scoped>

.home {
  
  form {
    width: 350px;
    margin: 1rem auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid purple;
    background: linear-gradient(to bottom, #cecece, #fff);

    input {
      margin-top: 1rem;
      padding: 0.25rem 0.5rem;
      outline: none;
      border: 3px solid purple;
    }

    button {
      margin-top: 2rem;
      border: none;
      outline: none;
      padding: 0.25rem 0.5rem;
      font-size: 1.2rem;
      background: purple;
      color: #fff;
    }

    h3 {
      color: purple;
      font-size: 1.4rem;
    }
    
    p {
      font-size: 0.7rem;
      font-style: italic;
      font-weight: 400;
      margin-top: 1rem;
    }

    span {
      font-weight: 800;
      color: purple;
      cursor: pointer;
    }
  }
}

</style>
