import { mount } from 'avoriaz'
import Vue from 'vue'
import Hello from '@/components/Hello'
import TemporaryDrawer from '@/components/TemporaryDrawer'
import { shallow } from 'vue-test-utils'

describe('TemporaryDrawer.vue', () => {

  const wrapper = mount(Hello)

  it('all components mounted', () => {
    const vm = new Vue(TemporaryDrawer).$mount()
    expect(typeof vm.$options.components['drawer-item']).to.equal('object')
  })
  it('created exist', () => {
    expect(typeof TemporaryDrawer.created).to.equal('function')
  })
  it('created exist', () => {
    expect(typeof TemporaryDrawer.mounted).to.equal('function')
  })

  it('can open drawer', done => {
    var vm = new Vue(Hello).$mount()
    const button = vm.$el.querySelector('.mdc-toolbar__icon--menu')
    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)

    Vue.nextTick(() => {       
      expect(vm.$el.querySelector('.mdc-temporary-drawer--open')).to.exist;
      done()               
    })
  })
    
  it('can render fetched content', done => {
    var vm = new Vue(TemporaryDrawer).$mount()
    vm.treeData=JSON.parse('[{"id":1,"parent":0,"title":"vacation rentals"},{"id":5,"parent":0,"title":"friendship"},{"id":10,"parent":0,"title":"vehicles"}]')
    Vue.nextTick(() => {                    
        expect(vm.$el.textContent).to.contain('vehicles')          
        expect(vm.$el.textContent).to.contain('friendship')
        expect(vm.$el.textContent).to.contain('vacation rentals')
        done()                                  
    })       
  })

  it('can close drawer', done => {
    var vm = new Vue(Hello).$mount()
    const button = vm.$el.querySelector('.mdc-toolbar__icon--menu')
    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)

    Vue.nextTick(() => {       
      expect(vm.$el.querySelector('.mdc-temporary-drawer--open')).to.exist;
      const aside = vm.$el.querySelector('.mdc-toolbar__icon--menu')
      const clickEvent2 = new window.Event('click')
      aside.dispatchEvent(clickEvent2)
      Vue.nextTick(() => {   
          expect(vm.$el.querySelector('.mdc-temporary-drawer--open')).to.not.exist;               
          done()                                  
      })        
    })
  })

  it('toggle on toggle-drawer events', done => {
    var vm = new Vue(Hello).$mount()
    vm.$emit('toggle-drawer')
    setTimeout(function () {
      Vue.nextTick(() => {  
        expect(vm.$el.querySelector('.mdc-temporary-drawer--open')).to.exist;
        done()
      }) 
    },1000);
  })

  it('initialize foundation', () => {
    var vm = new Vue(TemporaryDrawer).$mount()
    expect(vm.foundation).not.to.equal(null)
  })


})
