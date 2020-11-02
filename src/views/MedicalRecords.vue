<template>
  <div class="medicalRecords" v-cloak>

    <header>
      <medicalRecordsNavBar />
    </header>

    <main>
      <!-- <h1>Medical Records</h1>
      <p><strong>user data:</strong></p>
      <p> {{ currentUser.displayName }} </p>
      <p> {{ currentUser.email }} </p>
      <p> {{ currentUser.uid }} </p>  
      <p>{{ currentUser }}</p> -->
      <p>{{ state.user }}</p>

      <section class="userProfileSection" v-if="store2.state.showUserProfile">
        <form class="userProfileForm" @submit.prevent>
          <p>Meno:</p>
          <input type="text" v-model="state.user.name">
          <p>Email:</p>
          <input type="email" v-model="state.user.email">
          <p>Rodné číslo:</p>
          <input type="text" v-model="state.birthNumber">
          <p>Telefónne číslo:</p>
          <input type="text" v-model="state.phoneNumber">
          <p>Obvodný lekár:</p>
          <input type="text" v-model="state.DoctorName">
          <p>Telefónne číslo na lekára:</p>
          <input type="text" v-model="state.DoctorPhone">
          <input type="checkbox">
          <button>Upraviť údaje</button>
        </form>
      </section>
    </main>

  </div>
</template>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<script>
import medicalRecordsNavBar from '@/components/MedicalRecords_NavBar.vue'
import { onMounted, reactive } from 'vue'
import { auth } from '@/firebase/init.js'
import { useStore } from 'vuex'


export default {
  name: 'MedicalRecords',
  components: {
    medicalRecordsNavBar
  },

  setup() {
    const store2 = useStore();

    // let name2 = ref("");
    // const userName = auth.getInstance().getCurrentUser();

    const state = reactive({
      // name: '',
      // email: '',
      birthNumber: '',
      phoneNumber: '',
      DoctorName: '',
      DoctorPhone: '',
      user: {},
      // user2: currentUser
    })

    // const currentUser = computed(() => {
    //     // state.name = auth.currentUser.displayName
    //     // state.email = auth.currentUser.email
    //   return state.name = auth.getCurrentUser();
    // })

    onMounted(() => {
      auth.onAuthStateChanged(user => {
        if(user) {
          state.user.name = user.displayName;
          state.user.email = user.email;
        }
      })
    } 
    )

    return {
      state,
      // currentUser,
      store2,
      // userName
    }
  }
}
</script>


<style lang="scss" scoped>

.medicalRecords {
  
  main {
    position: relative;
  }

  .userProfileSection {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: calc(100vh - 35.19px);
    background: rgba($Primary_color, 70%);
    color: $Primary_color;
    padding: 2rem 1rem;

    .userProfileForm {
      background: $Form_gradient;
      padding: 0.5rem;
      text-align: left;
      border: 3px solid $Primary_color;

      p {
        margin-top: 1rem;
        margin-bottom: 0.25rem;
        font-weight: 800;
      }

      input {
        display: block;
        border: none;
        outline: none;
        border-bottom: 1px solid $Primary_color;
        background: transparent;
        font-size: 1rem;
      }

      button {
        @include formButton1
      }
    }
  }

}


</style>