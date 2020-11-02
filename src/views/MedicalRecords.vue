<template>
  <medicalRecordsNavBar />
  <h1>Medical Records</h1>
  <p><strong>user data:</strong></p>
  <p> {{ state.user2.displayName }} </p>
  <p> {{ state.user2.email }} </p>
  <p> {{ state.user2.uid }} </p>  
</template>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<script>
import medicalRecordsNavBar from '@/components/MedicalRecords_NavBar.vue'
import { reactive } from 'vue'
import { auth } from '@/firebase/init.js'

export default {
  name: 'MedicalRecords',
  components: {
    medicalRecordsNavBar
  },
  setup() {
    const state = reactive({
      user: null,
      user2: auth.currentUser
    })

    // onMounted(() => {
    //   auth.onAuthStateChanged(user => {
    //     if(user) {
    //       state.user = user;
    //     }
    //   })
    // } 
    // )

    return {
      state,
    }
  }
}
</script>