<template>
  <div class="categoryPage">
    <header>
      <medicalRecordsNavBar />
    </header>

    <main>
      <div class="report__mainHeader">
        <router-link to="/medicalRecords" class="btn"> Home </router-link>
        <h1>{{ constCategoryName }}</h1>
        <div class="btn btnWidth" @click="state.showRecords = false" v-if="state.showRecords"> Pridať správu </div>
        <div class="btn btnWidth" @click="state.showRecords = true" v-if="!state.showRecords">Zobraziť správy</div>
      </div>

      <!-- Add Records -->
      <div class="addRecords" v-if="!state.showRecords">
        <form class="baseForm" @submit.prevent="addNewRecord">
          <input type="text" placeholder="meno lekára" v-model="state.drName">
          <input type="date" placeholder="dátum" v-model="state.date">
          <input type="text" placeholder="url správy" v-model="state.url">
          <button type="submit">Pridaj správu</button>
        </form>
      </div>

      <!-- Records -->
      <div v-if="state.showRecords">
        <div v-for="(item, index) in state.data" :key="index">
          <div class="singleReport__Content">
            <header class="singleReport__header">
              <p>Dátum: <span>{{ item.date }}</span> </p>
              <p>Dr. <span>{{ item.dr }}</span> </p>
              <p>{{ item.id }}</p>
              <p class="closeBtn" @click="showDeleteSingleReportModal(item.id)"> <span>X</span></p>
            </header>
            <section>
              <img :src="item.url" :alt='item.id' height="200"> 
            </section>
          </div>
        </div>
      </div>

    </main>

    <div class="modal">
      <confirmDeleteModal 
        :message="state.messageToDeleteModal" 
        v-if="store2.state.showConfirmDeleteModal"
        @confirm="deleteSingleReport(state.curentId)"
      />
    </div>

  </div>
</template>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<script>
import medicalRecordsNavBar from '@/components/MedicalRecords_NavBar.vue'
import confirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { db, auth } from '@/firebase/init.js'
import { useStore } from 'vuex'
import firebase from '@firebase/app';

export default {
  name: 'CategoryPage',
  components: {
    medicalRecordsNavBar, confirmDeleteModal
  },
  setup() {

    const { params: { categoryName }} = useRoute();
    const constCategoryName =  categoryName;

    const store2 = useStore();


// ***************STATE **********************
    const state = reactive({
      curentId: '',
      drName: '',
      date: '',
      url: '',
      showRecords: true,
      data: [],
      messageToDeleteModal: 'Vymazať správu ?'
    })
// ***************STATE **********************


    function IdGenerator2() {
      let date = new Date();
      let id = Number(date).toString();
      return id;
    }

    function addNewRecord() {
      db.collection(`users/${auth.currentUser.uid}/Medical_Records`).doc(`${constCategoryName}`).set({
        records: {[IdGenerator2()]:{
          category: constCategoryName,
          date: state.date,
          dr: state.drName,
          id: IdGenerator2(),
          url: state.url
        }}
      }, { merge: true });
      state.showRecords = true;
    }

    function showDeleteSingleReportModal(id) {
      state.curentId = id;
      store2.dispatch('showConfirmDeleteModal', true);
    }

    function deleteSingleReport(id) {
      db.collection(`users/${auth.currentUser.uid}/Medical_Records`).doc(`${constCategoryName}`).set({
        records: { [id]: firebase.firestore.FieldValue.delete() }
      },{merge: true});

      state.curentId = '';
    }

    onMounted(() => {

      db.collection(`users/${auth.currentUser.uid}/Medical_Records`).doc(constCategoryName)
        .onSnapshot((doc) => {
          let readDataFromDb = doc.data();
          let unsorted = readDataFromDb.records;
          let sorted2 = [];

          Object.values(unsorted)
                .sort((recA, recB) => {
                  let recA_date = Number(new Date(recA.date)).toString();
                  let recB_date = Number(new Date(recB.date)).toString();
                  return recB_date - recA_date;
                })
                .forEach(data => {
                  sorted2.push(data);
                });

          state.data = sorted2;
        })
    })

    return {
      store2,
      addNewRecord,
      showDeleteSingleReportModal,
      deleteSingleReport,
      constCategoryName,
      state
    }
  }
}
</script>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<style lang="scss" scoped>

.report__mainHeader {
  @include displayFlex(row, space-evenly, center);
  // border: 1px solid black;

  .btn {
    @include formButton1;
    text-decoration: none;
  }
  .btnWidth{
    width: 12rem;
  }
}

main {
  .addRecords {

    .baseForm {
      transform: translateY(0);
      margin: 2rem auto;
    }
  }

  .singleReport__Content {
    position: relative;
    margin: 1rem;
    // padding: 1rem;
    background: rgba($Secondary_color, 0.7);
    filter: drop-shadow(2px 2px 2px rgb(89, 89, 89));
    
    header {
      @include displayFlex(row, space-between, baseline);
      background: $Primary_color;
      color: #fff;
      p {
        display: inline-block;
        padding: 0.5rem;
      }

      span {
        font-weight: 800;
        // letter-spacing: 1px;
        font-size: 1.2rem;
      }

      .closeBtn {
        border: 3px solid #fff;
        cursor: pointer;
      }
    }

    section {
      padding: 1rem;
      border: {
        right: 3px solid #fff;
        bottom: 3px solid #fff;
        left: 3px solid #fff;
      }
    }
  }
}

</style>