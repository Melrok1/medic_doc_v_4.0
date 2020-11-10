<template>
  <div class="categoryPage">
    <header>
      <medicalRecordsNavBar />
    </header>

    <main>
      <h1>Category name: {{ constCategoryName }}</h1>
      <h5>User Name:</h5>
      <h5>User ID:</h5>
      <div v-for="(item, index) in state.data.records" :key="index">
        <div class="singleReportContent">
          <h4>Datum:{{ item.date }}</h4>
          <h4>Dr.:{{ item.dr }}</h4>
          <img :src="item.url" :alt='item.id' height="200">
          <p class="singleReportContent__id">{{ item.id }}</p>
        </div>
      </div>
    </main>
  </div>
</template>




<script>
import medicalRecordsNavBar from '@/components/MedicalRecords_NavBar.vue'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { db, auth } from '@/firebase/init.js'

export default {
  name: 'CategoryPage',
  components: {
    medicalRecordsNavBar
  },
  setup() {

    const { params: { categoryName }} = useRoute();
    const constCategoryName =  categoryName;


    const state = reactive({
      data: []
    })

    onMounted(() => {
      db.collection(`users/${auth.currentUser.uid}/Medical_Records`).doc(constCategoryName).get()
        .then((data) => {
          state.data = data.data();
          console.log(data.docs)
        })
    })

    return {
      constCategoryName,
      state
    }
  }
}
</script>



<style lang="scss" scoped>

main {
  .singleReportContent {
    position: relative;
    margin: 1rem;
    padding: 1rem;
    background: rgb(220, 220, 220);
    
    h4 {
      display: inline-block;
      margin-right: 3rem;
    }

    .singleReportContent__id {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }
  }
}

</style>