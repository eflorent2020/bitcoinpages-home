<template>
    <div>
    <div v-if="showPlaceSelect" class="mdc-card">
        <section class="mdc-card__primary">
          <h1 class="mdc-card__title mdc-card__title--large">Please select a search area</h1>
          <h2 class="mdc-card__subtitle">Your current search area is {{ country }} {{ administrativeArea }} {{ locality }}, 
            please input a search area ... </h2>
        </section>
        <section class="mdc-card__supporting-text">
          <vue-google-autocomplete
              id="map"
              v-if="showPlaceSelect"
              classname="form-control"
              placeholder="Start typing"
              v-on:placechanged="getAddressData"
          ></vue-google-autocomplete>

        </section>
        <section class="mdc-card__actions">
          <button @click="toggleCard()" class="mdc-button mdc-button--raised mdc-button--acccent mdc-button--compact mdc-card__action">DONE</button>          
        </section>
      </div>
    <div id="snackbar" class="mdc-snackbar" aria-live="assertive" aria-atomic="true" aria-hidden="true">
        <div class="mdc-snackbar__text">This website use cookies to improve your navigation</div>
        <div class="mdc-snackbar__action-wrapper">
          <button @click="closeSnackbar()" type="button" class="mdc-button mdc-snackbar__action-button">OK</button>
        </div>
      </div>
      </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import { EventBus } from '../event-bus.js'

export default {
  name: 'location',
  components: {
    VueGoogleAutocomplete
  },
  data () {
    return {
      COOKIENAME: 'client',
      msg: '',
      'GKEY': '',
      'country': '',
      'administrativeArea': '',
      'locality': '',
      'latitude': 0.0,
      'longitude': 0.0,
      'showPlaceSelect': false
    }
  },
  created: function () {
    EventBus.$on('select-location', this.toggleCard)
    var url = '/api/entreprise/'
    var xhr = new XMLHttpRequest()
    var self = this
    xhr.open('GET', url)
    xhr.onload = function () {
      try {
        var result = JSON.parse(xhr.responseText)
        self.GKEY = result.GKEY
        self.loadGooglePlace()
      } catch (e) {
        console.log(e)
      }
    }
    xhr.send()
  },
  mounted: function () {
    this.readCookie()
  },
  methods: {
    closeSnackbar: function () {
      document.getElementById('snackbar').className = 'mdc-snackbar'
    },
    toggleCookieAlert: function () {
      document.getElementById('snackbar').className = 'mdc-snackbar mdc-snackbar--active'
    },
    toggleCard: function () {
      if (this.showPlaceSelect === true) {
        this.showPlaceSelect = false
      } else {
        this.showPlaceSelect = true
      }
    },
    loadGooglePlace: function () {
      var head = document.getElementsByTagName('head').item(0)
      var test = document.getElementById('gplace')
      if (test === null) {
        var script = document.createElement('script')
        script.setAttribute('type', 'text/javascript')
        script.setAttribute('id', 'gplace')
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.GKEY + '&libraries=places'
        head.appendChild(script)
      // var self = this
      // script.onload = function () {
      // self.showPlaceSelect = true
      // }
      }
    },
    getAddressData: function (addressData, placeResultData) {
      this.country = addressData.country
      this.administrativeArea = addressData.administrative_area_level_1
      this.locality = addressData.locality
      this.latitude = addressData.latitude
      this.longitude = addressData.longitude
      this.storeCookie()
      this.showPlaceSelect = false
    },
    storeCookie: function () {
      var c = {
        country: this.country,
        administrativeArea: this.administrativeArea,
        locality: this.locality,
        latitude: this.latitude,
        longitude: this.longitude
      }
      if (typeof (localStorage.getItem(this.COOKIENAME)) === 'undefined') {
        this.toggleCookieAlert()
      }
      localStorage.setItem(this.COOKIENAME, JSON.stringify(c))
      EventBus.$emit('location-changed', c)
    },
    readCookie: function () {
      var c = null
      try {
        if (localStorage[this.COOKIENAME]) {
          c = JSON.parse(localStorage[this.COOKIENAME])
          this.country = c.country
          this.administrativeArea = c.administrativeArea
          this.locality = c.locality
          this.latitude = c.latitude
          this.longitude = c.longitude
        } else {
          this.toggleCookieAlert()
        }
      } catch (e) {
        console.log(e)
      }
      if (c == null) {
        this.loadLocationFromApi()
      } else {
        EventBus.$emit('location-changed', c)
      }
    },
    loadLocationFromApi: function () {
      var url = 'https://freegeoip.net/json/'
      console.log('decoding your ip location from freegeoip.net')
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', url)
      xhr.onload = function () {
        try {
          console.log(xhr.responseText)
          var result = JSON.parse(xhr.responseText)
          self.country = result.country_name
          self.administrativeArea = result.region_name
          self.locality = result.city
          self.latitude = result.latitude
          self.longitude = result.longitude
          self.storeCookie()
        } catch (e) {

        }
      }
      xhr.send()
    }
  }
}
</script>
<style scoped>

.mdc-card {
  margin-top : 12px;
  margin-bottom: 12px;
}
#map {
  width: 98%;
  border-radius: 5px;
  border: none;
  height: 48px;
  padding: 4px;
  font-size: 24px;
  padding-left: 12px;
  margin: 4px;
}
</style>


