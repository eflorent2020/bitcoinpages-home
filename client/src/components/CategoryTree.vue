<template>
<div class="mdc-simple-menu" style="position: absolute;" tabindex="-1">
  <ul class="category-tree mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">

  <category-tree-item
    class="item"
    :model="treeData"></category-tree-item>
</ul>
</div>
</template>

<script>

import CategoryTreeItem from '@/components/CategoryTreeItem'
import { EventBus } from '../event-bus.js'

export default {
  name: 'category-tree',
  data: function () {
    return {
      open: false,
      selectedCategory: { id: 0 },
      treeData: {}
    }
  },
  created: function () {
    this.fetchData()
    EventBus.$on('select-category', this.setSelection)
  },
  components: {
    'category-tree-item': CategoryTreeItem
  },
  methods: {
    setSelection: function (category) {
      if (category.id !== 0) {
        this.selectedCategory = category
      }
      // repaint
      this.treeData = JSON.parse(JSON.stringify(this.treeData))
    },
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', '/api/categories/')
      xhr.onload = function () {
        self.treeData = JSON.parse(xhr.responseText)
      }
      xhr.send()
    }
  }
}
</script>
