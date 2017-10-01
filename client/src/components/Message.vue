<template>
  <div class="message"> 
    <toolbar></toolbar>
    <main>
      <div class="mdc-toolbar-fixed-adjust">
        <temporary-drawer></temporary-drawer>  
        <register-or-login  v-if="!user.authenticated"></register-or-login>
      </div>
    </main>
  </div>
</template>

<script>
import Toolbar from '@/components/MessageToolbar'
import TemporaryDrawer from '@/components/MessageDrawer'
import RegisterOrLogin from '@/components/RegisterOrLogin'
import JwtDecode from 'jwt-decode'
import auth from '../../auth'

var myPlugin = {
  fromJID: '',
  toNickname: '',
  toJID: '',
  initialize: function () {
    console.log('intializing to ' + this.toJID)
    let token = JwtDecode(localStorage.getItem('id_token'))
    this.fromJID = token.nickname + '@' + this.domain
    const { _converse } = this
    myPlugin.api = myPlugin._converse.api // shothand
    Promise.all([
      _converse.api.waitUntil('rosterInitialized'),
      _converse.api.waitUntil('connected')
    ]).then(myPlugin.addContact)
    myPlugin._converse.on('chatBoxFocused', function (chatbox) {
      console.log('chatbox opened ')
      console.log(chatbox.model.get('id'))
      console.log(chatbox.model.get('fullname'))
    })
  },
  addContact: function () {
    if (myPlugin.api.contacts.get(myPlugin.toJID) !== null) {
    } else {
      myPlugin.api.contacts.add(myPlugin.toJID, 'plop')
    }
    var c = myPlugin.api.chats.open(myPlugin.toJID)
    c.$el[0].classList.remove('hidden')
  }
}

export default {
  name: 'message',
  components: {
    'toolbar': Toolbar,
    'temporary-drawer': TemporaryDrawer,
    'register-or-login': RegisterOrLogin
  },
  data () {
    return {
      user: auth.user,
      domain: 'bitcoinpage.org'
    }
  },
  methods: {
    logout () {
      auth.logout(this)
    },
    setupConverse () {
      myPlugin.toJID = this.$route.params.jid + '@' + this.domain
      let token = JwtDecode(localStorage.getItem('id_token'))
      window.converse.plugins.add('myPlugin', myPlugin)
      window.converse.initialize({
        authentication: 'login',
        auto_login: true,
        jid: token.nickname + '@' + this.domain,
        password: token.xmpp_password,
        auto_away: 300,
        auto_subscribe: true,
        allow_muc: false,
        blacklisted_plugins: ['converse-register', 'converse-minimize', 'converse-dragresize'],
        whitelisted_plugins: ['myPlugin', 'converse-inverse', 'converse-singleton'],
        auto_reconnect: true,
        allow_non_roster_messaging: true,
        bosh_service_url: 'https://xmpp.bitcoinpage.org/http-bind/',
        message_archiving: 'always'
      })
    }
  },
  mounted: function () {
    // sessionStorage.clear()
    // Add the script to the window object
    if (localStorage.getItem('id_token') != null) {
      // console.log('loading !')
      var me = this
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://cdn.conversejs.org/3.2.1/dist/inverse.min.js'
      script.onload = function () {
        console.log('converse loaded !')
        me.setupConverse()
      }
      document.body.appendChild(script)
    }
  }
}
</script>

<style lang="scss">
  @import '../../../node_modules/converse.js/css/inverse.css'
</style>

<style>

.brand-heading, .brand-heading + p {
  display: none;
}

#conversejs {
  z-index: 0;
}

#set-xmpp-status {
  Zdisplay: none;
  background-color: red;
}

#converse-embedded-chat .chat-head, #conversejs .chat-head {
  margin-top: 60px;
}

#converse-embedded-chat .chatbox .dropdown, #conversejs .chatbox .dropdown {
  Zdisplay: none;
}

#conversejs #controlbox .controlbox-head {
  Zmargin-top: -10px;
  margin-bottom: -10px;
}

#conversejs #controlbox .box-flyout {
    background-color: white;
}

#converse-embedded-chat .chatbox .chat-content, #conversejs .chatbox .chat-content {
    height: calc(100% - 160px);
}

div.controlbox-panes {
  background-color: transparent;
}
#converse-embedded-chat .chat-head.chat-head-chatbox, #conversejs .chat-head.chat-head-chatbox {
    background-color: transparent;
}
#conversejs .chatbox .box-flyout {
    background-color: transparent;
}
#conversejs .flyout {
    border: 1.2em solid transparent;
    border-top: 0.8em solid transparent;
}
#conversejs .chatbox .chat-body {
    background-color: transparent;
}

</style>