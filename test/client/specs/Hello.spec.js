

import Vue from 'vue'
import Hello from '@/components/Hello'

describe('Hello.vue', () => {

  it('all components mounted', () => {
    const vm = new Vue(Hello).$mount()
    
    expect(typeof vm.$options.components.toolbar).to.equal('object')
    expect(typeof vm.$options.components['vue-location']).to.equal('object')
    expect(typeof vm.$options.components['temporary-drawer']).to.equal('object')
    expect(typeof vm.$options.components['home-footer']).to.equal('object')
    expect(typeof vm.$options.components['vue-ads-grid']).to.equal('object')
    expect(typeof vm.$options.components['dummy-components']).to.equal('undefined')      
  })

  it('displays title', () => {
    const Constructor = Vue.extend(Hello)
    const HelloComponent = new Constructor().$mount()
    expect(HelloComponent.$el.textContent).to.contain('Classified Ads')
  })

})
