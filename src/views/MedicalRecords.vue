<template>
  <div class="medicalRecords" v-cloak>

    <header>
      <medicalRecordsNavBar />
    </header>

    <main>
      <section class="foldersWrap">
        <div class="folder">
          <p>+ <br> Add Folder</p>
        </div>
        <div class="cardsCategories" v-for="(card, index) in state.cards" :key="index">
          <div class="folder small">
            <p>{{ card.name }}</p>
          </div>
        </div>
      </section>

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

    const state = reactive({
      birthNumber: '',
      phoneNumber: '',
      DoctorName: '',
      DoctorPhone: '',
      user: {},
      cards: [
        {name: 'Neurologia'}, {name: 'Gastro'}, {name: 'Hematologia'}, {name: 'Očné'}, {name: 'Kardiológia'}
      ]
    })

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
      store2,
    }
  }
}
</script>


<style lang="scss" scoped>

.medicalRecords {
  
  main {
    position: relative;

    .foldersWrap {
      width: 80%;
      margin: 0 auto;
      padding: 3rem;
      @include displayFlex(row, center, center);

      .folder {
        @include displayFlex(column, center, center);
        position: relative;
        width: 5rem;
        height: 5rem;
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
    }
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

.small {
  
}


</style>