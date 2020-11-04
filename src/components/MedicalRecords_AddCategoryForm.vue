<template>
  <div class="AddCategoryForm">
    <div class="shadowBackground" @click="closeCategoryForm"></div>
    <form class="baseForm" @submit.prevent="addCategoryToFirebase">
      <p>{{ userId }}</p>
      <input type="text" placeholder="Meno zložky" v-model="categoryName">
      <button>Vytvor zložku</button>
      <button class="close" @click="closeCategoryForm">✕</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { db } from '@/firebase/init.js'
import { ref } from 'vue';

export default {

  name: 'AddNewCategoryForm',
  setup() {
    const store2 = useStore();
    const userId = ref(store2.state.userFromStore.uid);
    const categoryName = ref('');

    function addCategoryToFirebase() {
      // db.collection('user').doc(userId.value).set({'name': categoryName})
      db.collection(userId.value).doc("Medical_Records").set({
        name: categoryName.value,
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }

    function closeCategoryForm() {
      console.log("zavri toten formular");
      store2.dispatch('showAddNewFileForm', false);
    }

    return {
      categoryName,
      userId,
      store2,
      closeCategoryForm,
      addCategoryToFirebase
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