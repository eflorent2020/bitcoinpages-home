<template>
     <header class="mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <a  @click="toggleDrawer()"  class="material-icons mdc-toolbar__icon--menu">search</a>
          <span class="mdc-toolbar__title">Classified Ads 
            {{ country }}, {{ locality }},
            <span v-if="previousCategory != null &&
             previousCategory.id !== selectedCategory.id">{{ previousCategory.title }} </span> 
             <span v-if="previousCategory != null && 
             previousCategory.id != 0 &&
             selectedCategory.id !=0 &&
             previousCategory.id !== selectedCategory.id &&
             selectedCategory != null">, </span>
            <span v-if="selectedCategory != null">{{ selectedCategory.title }}</span>
            </span>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">          
          <a href="#" @click="toggleLocation()" class="material-icons mdc-toolbar__icon" aria-label="Change location" 
          alt="Change location">location_searching</a>
          
          <a href="https://wallet.bitcoinpage.org/login" class="material-icons mdc-toolbar__icon" 
          aria-label="Create post" alt="Create post">add</a>
       <!--
          <div class="mdc-menu-anchor">            
          <a href="#" class="material-icons mdc-toolbar__icon toggle" aria-label="Bookmark this page" alt="Bookmark this page">more_vert</a>
   
          <div class="mdc-simple-menu mdc-simple-menu--open-from-top-right" tabindex="-1" id="demo-menu" :class="classes">
            <ul class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true" style="transform: scale(1, 1);">
              <li class="mdc-list-item" role="menuitem" tabindex="0" style="transition-delay: 0.069s;">Back</li>
              <li class="mdc-list-item" role="menuitem" tabindex="0" style="transition-delay: 0.124s;">Forward</li>
              <li class="mdc-list-item" role="menuitem" tabindex="0" style="transition-delay: 0.179s;">Reload</li>
              <li class="mdc-list-divider" role="separator"></li>
              <li class="mdc-list-item" role="menuitem" tabindex="0" style="transition-delay: 0.236s;">Save As...</li>
            </ul>
          </div>
          </div>
          -->

        </section>
      </div>
    </header>
</template>

<script>

// import { MDCToolbarFoundation } from '@material/toolbar'
// import { MDCSimpleMenuFoundation } from '@material/menu'
// import { getCorrectEventName } from '@material/animation';
import { EventBus } from '../event-bus.js'

export default {
  name: 'toolbar',
  props: ['model'],
  data: function () {
    return {
      selectedCategory: null,
      previousCategory: null,
      country: null,
      locality: null
    }
  },
  created: function () {
    EventBus.$on('select-category', this.setSelection)
    EventBus.$on('location-changed', this.setLocation)
  },
  methods: {
    setLocation: function (location) {
      this.country = location.country
      this.locality = location.locality
    },
    setSelection: function (category) {
      if (this.selectedCategory !== null &&
          category.id !== this.selectedCategory.id &&
           category.parent === this.selectedCategory.id &&
           (this.previousCategory === null ||
            category.id !== this.previousCategory.id)) {
        this.previousCategory = {id: this.selectedCategory.id, title: this.selectedCategory.title}
      }
      this.selectedCategory = category
    },
    toggleDrawer: function () {
      EventBus.$emit('toggle-drawer')
    },
    toggleLocation: function () {
      EventBus.$emit('select-location')
    }
  }
}
</script>

