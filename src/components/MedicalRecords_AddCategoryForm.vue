<template>
  <div class="AddCategoryForm">
      <input type="text" :value="meno" @input="updateMeno($event.target.value)">
      <input type="text" :value="category" @input="updateCategory($event.target.value)">
      <!-- <p>{{ state.nameCategory }}</p>  placeholder="Meno zložky"-->
  </div>
</template>

<script>

export default {
  name: 'AddNewCategoryForm',
  props: {
    meno: String,
    category: String
  },
  setup(props, context) {

    function updateMeno(value) {
      context.emit("update:meno", value);
    }

    function updateCategory(value) {
      context.emit("update:category", value);
    }

    return {
      updateMeno,
      updateCategory
    }
  }
}
</script>

<style>

</style>