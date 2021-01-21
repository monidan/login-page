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
    // Mutation to auth user entry. 
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
    /*
      Here we're downloading our users database (what I wouldn't normally do in production).
      It can be improved and be more secured. 

      But because of a lack of time I decided to go this way. 
      Normally I would do 'POST' request on the server with our 'user' Object.
      Then get response from the server is user data input is correct, so accepct auth
      and give permission to entry.

      There're also can be some improvmnents in our project structure, such as:
      - create seperate file for our axios calls
      - save some kind of token in the localStorage, so we will be able to know if user has already logged in.
    */
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
