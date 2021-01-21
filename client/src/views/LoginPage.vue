<template>
  <div id='login'>
    <v-form>
      <v-row
        justify='center'
      >
        <v-col 
          cols='12'
          sm='3'
          md='4'
          lg='3'
          class="login__input_wrapper"    
        >
          <v-text-field
            filled
            required
            :rules='[rules.required]'
            label='Username'
            v-model="user.login"
            prepend-inner-icon='mdi-account'
            hint='Enter your email or phone number'
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row
        justify='center'
      >
        <v-col
          cols='12'
          sm='3'
          md='4'
          lg='3'
          class="login__input_wrapper"
        >
          <v-text-field
            filled
            required
            :rules='[rules.required]'
            label='Password'
            v-model="user.password"
            hint='Do not tell anybody your password!'
            prepend-inner-icon='mdi-lock'
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row
        justify='center'
      >
        <v-col
          cols='12'
          sm='3'
          md='4'
          lg='3'
          class="login__entry_button"
        >
          <v-btn
            color='primary'
            block
            @click="logIn"
          >
            Log in
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        login: '',
        password: ''
      },
      isCredentialsCorrect: false,
      rules: {
        required: value => !!value || 'This field is required.'
      },
      serverURL: process.env.VUE_APP_SERVER_URL
    }
  },
  methods: {
   logIn(){
      let userXML = `<?xml version="1.0" encoding="UTF-8"?><user><login>${this.user.login}</login><password>${this.user.password}</password></user>`

      axios.post(this.serverURL + '/api/auth', 
        userXML, 
        {
          headers: {'Content-Type': 'text/xml'}
        })
          .then(response => {
            // eslint-disable-next-line
            console.log(response.data)
          })
          // eslint-disable-next-line
          .catch(err => console.log(err))

      // axios.get(this.serverURL + '/api/user')
      // // eslint-disable-next-line
      //   .then(response => console.log(response.data))
    },
  }
}
</script>
<style lang="scss">
  #login{

    .login__input_wrapper{
      
      & > div {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>