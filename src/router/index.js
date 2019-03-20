import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/主数据',
  //   hidden: true,
  //   children: [{
  //     path: 'quartz',
  //     component: () => import('@/views/table/index'),
  //     meta: { title: '主页' }
  //   }, {
  //     path: 'monitor',
  //     component: () => import('@/views/monitor/index'),
  //     meta: { title: '监控', icon: 'form' }
  //   }, {
  //     path: 'syncTable',
  //     component: () => import('@/views/nested/menu2/index'),
  //     meta: { title: '添加同步表' }
  //   }]
  // }
  {
    path: '/',
    component: Layout,
    redirect: '/noah',
    name: '主页',
    meta: { title: '' },
    hidden: true,
    children: [{
      path: 'noah',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页' }
    }]
  },

  {
    path: '/noah',
    component: Layout,
    redirect: '/QUARTZ',
    name: 'Example',
    meta: { title: '', icon: 'quartz' },
    children: [
      {
        path: 'quartz',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '任务调度', icon: 'table' }
      }
    ]
  },
  {
    path: '/noah',
    component: Layout,
    children: [
      {
        path: 'monitor',
        name: 'Form',
        component: () => import('@/views/monitor/index2'),
        meta: { title: '监控', icon: 'example' }
      }
    ]
  },
  {
    path: '/noah',
    component: Layout,
    // redirect: '/nested/menu1',
    name: 'Nested',
    // meta: {
    //   title: 'Nested',
    //   icon: 'nested'
    // },
    children: [
      {
        path: 'addSyncTable',
        component: () => import('@/views/addSyncTable/index'),
        meta: { title: '添加同步表', icon: 'form' }
      }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
