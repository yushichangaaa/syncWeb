import Vue from 'vue'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.js'

import VueElementExtends from 'vue-element-extends'
import 'vue-element-extends/lib/index.css'

// import echarts from 'echarts'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import VueResource from 'vue-resource'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
import '../mock' // simulation data

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueElementExtends)

// Vue.prototype.$echarts = echarts
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = '主数据-' + to.meta.title
  } else {
    document.title = '主页'
  }
  next()
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
