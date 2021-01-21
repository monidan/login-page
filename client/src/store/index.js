import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    hasPermission: false
  },
  methods: {
    togglePermission(state){
      state.hasPermission != state.hasPermission
    }
  },
  actions: {
    requestPermissiong({commit}){
      commit('togglePermission')
    }
  },
})

export default store
