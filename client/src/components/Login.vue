<template lang="html">

  <div class="login-container">
    <form v-on:submit.prevent="submit">    
    <div class="Aligner-item Aligner-item--top"></div>

    <div class="mdc-card login-card" id="card-login">
        <section class="mdc-card__primary"></section>

            <section class="mdc-card__supporting-text">



   <div class="mdc-form-field"> 

      <div class="mdc-textfield mdc-textfield1">
        <input v-model="body.email"  v-validate.initial data-rules="required|email" type="email" class="mdc-textfield__input" id="email" name="email"
                aria-controls="email-match-text" data-as="email">
        <label for="email"
                class="mdc-textfield__label mdc-textfield__label--float-above i18n">Email</label>
    </div>
        <p v-show="errors.has('email')" class="mdc-textfield-helptext mdc-textfield-helptext--persistent
        mdc-textfield-helptext--validation-msg"  id="email-match-text">>{{ errors.first('email') }}</p>
      </div>
   <div class="mdc-form-field">      
        <div class="mdc-textfield mdc-textfield2">
        <input v-validate.initial data-rules="required|min:6" type="password" class="mdc-textfield__input" id="passwod" name="password"
               v-model="body.password"   data-as="password">
        <label for="password"
                class="mdc-textfield__label mdc-textfield__label--float-above i18n">Password</label>
    </div>
        <p v-show="errors.has('password')" class="mdc-textfield-helptext mdc-textfield-helptext--persistent
        mdc-textfield-helptext--validation-msg"  id="email-match-text">>{{ errors.first('password') }}</p>
  </div>
            </section>

            <section class="mdc-card__actions">
                <input type="submit" class="mdc-button mdc-button--raised mdc-button--compact mdc-card__action i18n" id="btnLogin" value="Login"></input>
                <a href="#passwordLost" class="mdc-button mdc-button--compact mdc-card__action i18n">Forgot password ?</a>       
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
        password: ''
      }
    }
  },
  mounted () {
    var f1 = new MDCTextfield(document.querySelector('.mdc-textfield1'))
    var f2 = new MDCTextfield(document.querySelector('.mdc-textfield2'))
    if (f1 === f2) { /* eslint-disable no-used-vars */ }
  },
  computed: {},
  methods: {
    submit () {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        var credentials = {
          email: this.body.email,
          password: this.body.password
        }
        auth.login(this, credentials, '/')
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
    margin-top: 24px;
    margin-bottom: 24px;
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

