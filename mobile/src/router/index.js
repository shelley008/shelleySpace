import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import myroom from '../views/myroom'
import confDetail from '../views/confDetail'
import confSchedule from '../views/confSchedule'
import confScheduleSuccess from '../views/confScheduleSuccess'
import users from '../views/users'
//会议成员
import members from '../views/confDetailUserList'

import moment from 'moment' //?
// main的5个首页面
//import conferences  from '../views/main/conferences.vue'
const conferences = r => require.ensure([], () => r(require('../views/index')))
const confControl = r => require.ensure([], () => r(require('../views/confControl')))
const Login = r => require.ensure([], () => r(require('../views/login.vue')))

const ShareConf = r => require.ensure([], () => r(require('../views/shareConf/shareconf.vue')))
const ShareRoom = r => require.ensure([], () => r(require('../views/shareConf/shareroom.vue')))

Vue.use(require('vue-moment'), {
  moment
})
Vue.use(Router)

const routes = [{
  path: '/',
  component: App,
  children: [
    {path: '/login', component: Login},
    {
      path: '',
      redirect: '/conferences',
      // beforeEnter: (to, from, next) => {
      //   console.log('---11---------1',from.path)
      //   next()
      // }
    },
    {path: '/conferences', component: conferences},
    {path: '/confControl', component: confControl},

    {path: '/myroom', component: myroom},
    {path: '/confDetail', component: confDetail},
    {name:'confSchedule',path: '/confSchedule', component: confSchedule},
    {name:'confScheduleSuccess', path: '/confScheduleSuccess', component: confScheduleSuccess},
    {path: '/users', component: users},
    // 查看全部成员
    {path: '/members', component: members},
    //分享
     {path: '/shareconf', component: ShareConf},
     {path: '/shareroom', component: ShareRoom}
  ]
}]

export default new Router({
  routes, linkActiveClass: 'my-active'
})
