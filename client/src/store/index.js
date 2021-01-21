import Vue from 'vue'
import Vuex from 'vuex'

import router from '@/router/index'

import axios from 'axios';

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    users: [],
    hasPermission: false,
    serverURL: process.env.VUE_APP_SERVER_URL,
    isAuthError: false
  },
  mutations: {
    authenticateUser(state, userEntry){
      for(let i = 0; i < state.users.length; i++){
        if(state.users[i].login === userEntry.login && state.users[i].password === userEntry.password){
          state.hasPermission = true
          state.isAuthError = false
          router.push({name: 'TitlePage'})
          return
        }
      }
      state.isAuthError = true
    }
  },
  actions: {
    async requestPermission({commit, state}, userAuth){
      await axios.get(state.serverURL + '/api/user')
        .then(response => {
          let parser = new DOMParser(),
          XMLRespond = parser.parseFromString(response.data, 'text/xml')
          
          for(let userXML of XMLRespond.getElementsByTagName('user')){
            let user = {
              login: userXML.firstChild.innerHTML,
              password: userXML.lastChild.innerHTML
            }
            state.users.push(user)
          }
          commit('authenticateUser', userAuth);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
          state.isAuthError = true
        })
    }
  },
})

export default store
