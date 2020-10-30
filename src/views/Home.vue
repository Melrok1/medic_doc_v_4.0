<template>
  <div class="home">
    <!-- <h1>Home</h1> -->
    <section class="doctorForms">
      <!-- TODO ///// sprav prihlasovanie pre lekárov na základe rod. cisla a spec. hesla -->
    </section>
    <section class="pacientFroms">
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
    </section>
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
  @include displayFlex(column, center, center);
  min-height: 100vh;


  form {
    @include displayFlex(column, center, center);
    width: 350px;
    padding: 1rem;
    border: 3px solid $Primary_color;
    background: linear-gradient(to bottom, #cecece, #fff);
    transform: translateY(-50%);

    input {
      margin-top: 1rem;
      padding: 0.25rem 0.5rem;
      outline: none;
      border: 3px solid $Primary_color;
    }

    button {
      margin-top: 2rem;
      border: none;
      outline: none;
      padding: 0.25rem 0.5rem;
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: 1px;
      background: $Primary_color;
      color: #fff;
    }

    ::placeholder{
      color: $Primary_color;
      opacity: 0.5;
      // color: red;
    }

    h3 {
      color: $Primary_color;
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
      color: $Primary_color;
      cursor: pointer;
    }
  }
}

</style>
