<template>
  <div class="loginAndRegisterForm">

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

  </div>
</template>


<!--////////////////////////////////////////////// JS ////////////////////////////////////////////// -->


<script>
export default {
  name: 'LoginAndRegisterForm'
}
</script>


<!--////////////////////////////////////////////// CSS ////////////////////////////////////////////// -->


<style lang="scss" scoped>

// .loginAndRegisterForm {

// }

</style>