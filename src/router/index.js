import Vue from 'vue'
import Router from 'vue-router'
// 网页
import Login from '@/views/login/index'
// 后台
import Backstage from '@/views/backstage/app'
import BackstageNews from '@/views/backstage/children/news/list'
import BackstageNewsDetai from '@/views/backstage/children/news/details'
import BackstageNotice from '@/views/backstage/children/notice/list'
import BackstageNoticeDetail from '@/views/backstage/children/notice/details'
import BackstageMeeting from '@/views/backstage/children/meeting/list'
import BackstageMeetingDetail from '@/views/backstage/children/meeting/details'
import BackstageUser from '@/views/backstage/children/user/list'
import BackstageClassify from '@/views/backstage/children/classify/list'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Backstage,
      redirect: '/news',
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
            title:"详情"
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
        },
        {
          path: 'classify',
          name: 'backstage.classify',
          component: BackstageClassify,
          meta: {
            auth: true,
          }
        }
      ]
    },
  ]
})
