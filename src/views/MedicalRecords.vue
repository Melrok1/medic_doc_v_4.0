<template>
  <div class="medicalRecords">

    <header>
      <medicalRecordsNavBar />
    </header>

    <main>
      <!-- Add folder btn -->
      <section class="foldersWrap">
        <div class="folder" @click="addNewCategory">
          <p class="noselect">+ <br> Add Folder</p>
        </div>
        <div class="folder">
          <p class="noselect">Posledná správa</p>
        </div>
      </section>


      <!-- Created folders -->
      <section class="foldersWrap" v-if="state.cards.length > 0" v-cloak>  <!--  v-if="state.cards.length"  -->
        <div class="cardsCategories" v-for="(card, index) in state.cards" :key="index">
          <div class="folder small" @click="openCategoryPage(card.name)">
            <p class="noselect">+</p>
          </div>
            <p class="cardName noselect">{{ card.name }}</p>
        </div>
      </section>

      <section class="userProfileSection" v-if="store2.state.showUserProfile">
        <form class="userProfileForm" @submit.prevent="updateUserDataFirestore">
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

      <p>{{ state.cards }}</p>

    </main>

    <medicalRecordsAddCategoryForm v-if="store2.state.showAddNewFileForm" />
  </div>
</template>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<script>
import medicalRecordsNavBar from '@/components/MedicalRecords_NavBar.vue'
import medicalRecordsAddCategoryForm from '@/components/MedicalRecords_AddCategoryForm.vue'
import { onMounted, reactive } from 'vue'
import { db, auth } from '@/firebase/init.js'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
import router from '@/router'

export default {
  name: 'MedicalRecords',
  components: {
    medicalRecordsNavBar, medicalRecordsAddCategoryForm
  },

  setup() {
    const store2 = useStore();

    const state = reactive({
      birthNumber: '',
      phoneNumber: '',
      DoctorName: '',
      DoctorPhone: '',
      user: {},
      cards: []
    });

    // const compCateg = computed(() => {
    //   db.collection(state.user.uid).doc("Medical_Records").get()
    //     .then(doc => {
        
    //       console.log(Object.entries(doc.data()));
          
    //       state.cards = Object.entries(doc.data());
    //       // state.cards.push(doc.data());
    //   })
    // })

    // let compCateg = computed(() => {
    //   db.collection(state.user.uid).doc("Medical_Records").get()
    // })

    function openCategoryPage(name) {
      router.push(`/categoryPage/${name}`);
    }

    function addNewCategory() {
      store2.dispatch('showAddNewFileForm', true);
    }

    function updateUserDataFirestore() {
      db.collection(`users/${auth.currentUser.uid}/Personal_Records`).doc('Personal_data').set({
        birthNumber: state.birthNumber,
        phoneNumber: state.phoneNumber,
        DoctorName: state.DoctorName,
        DoctorPhone: state.DoctorPhone
      })
    }
    
    onMounted(() => {
      auth.onAuthStateChanged(user => {
        if(user) {
          // console.log(user);

          state.user.name = user.displayName;
          state.user.email = user.email;
          state.user.uid = user.uid;

          db.collection(`users/${auth.currentUser.uid}/Personal_Records`).doc('Personal_data').get()
          .then(doc => {
            if(doc.exists) {
              state.birthNumber = doc.data().birthNumber;
              state.phoneNumber = doc.data().phoneNumber;
              state.DoctorName = doc.data().DoctorName;
              state.DoctorPhone = doc.data().DoctorPhone;
              console.log(doc.docs.data())
            }else {
              console.log( 'Document not found' );
            }
          })
          .catch(err => console.log('Err in get doc' + err));

        }

        db.collection(`users/${auth.currentUser.uid}/Medical_Records`).onSnapshot(snapshot => {
          let changes = snapshot.docChanges();
          // console.log(changes);
          changes.forEach(change => {
            if(change.type == 'added') {
              state.cards.push(change.doc.data());
              // console.table(change.doc.data());
              // console.log(state.cards.length)
            }
          })
        })
        // .then(doc => {
        //   state.cards = Object.entries(doc.data());
        // })
      })



    })


    return {
      // compCateg,
      openCategoryPage,
      updateUserDataFirestore,
      addNewCategory,
      state,
      store2,
    };
  }
}
</script>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<style lang="scss" scoped>

.medicalRecords {
  
  main {
    position: relative;

    .foldersWrap {
      @include displayFlex(row, center, center);
      width: 80%;
      margin: 0 auto;
      padding: 1rem;
      flex-wrap: wrap;
      // background: #000;

      .folder {
        @include displayFlex(column, center, center);
        position: relative;
        width: 5rem;
        height: 5rem;
        margin: 1rem 3rem;
        color: #fff;
        font-weight: 900;
        letter-spacing: 1px;
        filter: drop-shadow(2px 2px 2px rgb(89, 89, 89));
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        p {
          transform: translateY(-0.4rem);
        }

        &:hover {
          transform: scale(1.1);
          z-index: 99;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          font-size: 1.8rem;
          font-weight: 900;
          background: $Primary_color;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transform: rotate(-90deg);
          z-index: -1;
        }

        &::after {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: #fff;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transform: rotate(-90deg);
          z-index: -2;
        }
      }

      .small {
        width: 3rem;
        height: 3rem;
        margin-top: 2rem;

        p {
          transform: translateY(0rem);
          font-size: 3rem;
          font-weight: 900;
        }
      }

      .cardName {
        color: #fff;
        text-shadow:  2px 0 0 $Primary_color, -2px 0 0 $Primary_color, 0 2px 0 $Primary_color, 0 -2px 0 $Primary_color,
                      1px 1px $Primary_color, -1px -1px 0 $Primary_color, 1px -1px 0 $Primary_color, -1px 1px 0 $Primary_color;
        letter-spacing: 1px;
        font-weight: 600;
      }
    }

    .foldersWrap:nth-child(2) {
      // background: rgba($Primary_color, 70%);
      background: rgba($Secondary_color, 0.7);
      border: 3px solid #fff;
      filter: drop-shadow(2px 2px 2px rgb(89, 89, 89));
    }
  }

  .userProfileSection {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    // height: calc(100vh - 35.19px);
    // background: rgba($Primary_color, 70%);
    background: rgba($Secondary_color, 0.7);
    color: $Primary_color;
    padding: 2rem 1rem;
    border: 3px solid #fff;

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

@media only screen and (max-width: 370px) {

  .foldersWrap:nth-child(2) {
    padding: 0 !important;
  }
}

@media only screen and (max-width: 600px) {

  .foldersWrap:nth-child(2) {
    width: 95% !important;
  }
}



</style>