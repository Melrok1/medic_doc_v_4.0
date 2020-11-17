<template>
  <div class="confirm">
    <div class="background"  @click="closeConfirmForm"></div>
    <div class="modal">
      <form class="baseForm" @submit.prevent>
        <p>{{ message }}</p>
        <section class="buttons">
          <button type="button" @click="closeConfirmForm">Zrušiť</button>
          <button type="button" @click="confirmDelete">Vymazať</button>
        </section>
        <button type="button" class="close" @click="closeConfirmForm">✕</button>
      </form>

    </div>
  </div>
</template>


<!-- ////////////////////////////////////////////////////////////////////////////// -->


<script>
import { useStore } from 'vuex'

export default {
  name: 'Confirm',
  props: ['message'],
  setup() {

    const store2 = useStore();

    function closeConfirmForm() {
      console.log("potvrdzujúce okno zavreté");
      store2.dispatch('showConfirmDeleteModal', false);
      // store2.dispatch('confirmDelete', false);
    }

    function confirmDelete() {
      console.log("zmazanie potvrdené");
      store2.dispatch('confirmDelete', true);
      closeConfirmForm();
    }

    return {
      store2,
      closeConfirmForm,
      confirmDelete
    }
  }
}
</script>


<!-- ////////////////////////////////////////////////////////////////////////////// -->



<style lang="scss" scoped>

.confirm {
  // position: relative;

  .background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    // z-index: -1;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .baseForm {
      
      p {
        font-size: 1.1rem;
        font-weight: 600;
      }

      .close {
        position: absolute;
        margin: 0;
        padding: 0.15rem 0.2rem;
        top: 3px;
        right: 3px;
        font-size: 1rem;
      }
    }
  }

  .buttons {
    width: 100%;
    @include displayFlex(row, space-evenly, center);

    button:nth-child(1) {
      background: $Confirm_color;

      &:hover {
        background: darken($Confirm_color, 20%)
      }
    }

    button:nth-child(2) {
      background: $Danger_color;

      &:hover {
        background: darken($Danger_color, 20%)
      }
    }
  }
}


</style>