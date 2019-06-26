import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import MessageR from '@/pages/MessageR'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/chatrooms/work',
      name: 'MessageR',
      component: MessageR,
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/login')
        } else {
          next()
        }
      }
    }
  ],
  mode: 'history'
})
