import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state, n) {
      state.count+=n
    }
  },
  actions: {
  },
  modules: {
  }
})
