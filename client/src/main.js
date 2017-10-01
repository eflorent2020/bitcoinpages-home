// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Resource from 'vue-resource'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import auth from '../auth'
// import Users from './model/users'
auth.checkAuth()
Vue.use(Resource)
Vue.use(VeeValidate)
Vue.config.productionTip = false
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

// Protect authenticated routes with Route Meta tags.
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.user.authenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    console.log(auth.user)
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (auth.user.role === 'admin') {
      next()
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  }
  if (to.matched.some(record => record.meta.checksAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (auth.user.authenticated) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
/**
window.bus = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
*/
/* eslint-disable no-new */
/* eslint-disable no-used-vars */
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
