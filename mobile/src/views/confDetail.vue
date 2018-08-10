<template>
<div class="confDetail_wrap" :class="{enLabelWidth:!isLangCN}">
  <v-nav :path="path" :title="$t('confDetail.title')" :returnFlag="returnFlag"></v-nav>
  <div class="confDetail_main">
    <div class="wrapper-line conf-box">
        <v-list>
          <li class="item-content">
            <div class="item-inner-wrap">
              <div class="item-title-l">{{ $t('common.conferences.name') }}</div>
              <div class="item-after-r">{{conf.name}}</div>
            </div>
          </li>
        </v-list>
    </div>

   <div class="wrapper-line conf-box">
      <v-list>
              <li class="item-content" >
                  <div class="item-inner-wrap">
                      <div class="item-title-l">{{ $t('common.conferences.startTime') }}</div>
                      <div class="item-after-r" v-if="conf.startTime == -1">{{ $t('common.nothing') }}</div>
                      <div class="item-after-r" v-if="conf.startTime > 0">
                        {{new Date(conf.startTime) | moment('YYYY-MM-DD HH:mm')}}
                      </div>
                  </div>
              </li>
              <li class="item-content">
                  <div class="item-inner-wrap">
                      <div class="item-title-l" :class="{letter2em:isLangCN}">{{ $t('common.conferences.duration') }}</div>
                      <div class="item-after-r" v-if="conf.startTime == -1">{{ $t('common.nothing') }}</div>
                      <div class="item-after-r" v-if="conf.startTime > 0">
                        {{ conf.duration | formatDuration }}
                      </div>
                  </div>
              </li>
              <li class="item-content">
                <div class="item-inner-wrap">
                  <div class="item-title-l">{{ $t('common.conferences.numericId') }}</div>
                  <div class="item-after-r">{{conf.numericId}}</div>
                </div>
              </li>
              <li class="item-content">
                  <div class="item-inner-wrap">
                      <div class="item-title-l">{{ $t('common.conferences.password') }}</div>
                      <div class="item-after-r">{{conf.password}}</div>
                  </div>
              </li>
              <li class="item-content">
                  <div class="item-inner-wrap">
                      <div class="item-title-l">{{ $t('common.conferences.remark') }}</div>
                      <div class="item-after-r description-wrap descriptionWrapHeight" ref="desEle">{{conf.description}}</div>
                  </div>
              </li>
          </v-list>
       </div>
       <div class="wrapper-line" v-if="conf.users && conf.users.length > 0">
         <div class="userHeadWrapper">
           <div v-for="(user,index) in conf.users" class="userList-body" :key="user.id">
                  <span class="userHeader">
                    <img :src="getImgURL(user)" class="img-head-default" :onerror="errorImg01"/>
                    <p class="userName" v-if="user.name.length>4">{{user.name.substring(0,4)}}...</p>
                    <p class="userName" v-if="user.name.length<=4">{{user.name}}</p>
                  </span>
           </div>
         </div>
      </div>
  </div>

<!-- 已召开会议 -->
<div class="footer-wrapper x-size-foot" v-if="conf.status === 'ONGOING'">
       <ul class="footer-menu">
            <li><i class="icon-f-share" @click="shareActionSheet()"></i>{{ $t('confDetail.operate.share') }}</li>
            <li v-if="getRole()"><i class="icon-f-manage" @click="confControl()" ></i>{{ $t('confDetail.operate.controlconf') }}</li>
            <li v-if="getRole()"><i class="icon-f-close" @click="terminateConf(conf)" ></i>{{ $t('confDetail.operate.terminate') }}</li>
       </ul>
       <div class="footer-entry" v-on:click="joinConf()">
          {{ $t('confDetail.operate.enterconf') }}
       </div>
</div>
<!-- 未开始会议 -->
<div class="footer-wrapper x-size-foot" v-if="conf.status !== 'ONGOING'">
       <ul class="footer-menu">
            <li><i class="icon-f-share" @click="shareActionSheet()"></i>{{ $t('confDetail.operate.share') }}</li>
            <li v-if="getRole()"><i class="icon-f-edit" @click="openConfSchedule()" ></i>{{ $t('confDetail.operate.edit') }}</li>
            <li v-if="getRole()"><i class="icon-f-delete" @click="deleteConf(conf)" v-if="getRole()"></i>{{ $t('confDetail.operate.delete') }}</li>
       </ul>
</div>

<!-- 分享弹层 -->
<yd-popup v-model="showShareSheet" class="shareBottom" position="bottom">
    <div class="popShareWrapper">
          <share-template :numericid="0" :confid="confId"></share-template>
          <div class="cancleWrap" @click="shareActionSheet()">{{ $t('common.Cancel') }}</div>
    </div>
</yd-popup>

</div>
</template>

<script>
import Vue from 'vue'
import VNav from '../components/Nav'
import VContent from '../components/Content'
import VList from '../components/List'
import {getConferenceRest, removeConferenceRest, terminateConferenceRest} from '../api/conference'

import '../assets/css/sm.css'
import {fileServletHost} from "../api/config"
import shareTemplate from "../components/share"
//commone js
import {setFootPosition,formatDurationFn,setFromatParam} from "../common/js/global.js"

import {Popup} from 'vue-ydui/dist/lib.rem/popup'
Vue.component(Popup.name, Popup);

