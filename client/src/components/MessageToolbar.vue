<template>
     <header class="mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <a  @click="toggleDrawer()"  class="material-icons mdc-toolbar__icon--menu">people</a>
          <span class="mdc-toolbar__title">Instant Messaging
            </span>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
          <a href="#/login" v-if="!user.authenticated"  class="material-icons mdc-toolbar__icon" 
          aria-label="Logout" alt="Logout">account_box</a>
          <a href="#" @click="logout()" v-if="user.authenticated"  class="material-icons mdc-toolbar__icon" 
          aria-label="Logout" alt="Logout">exit_to_app</a>
        </section>
      </div>
    </header>
</template>

<script>
  
import { EventBus } from '../event-bus.js'
import auth from '../../auth'

export default {
    name: 'messageToolbar',
    props: ['model'],
    data: function () {
      return {
        user: auth.user
      }
    },
    methods: {
      toggleDrawer: function () {
        EventBus.$emit('toggle-drawer')
      },
      logout () {
        auth.logout(this)
      }
    }
}
</script>
<style lang="scss">
  @import '@material/toolbar/mdc-toolbar';
  @import '@material/menu/mdc-menu';
</style>