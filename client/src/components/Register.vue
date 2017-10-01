<template lang="html">

  <div class="login-container">

    <div class="Aligner-item Aligner-item--top"> </div>
    <form v-on:submit.prevent="submit">    
    <div class="mdc-card login-card" id="card-login">
        <section class="mdc-card__primary">
          Register An Account
        </section>
        <section class="mdc-card__supporting-text">

          <div class="mdc-form-field"> 
              <div class="mdc-textfield mdc-textfield1">
                <input v-model="body.email" v-validate.initial data-rules="required|email" type="email"
                 class="mdc-textfield__input" id="email" name="email"
                        aria-controls="email-match-text" data-as="email">
                <label for="email"
                        class="mdc-textfield__label mdc-textfield__label--float-above i18n">Email</label>
            </div>
          </div>

          <div class="mdc-form-field"> 
              <div class="mdc-textfield mdc-textfield2">
                <input v-model="body.nickName" v-validate.initial data-rules="required" type="text"
                 class="mdc-textfield__input" id="nickName" name="nickName"
                        aria-controls="nickName-match-text" data-as="nickName">
                <label for="nickName"
                        class="mdc-textfield__label mdc-textfield__label--float-above i18n">NickName</label>
            </div>
          </div>

          <div class="mdc-form-field"> 
              <div class="mdc-textfield mdc-textfield3">
                <input v-model="body.fullName" v-validate.initial data-rules="required" type="text"
                 class="mdc-textfield__input" id="fullName" name="fullName"
                        aria-controls="fullName-match-text" data-as="fullName">
                <label for="fullName"
                        class="mdc-textfield__label mdc-textfield__label--float-above i18n">FullName</label>
            </div>
          </div>

          <div class="mdc-form-field"> 
              <div class="mdc-textfield mdc-textfield4">
                <input v-model="body.password" v-validate.initial data-rules="required" type="password"
                 class="mdc-textfield__input" id="password" name="password"
                        aria-controls="password-match-text" data-as="password">
                <label for="password"
                        class="mdc-textfield__label mdc-textfield__label--float-above i18n">Password</label>
            </div>
          </div>

          <div class="mdc-form-field"> 
              <div class="mdc-textfield mdc-textfield5">
                <input v-model="body.password2" v-validate.initial data-rules="required" type="password"
                 class="mdc-textfield__input" id="password2" name="password2"
                        aria-controls="password2-match-text" data-as="password2">
                <label for="password2"
                        class="mdc-textfield__label mdc-textfield__label--float-above i18n">Password (again)</label>
            </div>
          </div>


        </section>

        <section class="mdc-card__actions">
            <input type="submit" class="mdc-button mdc-button--raised mdc-button--compact mdc-card__action i18n" id="btnLogin" value="Register"></input>      
        </section>
    </div>
    </form>

    <div class="mdc-snackbar mdc-snackbar--active"
          v-show="error"
          aria-live="assertive"
          aria-atomic="true"
          aria-hidden="true">
      <div class="mdc-snackbar__text">Oh snap! {{ error }}</div>
    </div>

    <div class="Aligner-item Aligner-item--bottom"></div>
  </div>
</template>

<script>
import auth from '../../auth'
import {MDCTextfield} from '@material/textfield'

export default {
  data () {
    return {
      error: null,
      body: {
        email: '',
        nickName: '',
        fullName: '',
        password: '',
        password2: ''
      }
    }
  },
  mounted () {
    var f1 = new MDCTextfield(document.querySelector('.mdc-textfield1'))
    var f2 = new MDCTextfield(document.querySelector('.mdc-textfield2'))
    var f3 = new MDCTextfield(document.querySelector('.mdc-textfield3'))
    var f4 = new MDCTextfield(document.querySelector('.mdc-textfield4'))
    var f5 = new MDCTextfield(document.querySelector('.mdc-textfield5'))
    if (f1 === f2) { /* eslint-disable no-used-vars */ }
    if (f3 === f4) { /* eslint-disable no-used-vars */ }
    if (f1 === f5) { /* eslint-disable no-used-vars */ }
  },
  computed: {},
  methods: {
    submit () {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        if (this.body.password === this.body.password2) {
          var credentials = {
            email: this.body.email,
            nickName: this.body.nickName,
            fullName: this.body.fullName,
            password: this.body.password
          }
          auth.signup(this, credentials, '/verify')
        } else {
          this.error = 'Please enter the the same password in the "Password Confirmation" field'
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss">

  @import '@material/textfield/mdc-textfield';
  @import '@material/button/mdc-button';
  @import '@material/card/mdc-card';

</style>

<style lang="css" scoped>

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90%;
}

.mdc-form-field {
    margin-top: 2px;
    margin-bottom: 2px;
}

.mdc-form-field, .mdc-textfield__input {
  width : 310px;
}

.mdc-text-field {
  width : 310px;
}

.Aligner-item--top {
  align-self: flex-start;
}

.Aligner-item--bottom {
  align-self: flex-end;
}

.login-card {
    margin-top: 48px;
    max-width: 410px;
    background-color: var(--mdc-theme-background-lighter);
}

@media (max-width: 420px) {
    .youcall-login-card {
        max-width: 310px;
    }
}
</style>
