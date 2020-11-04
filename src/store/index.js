import { createStore } from 'vuex'

export default createStore({
  state: {
    userFromStore: {},
    showUserProfile: false,
    showAddNewFileForm: false,
  },
  mutations: {  
    SET_USER(state, user) {
      state.userFromStore = user
    },
    SHOW_PROFILE(state, show) {
      state.showUserProfile = show
    },
    SHOW_ADD_NEW_FILE_FORM(state, show) {
      state.showAddNewFileForm = show
    }
  },
  actions: {  
    setUser({commit}, user) {
      commit('SET_USER', user);
    },
    showProfile({commit}, show) {
      commit('SHOW_PROFILE', show)
    },
    showAddNewFileForm({commit}, show) {
      commit('SHOW_ADD_NEW_FILE_FORM', show)
    }
  },
  modules: {
  }
})
