<template>
  <div id='login'>
    <v-dialog
      v-model="$store.state.isAuthError"
      transition='dialog-top-transition'
      width='500'
    >
      <div class="modal-text pa-12 text-h4 red darken-4">
        Error!
      </div>
    </v-dialog>
    <v-form ref="loginForm">
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
            type='password'
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
    }
  },
  methods: {
    // Login method handler 
   logIn(){
     if(this.user.login === '' || this.user.password === ''){
       this.$refs.loginForm.validate();
       this.$store.state.isAuthError = true
     } else {
       this.$store.dispatch('requestPermission', this.user)
     }
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

// Error modal window styles overriding 
  .v-dialog{
    position: absolute!important;
    top: 2rem!important
  }

  .modal-text{
    display: inline-block!important;
    text-align: center;
  }
</style>