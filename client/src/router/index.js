import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Message from '@/components/Message'
import Redirect from '@/components/Redirect'
import Register from '@/components/Register'
import Verify from '@/components/Verify'
import ResetPassword from '@/components/ResetPassword'
import ForgotPassword from '@/components/ForgotPassword'
import Login from '@/components/Login'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/message/:jid/:slug',
      name: 'Message',
      component: Message
    },
    {
      path: '/',
      name: 'Hello2',
      component: Redirect
    },
    { path: '/users', component: Users, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/register', component: Register, meta: { checksAuth: true } },
    { path: '/login', name: 'Login', component: Login, meta: { checksAuth: true } },
    { path: '/verify', component: Verify },
    { path: '/forgotpassword', component: ForgotPassword },
    { path: '/reset/:token', component: ResetPassword },
    { path: '/verify/:id/:token', component: Verify }
  ]
})
