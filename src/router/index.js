import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/index'
import Design from '@/views/design'
import Manage from '@/views/manage'
import Planning from '@/views/planning'
import Reduce from '@/views/reduce'
import Contact from '@/views/contact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/design',
      name: 'design',
      component: Design
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage
    },
    {
      path: '/planning',
      name: 'planning',
      component: Planning
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/reduce',
      name: 'reduce',
      component: Reduce
    }
  ]
})
