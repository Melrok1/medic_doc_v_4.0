import { createStore } from 'vuex'

export default createStore({
  state: {
    userFromStore: {}
  },
  mutations: {  
    SET_USER(state, user) {
      state.userFromStore = user
    }
  },
  actions: {  
    setUser({commit}, user) {
      commit('SET_USER', user);
    }
  },
  modules: {
  }
})