export default {
  data () {
    return {
      // title: '会议详情',
      path: '/conferences',
      conf: {},
      returnFlag: true,
      isShareView: false,
      numericId:0,
      confId: 0,
      showShareSheet: false,
      errorImg01: 'this.src="' + require('../assets/img/user.png') + '"',
      desH:0
    }
  },
  created () {
    this.getconfRest()
  },
  
  mounted() {
    window.vue = this
    //iphone x footer position
    setFootPosition('.x-size-foot',20,'subpage')
    this.$forceUpdate()
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if (Object.is(from.path, '/conferences') && Object.is(to.path, '/confDetail')) {
         this.getconfRest()
         setFootPosition('.x-size-foot',20,'subpage')
      }
    }
  },
  computed: {
    isLangCN() {
      return this.$i18n.locale == 'cn'
    }
  },
  filters: {
      formatDuration(ms){
          let time = formatDurationFn(ms)
          return time
      }
  },
  methods: {
    confControl() {
      this.$router.push({
        path:'/confControl',
        query: {
          numericId: this.conf.numericId,
          token:localStorage.getItem('token'),
          showNav:true
        }
      })
    },
    shareActionSheet () {
      this.showShareSheet = !this.showShareSheet;
    },
    shareByWechat () {
      setFromatParam('shareWechat',this.conf)
    },
    shareByEmail () {
      setFromatParam('shareEmail',this.conf)
    },
    terminateConf(conf) {
      this.$dialog.confirm({
        title:this.$t('common.Prompt'),
        mes: this.$t('confDetail.sureToTerminate') + conf.name + this.$t('confDetail.sMeeting'),
        opts: [{
          txt: this.$t('common.Cancel'),
          color: false
        },{
          txt: this.$t('common.Save'),
          color: true,
          callback: () => {
            this.$dialog.loading.open(this.$t('common.loadingTxt'))
            this.didTerminateConf(conf)
          }
        }]
      })
    },
    didTerminateConf(conf) {
      let params = {
        confId: conf.id,
        token: localStorage.getItem("token")
      };
      terminateConferenceRest(params)
        .then(res => {
          this.$dialog.loading.close()
          this.$router.push({ path: "/conferences" })
        })
        .catch(err => {
          this.$dialog.loading.close()
          console.log(err);
        });
    },
    deleteConf(conf) {
        this.$dialog.confirm({
          title:this.$t('common.Prompt'),
          mes: this.$t('confDetail.sureTodelete') + conf.name + this.$t('confDetail.sMeeting'),
          opts: [{
            txt: this.$t('common.Cancel'),
            color: false
          },{
            txt: this.$t('common.Save'),
            color: true,
            callback: () => {
              this.$dialog.loading.open(this.$t('common.loadingTxt'))
              this.didDeleteConf(conf)
            }
          }]
        })
    },
    didDeleteConf(conf) {
      let params = {
        id: conf.id,
        token: localStorage.getItem("token")
      };
      removeConferenceRest(params)
        .then(res => {
          this.$dialog.loading.close()
          this.$router.push({ path: "/conferences" })
        })
        .catch(err => {
          this.$dialog.loading.close()
          console.log(err);
        });
    },
    getconfRest () {
      let _this = this
      let confid = this.$route.query.confid
      this.confId = confid
      if (!confid) return
      let para = {
        id: confid,
        token: localStorage.getItem('token')
      }
      _this.confNumber = confid
      getConferenceRest(para)
          .then(res => {
            this.conf = res.data
            this.getRole()
          })
          .catch(function(error) {
            console.log(error)
          })
    },
    getRole () {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if(!this.conf.hasOwnProperty('name') || !currentUser) return false
      var isAdmin = currentUser.role === 'ORG_ADMIN'
      let myDeptConf = currentUser.role === 'DEPT_ADMIN' && (this.conf.applicant && this.conf.applicant.deptId === currentUser.deptId)
      var isRoomAdmin = this.conf.confRoom && this.conf.confRoom.bindedUser && this.conf.confRoom.bindedUser.id === currentUser.id
      var isApplicat = this.conf.applicant && this.conf.applicant.id == currentUser.id
      var isHostUser = this.conf.hostUserIds && this.conf.hostUserIds.indexOf(currentUser.id) > 0
      return (isAdmin || myDeptConf || isRoomAdmin || isApplicat || isHostUser)
    },
    gotoControlConf () {
      let _this = this
      _this.$router.push({
        path: '/confControl',
        query: {
          numericId: this.conf.numericId,
          token: localStorage.getItem('token'),
          userId: this.userId,
          showNav:true,
          from: 'message'
        }
      })
    },
    joinConf () {
      let param = {
          id: this.conf.id,
          name: this.conf.name,
          startTime: this.conf.startTime,
          duration: this.conf.duration,
          numericId: this.conf.numericId,
          password: this.conf.password
       }
      setFromatParam('joinConf', param)
    },
    openConfSchedule(){
      let domSubDescript = document.querySelector('.descriptionWrapHeight')
      this.desH = domSubDescript.getBoundingClientRect().height
      this.$store.commit('COF_DESCRIPTION',this.desH)
      let confid = this.$route.query.confid
      this.$router.push({
          path: '/confSchedule',
          query: {
            confid: confid
            },
          replace: true
      });
    },
    getImgURL(user){
      return window.location.protocol + "//" + fileServletHost + "/fileServlet?userToken=" + localStorage.getItem("token") + "&action=userAvatar&ownerId=" + user.id;
    },
    showMsgFromChild: function(data) {
      this.findRoom = data;
    },
  },
  components: {
    VNav,
    VContent,
    VList,
    shareTemplate
  }
}
</script>

