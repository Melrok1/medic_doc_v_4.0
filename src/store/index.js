import { createStore } from 'vuex'

export default createStore({
  state: {
    userFromStore: {},
    showUserProfile: false
  },
  mutations: {  
    SET_USER(state, user) {
      state.userFromStore = user
    },
    SHOW_PROFILE(state, show) {
      state.showUserProfile = show
    }
  },
  actions: {  
    setUser({commit}, user) {
      commit('SET_USER', user);
    },
    showProfile({commit}, show) {
      commit('SHOW_PROFILE', show)
    }
  },
  modules: {
  }
})
