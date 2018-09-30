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
import FlowReplyImport from '@/views/platform/children/monthlyManager/replyImport'
import FlowReplyExport from '@/views/platform/children/monthlyManager/replyExport'
import monthApplyRegular from '@/views/platform/children/monthlyApply/regular'
import monthApplySpecial from '@/views/platform/children/monthlyApply/special'
import monthHandleDeal from '@/views/platform/children/monthlyHandle/applyDeal'
import monthHandleHistory from '@/views/platform/children/monthlyHandle/applyHistory'
import monthHandleDownload from '@/views/platform/children/monthlyHandle/download'
import monthHandleSpecial from '@/views/platform/children/monthlyHandle/special'
import quarterlyManagerDeal from '@/views/platform/children/quarterlyManager/applyDeal'
import quarterlyManagerHistory from '@/views/platform/children/quarterlyManager/applyHistory'
import quarterlyManagerDownload from '@/views/platform/children/quarterlyManager/download'
import quarterlyManagerSpecial from '@/views/platform/children/quarterlyManager/special'
import quarterlyManagerRecycleBin from '@/views/platform/children/quarterlyManager/recycleBin'

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
          name: 'platform.index',
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
        },
        {
          path: 'flowreplyimport',
          name: 'platform.flowreplyimport',
          component: FlowReplyImport,
          meta:{
            auth: true,
            manager: true
          }
        },
        {
          path: 'flowreplyexport',
          name: 'platform.flowreplyexport',
          component: FlowReplyExport,
          meta:{
            auth: true,
            manager: true
          }
        },
        {
          path: 'month/apply/regular',
          name: 'month.apply.regular',
          component: monthApplyRegular,
          meta:{
            auth: true,
            monthApply:true
          }
        },
        {
          path: 'month/apply/special',
          name: 'month.apply.special',
          component: monthApplySpecial,
          meta:{
            auth: true,
            monthApply:true
          }
        },
        {
          path: 'month/handle/deal',
          name: 'month.handle.deal',
          component: monthHandleDeal,
          meta:{
            auth: true,
            monthHandle:true
          }
        },
        {
          path: 'month/handle/history',
          name: 'month.handle.history',
          component: monthHandleHistory,
          meta:{
            auth: true,
            monthHandle:true
          }
        },
        {
          path: 'month/handle/download',
          name: 'month.handle.download',
          component: monthHandleDownload,
          meta:{
            auth: true,
            monthHandle:true
          }
        },
        {
          path: 'month/handle/special',
          name: 'month.handle.special',
          component: monthHandleSpecial,
          meta:{
            auth: true,
            monthHandle:true
          }
        },


        {
          path: 'quarterly/manager/deal',
          name: 'quarterly.manager.deal',
          component: quarterlyManagerDeal,
          meta:{
            auth: true,
            quarterlyManager:true
          }
        },
        {
          path: 'quarterly/manager/history',
          name: 'quarterly.manager.history',
          component: quarterlyManagerHistory,
          meta:{
            auth: true,
            quarterlyManager:true
          }
        },
        {
          path: 'quarterly/manager/download',
          name: 'quarterly.manager.download',
          component: quarterlyManagerDownload,
          meta:{
            auth: true,
            quarterlyManager:true
          }
        },
        {
          path: 'quarterly/manager/special',
          name: 'quarterly.manager.special',
          component: quarterlyManagerSpecial,
          meta:{
            auth: true,
            quarterlyManager:true
          }
        },
        {
          path: 'quarterly/manager/recyclebin',
          name: 'quarterly.manager.recyclebin',
          component: quarterlyManagerRecycleBin,
          meta:{
            auth: true,
            quarterlyManager:true
          }
        }
      ]
    }
  ]
})
