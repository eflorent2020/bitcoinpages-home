<template>

  <div class="gallery">    
    <h1 v-if="message !== null">{{ message }}</h1>
  <div id="col_0" class="gallery_col3"></div>
  <div id="col_1" class="gallery_col3"></div>
  <div id="col_2" class="gallery_col3"></div>  

  <article 
      v-for="ad in ads"
      class="ad_container">
      <a :href="'/r/' + ad.slug">
      <span class="img-replace cover" v-if="ad.feature_image === null" >
        <div class="img-replace-internal">{{ ad.plaintext }} ...</div></span>
        <img v-if="ad.feature_image !== null" :src="ad.feature_image" class="cover">
        <span class="ad_title">
          <span class="text_title">{{ ad.title }} {{ format(ad.price,ad.currency) }}
            </span>
          </span>
      </a>
  </article>

  </div>
</template>

<script>
import { Currencies } from '../currencies.js'
import { EventBus } from '../event-bus.js'
import Vue from 'vue'

export default {
  name: 'vue-ads-grid',
  data: function () {
    return {
      format: function (amount, currency) {
        return Currencies.formatMoneyFor(amount, currency)
      },
      selectedCategory: null,
      ads: [],
      category: null,
      country: '',
      administrativeArea: '',
      locality: '',
      latitude: 0,
      longitude: 0,
      offset: 0,
      limit: 50,
      HEIGHTS: [],
      COLUMN_WIDTH: window.innerWidth / 3,
      MARGIN: 1,
      DELTA: 20,
      message: null,
      COOKIENAME: 'client'
    }
  },
  updated: function () {
    var self = this
    Vue.nextTick(function () {
      self.runGallery()
    })
  },
  created: function () {
    EventBus.$on('location-changed', this.setLocation)
    EventBus.$on('select-category', this.setSelection)
    try {
      var location = JSON.parse(localStorage.getItem(this.COOKIENAME))
      this.latitude = location.latitude
      this.longitude = location.longitude
    } catch (e) {
      console.log(e)
    }
    this.getAds()
  },
  methods: {
    formatMoney: function (amount, currency) {
      return Currencies.formatMoneyFor(amount, currency)
    },
    setLocation: function (location) {
      if (this.latitude !== location.latitude) {
        console.log('new location')
        this.latitude = location.latitude
        this.longitude = location.longitude
        this.country = location.country
        this.administrativeArea = location.administrativeArea
        this.locality = location.locality
        this.getAds()
      }
    },
    setSelection: function (category) {
      // if (this.category.id !== category.id) {
      this.category = category
      this.getAds()
      // }
    },
    getAds: function () {
      if (this.category == null) {
        this.category = {}
        this.category['id'] = 0
      }
      var url = '/api/ads/' + this.category.id + '/' + this.latitude + '/' + this.longitude + '/' + this.offset + '/' + this.limit
      console.log(url)
      var xhr = new XMLHttpRequest()
      var self = this
      // document.getElementById('col_1').innerHTML = ''
      // document.getElementById('col_2').innerHTML = ''
      // document.getElementById('col_3').innerHTML = ''
      xhr.open('GET', url)
      xhr.onload = function () {
        try {
          var result = JSON.parse(xhr.responseText)
        } catch (e) {
          console.log('ERR: getting /api/ads response ' + e)
        }
        if (result && result.length === 0) {
          self.message = 'Sorry, no results found for ' + self.category.title + '.'
        } else {
          self.message = null
          self.ads = []
          // for (var i = 0; i < result.length; i++) {
          //  self.ads.push(result[i])
          // }
          self.ads = result
          // self.$set(self.ads, 'b', 2)
          // Object.assign(self.ads, result)
        }
      }
      xhr.send()
    },
    beautifyDir: function () {
      var elems = document.getElementsByClassName('ad_container')
      for (var i = 0; i < elems.length; i++) {
        this.moveAd(elems[i])
      }
    },
    moveAd: function (elem) {
      var column = this.get_min_column()
      this.add_column_elem(column, elem)
    },
    get_min_column: function () {
      var minHeight = Infinity
      var minI = -1
      for (var i = 0; i < this.HEIGHTS.length; ++i) {
        if (this.HEIGHTS[i] < minHeight) {
          minHeight = this.HEIGHTS[i]
          minI = i
        }
      }
      return minI
    },
    add_column_elem: function (index, elem) {
      var col = document.getElementById('col_' + index)
      col.appendChild(elem)
      this.HEIGHTS[index] = this.HEIGHTS[index] + col.scrollHeight
    },
    add_image: function (image) {
      var column = this.get_min_column()
      this.add_column_elem(document.getElementById('col_' + column), image, column)
    },
    create_columns: function (n) {
      this.HEIGHTS = []
      for (var i = 0; i < n; ++i) {
        this.HEIGHTS.push(0)
      }
    },
    runGallery: function () {
      this.create_columns(3)
      this.beautifyDir()
    }
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
.listpage {
    margin-top: 72px;
    width: 100%;
}

.listpage_container {
    text-align: center;
}

.ad_container {
    display: inline-block;
    width: 100%;
    padding: 4px;
}

.cover {
    width: 100%;    
    display: block;
}

article {
    margin: 0px;
}

article span {
    opacity: 0.5;
    width: 50%;
}


.ad_title {
    background-color: black;
    width: 100%;
    opacity: .6;
    display: block;    
    margin-top: -48px;
    height: 48px;
    color: white;
    font-size: 18px;
    font-weight: bold;
}

@media (min-width: 1024px){
  .gallery_col3 {
    display: inline-block;
    width: 33%;
    vertical-align: top;  
  }
}

@media (max-device-width: 1024px)  {
  .gallery_col3 {
    width: 49%;
  }
}

@media (max-device-width: 640px) {
  .gallery_col3 {
    width: 100%;
  }
}











.text_title {
  padding: 8px;
  opacity: 1;
  color: #FFEA00;
}

.text_title:hover {
  padding: 8px;
  color: white;
  opacity: 1;
  color: orange;

}
a {
    text-decoration: none !important;
}
.img-replace {
  line-height: 32px;
  vertical-align: bottom;
  font-size: 24px;
  background-color: #FEFEFE;

  text-align: justify;
  margin-bottom: 48px;
  color: black;

}
.img-replace-internal {
  padding: 12px;
  display: inline-block;
  opacity: 0.9;
  margin-bottom: 12px;
}

</style>