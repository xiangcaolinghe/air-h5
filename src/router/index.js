import Vue from 'vue'
import Router from 'vue-router'
// 网页
import Home from '@/views/index'
import Design from '@/views/design'
import Manage from '@/views/manage'
import Planning from '@/views/planning'
import Reduce from '@/views/reduce'
import Contact from '@/views/contact'
import NewList from '@/views/news/list'
import NewDetails from '@/views/news/details'
import DynamicList from '@/views/dynamic/list'
import DynamicDetails from '@/views/dynamic/details'
import NoticeList from '@/views/notice/list'
import NoticeDetails from '@/views/notice/details'
import signUpList from '@/views/signUp/list'
import signUpDetail from '@/views/signUp/detail'
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
      path: '/sign/list',
      name: 'sign.list',
      component: signUpList
    },
    {
      path: '/sign/detail',
      name: 'sign.detail',
      component: signUpDetail
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
    },
    {
      path: '/news/list',
      name: 'newList',
      component: NewList
    },
    {
      path: "/news/details",
      name: "newDetails",
      component: NewDetails
    },
    {
      path: "/dynamic/list",
      name: "dynamicList",
      component: DynamicList
    },
    {
      path: "/dynamic/details",
      name: "deynamicDetails",
      component: DynamicDetails
    },
    {
      path: "/notice/list",
      name: "noticeList",
      component: NoticeList
    },
    {
      path: "/notice/details",
      name: "noticeDetails",
      component: NoticeDetails
    }
  ]
})
