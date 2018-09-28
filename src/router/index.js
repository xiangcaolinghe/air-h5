import Vue from 'vue'
import Router from 'vue-router'
// 网页
import Home from '@/views/index'
import Login from '@/views/login/index'
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
// 班机航线平台
import Platform from '@/views/platform/app'
import platformIndex from '@/views/platform/children/index'
import platformAirway from '@/views/platform/children/airway/list'
import FlowPath from '@/views/platform/children/monthlyManager/flowPath'
import FlowImport from '@/views/platform/children/monthlyManager/import'
import platformLocal from '@/views/platform/children/localManager/index'
import FlowManager from '@/views/platform/children/monthlyManager/manager'
import FlowManagerAdd from '@/views/platform/children/monthlyManager/manager_add'
import FlowStatistics from '@/views/platform/children/monthlyManager/statistics'
// 后台
import Backstage from '@/views/backstage/app'
import BackstageNews from '@/views/backstage/children/news/list'
import BackstageNewsDetai from '@/views/backstage/children/news/details'
import BackstageNotice from '@/views/backstage/children/notice/list'
import BackstageNoticeDetail from '@/views/backstage/children/notice/details'
import BackstageMeeting from '@/views/backstage/children/meeting/list'
import BackstageMeetingDetail from '@/views/backstage/children/meeting/details'
import BackstageUser from '@/views/backstage/children/user'
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
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: true
      }
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
    },
    {
      path: '/platform/',
      name: 'platform',
      component: Platform,
      redirect: '/platform/index',
      meta: {
        auth: true,
        hideLeft:true
      },
      children:[
        {
          path: 'index',
          component: platformIndex,
          meta: {
            auth: true,
            hideLeft:true
          },
        },
        {
          path: 'airway',
          name: 'platform.airway',
          component: platformAirway,
          meta: {
            auth: true,
            hideLeft:true
          },
        },
        {
          path: 'local',
          name: 'platform.local',
          component: platformLocal,
          meta: {
            auth: true
          }
        },
        {
          path: 'flowpath',
          name: 'platform.flowpath',
          component: FlowPath,
          meta: {
            auth: true,
            manager: true

          }
        },
        {
          path: 'flowimport',
          name: 'platform.flowimport',
          component: FlowImport,
          meta:{
            auth: true,
            manager: true
          }
        },
        {
          path: 'flowManager',
          name: 'platform.flowmanager',
          component: FlowManager,
          meta:{
            auth: true,
            manager: true
          }
        },
        {
          path: ':id',
          name: 'platform.flowmanageradd',
          component: FlowManagerAdd,
          meta:{
            auth: true,
            manager: true
          }
        },
        {
          path: 'flowstatistics',
          name: 'platform.flowstatistics',
          component: FlowStatistics,
          meta:{
            auth: true,
            manager: true
          }
        }
      ]
    },
    {
      path: '/backstage/',
      name: 'backstage',
      component: Backstage,
      redirect: '/backstage/news',
      meta: {
        auth: true,
        hideLeft:true
      },
      children:[
        {
          path: 'news',
          name: 'backstage.news',
          component: BackstageNews,
          meta: {
            auth: true
          }
        },
        {
          path:'news/detail',
          name:'backstage.news.detail',
          component:BackstageNewsDetai,
          meta: {
            auth: true,
          }
        },
        {
          path: 'notice',
          name: 'backstage.notice',
          component: BackstageNotice,
          meta: {
            auth: true
          }
        },
        {
          path: 'notice/detail',
          name: 'backstage.notice.detail',
          component: BackstageNoticeDetail,
          meta: {
            auth: true
          }
        },
        {
          path: 'meeting',
          name: 'backstage.meeting',
          component: BackstageMeeting,
          meta: {
            auth: true,
          }
        },
        {
          path: 'meeting/detail',
          name: 'backstage.meeting.detail',
          component: BackstageMeetingDetail,
          meta: {
            auth: true,
          }
        },
        {
          path: 'user',
          name: 'backstage.user',
          component: BackstageUser,
          meta: {
            auth: true,
          }
        }
      ]
    },
  ]
})
