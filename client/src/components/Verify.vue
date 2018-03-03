<template lang="html">
  <div class="login-container">
    
    <div class="Aligner-item Aligner-item--top"></div>

    <div class="mdc-card login-card" id="card-login">
        <section class="mdc-card__primary"></section>
            <section class="mdc-card__supporting-text">
                {{this.response}}
            </section>
            <section class="mdc-card__actions">
                <a href="/#/login" class="mdc-button mdc-button--raised mdc-button--compact mdc-card__action i18n" id="btnLogin">Login</a>
            </section>

    </div>


    <div class="Aligner-item Aligner-item--bottom"></div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      response: ''
    }
  },
  created () {
    if (this.$route.params.id) {
      this.$http.get('/api/verify/' + this.$route.params.id + '/' + this.$route.params.token).then(response => {
        this.response = response.data.message
      })
    } else {
      this.response = 'Please check your inbox for your verification email'
    }
  }
}
</script>



<style lang="css" scoped>

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90%;
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