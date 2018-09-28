import Vue from 'vue'
import Router from 'vue-router'
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
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'platform',
      component: Platform,
      redirect: '/index',
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
    }
  ]
})
