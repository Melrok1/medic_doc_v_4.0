<template>
  <div class="AddCategoryForm">
    <div class="shadowBackground" @click="closeCategoryForm"></div>
    <form class="baseForm" @submit.prevent="addCategoryToFirebase">
      <p>{{ state.userId }}</p>
      <p>{{ IdGenerator }}</p>
      <input type="text" placeholder="Meno zložky" v-model="categoryName">
      <button class="close" @click="closeCategoryForm">✕</button>
      <button>Vytvor zložku</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { db, auth } from '@/firebase/init.js'
import { computed, onMounted, reactive, ref } from 'vue';

export default {

  name: 'AddNewCategoryForm',
  setup() {
    const store2 = useStore();
    const categoryName = ref('');

    const state = reactive({
      userId: '',
      // testId: Number(new Date()).toString()
    })

    const IdGenerator = computed(() => {
      let date = new Date();
      let id = Number(date).toString();
      return id;
    })

    function addCategoryToFirebase() {
      db.collection(`users/${state.userId}/Medical_Records`).doc(categoryName.value).set({
        name: categoryName.value,
        records: {}
      })
      .then(function() {
        console.log("Document successfully written!" + "//" + IdGenerator.value );
        closeCategoryForm();
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }

    function closeCategoryForm() {
      console.log("zavri toten formular");
      store2.dispatch('showAddNewFileForm', false);
    }

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if(user) {
          state.userId = user.uid;
        }else {
          console.log("Add category form err")
        }
      })
    })

    return {
      state,
      categoryName,
      store2,
      closeCategoryForm,
      addCategoryToFirebase,
      IdGenerator
    }
  }
}
</script>

<style lang="scss" scoped>

.AddCategoryForm {
  
  .shadowBackground {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.631);
  }

  .baseForm {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .close {
      position: absolute;
      margin: 0;
      padding: 0.15rem 0.2rem;
      top: 3px;
      right: 3px;
      font-size: 1rem;
      // font-weight: 100;
    }
  }
}

</style>