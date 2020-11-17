import { createStore } from 'vuex'

export default createStore({
  state: {
    userFromStore: {},
    showUserProfile: false,
    showAddNewFileForm: false,
    showConfirmDeleteModal: false,
    confirmDelete: false
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
    },
    SHOW_CONFIRM_DELETE_MODAL(state, show) {
      state.showConfirmDeleteModal = show
    },
    CONFIRM_DELETE(state, confirm) {
      state.confirmDelete = confirm
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
    },
    showConfirmDeleteModal({commit}, show) {
      commit('SHOW_CONFIRM_DELETE_MODAL', show)
    },
    confirmDelete({commit}, confirm) {
      commit('CONFIRM_DELETE', confirm)
    }
  },
  modules: {
  }
})
