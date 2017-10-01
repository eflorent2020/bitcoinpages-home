<!-- the demo root element -->


<!-- item template -->


<template>
  <li role="menuitem" class="mdc-list-item" :class="{open: isOpen,  selected: isSelected, hide: isHidden}">
    <span      
      :class="{bold: isFolder, selected: isSelected}"
      @click="toggle(model)">
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
      {{model.name}}
    </span>
    <ul class="mdc-list" v-show="open" v-if="isFolder">
      <category-tree-item
        class="item"        
        v-for="model in model.children"
        :key="model.id"
        :model="model">
      </category-tree-item>
    </ul>
  </li>
</template>

<script>

import { EventBus } from '../event-bus.js'

export default {
  name: 'category-tree-item',
  props: ['model'],
  data: function () {
    return {
      open: false,
      hidden: false,
      data: {},
      selectedCategory: { id: 0 }
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    },
    isSelected: function () {
      if (this.selectedCategory !== null) {
        return this.model.id === this.selectedCategory.id
      } else {
        return false
      }
    },
    isOpen: function () { return this.open },
    isHidden: function () { return this.hidden }
  },
  created: function () {
    EventBus.$on('select-category', this.setSelection)
  },
  methods: {
    toggle: function (model) {
      if (this.isFolder) {
        this.open = !this.open
      }
      EventBus.$emit('select-category', model)
    },
    setSelection: function (category) {
      this.selectedCategory = category
      // console.log('open: ' + this.open + 'cat childs: ' + this.model.children + 'parent: ' + this.selectedCategory.child)
      if (this.model.id !== category.id &&
          this.model.id !== 0) {
        for (var i = 0; i < this.model.children.length; i++) {
          if (this.model.children[i].id === this.selectedCategory.id) {
            return
          }
        }
        // this.hidden = true
        this.open = false
      }
    }
  }
}
</script>


<style>


</style>

