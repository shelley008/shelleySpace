import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import Vuex from 'vuex'

//共用样式
import './assets/css/layout.scss'

import VueResourse from 'vue-resource'
Vue.use(VueResourse)
// 阿里字体图标
import './static/css/neat-min.css'
import './static/css/iconfont.css'

// ui框架
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import i18n from '../lang'

//调用手机底层
//import '../static/js/summer.min.js'

//router拦截器
import '../src/common/js/routerIntercept.js'
//flexible
import './assets/js/flexible'


new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
