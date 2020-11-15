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
              <p class="closeBtn" @click="deleteSingleReport(item.id)"> <span>X</span></p>
            </header>
            <section>
              <img :src="item.url" :alt='item.id' height="200"> 
            </section>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>




<script>
import medicalRecordsNavBar from '@/components/MedicalRecords_NavBar.vue'
import { onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { db, auth } from '@/firebase/init.js'
import firebase from '@firebase/app';

export default {
  name: 'CategoryPage',
  components: {
    medicalRecordsNavBar
  },
  setup() {

    const { params: { categoryName }} = useRoute();
    const constCategoryName =  categoryName;


    const state = reactive({
      drName: '',
      date: '',
      url: '',
      showRecords: true,
      data: {}
    })

    const IdGenerator = computed(() => {
      let date = new Date();
      let id = Number(date).toString();
      return id;
    })

    function addNewRecord() {
      // console.log(state.drName, state.date, state.url);
      db.collection(`users/${auth.currentUser.uid}/Medical_Records`).doc(`${constCategoryName}`).set({
        records: {[IdGenerator.value]:{
          category: constCategoryName,
          date: state.date,
          dr: state.drName,
          id: IdGenerator.value,
          url: state.url
        }}
      },{merge: true});
      state.showRecords = true;
    }

    function deleteSingleReport(id) {
      console.log(id);
      db.collection(`users/${auth.currentUser.uid}/Medical_Records`).doc(`${constCategoryName}`).set({
        records: { [id]: firebase.firestore.FieldValue.delete() }
      },{merge: true});
    }

    onMounted(() => {
        // db.collection(`users/${auth.currentUser.uid}/Medical_Records`).doc(constCategoryName).onSnapshot(snapshot => {
        //   let changes = snapshot.docChanges();
        //   console.log(changes);
        //   changes.forEach(change => {
        //     if(change.type == 'added') {
        //       state.data.push(change.doc.data());
        //       console.log(state.data)
        //       // console.table(change.doc.data());
        //       // console.log(state.cards.length)
        //     }
        //   })
        // })


      db.collection(`users/${auth.currentUser.uid}/Medical_Records`).doc(constCategoryName).get()
        .then((doc) => {
          let readDataFromDb = doc.data();
          let unsorted = readDataFromDb.records;
          let sorted = {};

          console.log(unsorted);

          console.log(Object.values(unsorted)
                .sort((recA, recB) => Number(new Date(recA.date)).toString() - Number(new Date(recB.date)).toString())
                .map(date1 => date1)
          );

          Object.keys(unsorted)
            .sort((a,b) => b - a)
            .forEach((key) => {
              sorted[key] = unsorted[key];
            });

          // Object.keys(unsorted).sort((a,b) => b - a).forEach((key) => {
          //   sorted[key] = unsorted[key];
          // });

          state.data = sorted;
          // console.log(unsorted);
          // console.log(sorted);
        })
    })

    return {
      IdGenerator,
      addNewRecord,
      deleteSingleReport,
      constCategoryName,
      state
    }
  }
}
</script>



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