<template>
  <div class="confControl-wrap" @click="claseEditStatus(true)" >

    <yd-navbar class="confControl-head" ref="confTopBar">
              <div @click="routerBack" slot="left" class="icon icon-xiangzuo1" v-if="!attendssDataFilter || attendssDataFilter.length == 0"></div>
              <div slot="center">{{ $t('confControl.navTitle') }}</div>
    </yd-navbar>

    <div v-show="attendssDataFilter && attendssDataFilter.length > 0">
       <yd-cell-group class="confControl-body confControlAuto" >
            <yd-cell-item v-for="(ep,index) in attendssDataFilter" :class="{editStatus:selectedPartGuid === ep.guid}"
                                :key="ep.guid" @click.native.stop="toggleSelectPart(ep,true)">
                   <div slot="left" class="user-wrapper">
                        <div class="user-head">
                            <img :src="getImgURL(ep)" class="demo-checklist-img" :onerror="errorImg01">
                        </div>
                        <div class="user-name">{{ep.name}}</div>
                   </div>
                   <div slot="right" @click.stop>
                         <div class="bar-edit" v-if="selectedPartGuid === ep.guid && hasPermission" >
                             <i class="btn-conf-eidt" @click.stop="cancelHandsUp(ep)" v-if="ep.handsUp" plain>{{ $t('confControl.btns.Handsoff') }}</i>
                             <i class="btn-conf-eidt" @click.stop="setFocusVideo(ep)" v-if="!ep.focus">{{ $t('confControl.btns.focus') }}</i>
                             <i class="btn-conf-eidt" @click.stop="cancelFocusVideo(ep)" v-else plain>{{ $t('confControl.btns.unfocus') }}</i>
                             <i class="btn-conf-eidt" @click.stop="mute(ep)" v-if="!ep.audioMuted">{{ $t('confControl.btns.mute') }}</i>
                             <i class="btn-conf-eidt" @click.stop="unmute(ep)" v-else plain>{{ $t('confControl.btns.unmute') }}</i>
                             <i class="btn-conf-eidt" @click.stop="disconnectionEp(ep)" plain>{{ $t('confControl.btns.hangup') }}</i>
                         </div>
                         <div class="bar-default" v-else>
                           <i class="iconConf iconConfVote" v-if="ep.handsUp" ></i>
                           <i class="iconConf iconConfStar" v-if="ep.focus"></i>
                           <i class="iconConf iconConfSoundOff" v-if="ep.audioMuted"></i>
                           <i class="iconConf iconConfSound" v-else></i>
                         </div>
                   </div>
            </yd-cell-item>
       </yd-cell-group>

      <div class="confControl-foot" ref="confDownBar">
        <span class="btn-conf-base" @click="shareActionSheet()"><i class="icon-inviteUser"></i>{{ $t('confControl.title') }}</span>
        <span class="btn-conf-base" @click="muteAll()" v-show="hasPermission"><i class="icon-prohibit"></i>{{ $t('confControl.btns.muteAll') }}</span>
        <span class="btn-conf-base" @click="unmuteAll()" v-show="hasPermission"><i class="icon-prohibit-cancle"></i>{{ $t('confControl.btns.unmuteAll') }}</span>
      </div>
    </div>

    <div v-show="!attendssDataFilter || attendssDataFilter.length == 0" class="closeWrapper">
        <div class="closeWrapper-tip">
           <i class="icon icon-shangxin"></i>
           <p>{{ $t('confControl.noMeetingMessage') }}</p>
        </div>
        <div class="confControl-foot" ref="confDownBar">
          <span class="btn-conf-base" @click="shareActionSheet()"><i class="icon-inviteUser"></i>{{ $t('confControl.title') }}</span>
        </div>
    </div>

      <!-- 邀请弹层 -->
      <yd-popup v-model="showShareSheet" class="shareBottom" position="bottom">
          <div class="popShareWrapper">
                <share-template :numericid="numericId" :confNameInfo='confNameInfo'></share-template>
                <div class="cancleWrap" @click="shareActionSheet()">{{ $t('common.Cancel') }}</div>
          </div>
      </yd-popup>
    </div>
</template>

<script>
import Vue from 'vue'
import VNav from "../components/Nav"
import VButton from '../components/Button'
import VIcon from '../components/Iconfont'
import VTabs from '../components/Tabs'
import VTab from '../components/Tab'
import VCardContainer from '../components/Card'
import Card from '../components/CardItem'
import List from "../components/List"
import Item from "../components/ListItem"
import shareTemplate from "../components/share";

import {getUrlParamsObj, changeLang} from "../common/js/utils"
import {conferenceInfo} from '../api/conference'
import {getConfAttendssListRest,muteOrUnmuteRest,muteAllOrUnmuteAllRest,setOrCancelFocusVideoRest,setOrCancelHandsUpRest,disconnectionEpRest} from '../api/confControl'

import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button'
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell'
import {fileServletHost} from "../api/config"
import {NavBar, NavBarBackIcon, NavBarNextIcon} from 'vue-ydui/dist/lib.rem/navbar';
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
import { loginByToken } from "../api/login";

Vue.component(Popup.name, Popup);
Vue.component(NavBar.name, NavBar);
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);

export default {
  data () {
    return {
      path: "/conferences",
      title: "会议管理",
      confNameInfo: 2,
      returnFlag: true,
      attendssData: [],
      attendssDataFilter: [],
      confGuidUrl: '',
      editVisible: false,
      selectPartId: 0,
      showNav: false,
      showShareSheet: false,
      conf: {},
      confId: 0,
      numericId: 10,
      selectedPartGuid: 0,
      hasPermission: false,
      errorImg01: 'this.src="' + require('../assets/img/user.png') + '"'
    }
  },
  created() {
   this.initParams()
  },
  mounted: function () {
    window.vue = this
    changeLang(this.$i18n)
    this.setMainHeight()
    this.autoRefresh()
  },
  computed: {
    length () {
      return this.attendssDataFilter.length
    }
  },

  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if (Object.is(from.path, '/confControl')) {
        clearInterval(this.intervalid)
        changeLang(this.$i18n)
      }else if(Object.is(to.path, '/confControl')) {
        this.attendssDataFilter = []
        this.initParams()
        this.autoRefresh()
      }
    }
  },
  methods: {
    autoRefresh() {
      this.intervalid = setInterval(
        function() {
          this.getTableData()
        }.bind(this),
        5000
      );
    },
    initParams :function() {
      console.log("initParams")
      let urlParamsObj = getUrlParamsObj(window.location.href)
      let numericId = urlParamsObj['numericId']
      if(urlParamsObj && numericId) {
        let oldNumericId = localStorage.getItem('numericId')
        console.log('oldNumericId =' + oldNumericId)
        console.log('newNumericId =' + numericId)
        localStorage.setItem('numericId',numericId)
        if(!Object.is(oldNumericId,numericId)) {
          console.log('numericId has change')
        }
        this.numericId = numericId;
      }else {
        console.error('get params error numericId is undefiend');
      }

      console.log('get params from url', urlParamsObj)
      if (urlParamsObj && urlParamsObj['token']) {
        localStorage.setItem('token', urlParamsObj['token'])
        this.loginByToken();
      } else {
        localStorage.setItem('token', urlParamsObj['token'])
        console.warn('get params error token is undefiend')
      }

      if (urlParamsObj && urlParamsObj['showNav']) {
        this.showNav = true
      } else {
        this.showNav = false
      }

      this.filter = {
        token: localStorage.getItem('token')
      };

      // let confId = urlParamsObj['confId'];
      // if (urlParamsObj && confId) {
      //   localStorage.setItem('confId', confId);
      //   this.confId = confId;
      // } else {
      //   console.error('get params error numericId is undefiend');
      // }

      if (this.confId) {
        this.getTableData(this.confId);
        console.log("this.confId getTableData");
      }else{
        let para = {};
        if (this.numericId) {
          para.numericId = this.numericId;
        }

        conferenceInfo(para).then((res) => {
          if(res.data && res.data.confId) {
            this.confId = res.data.confId;
            localStorage.setItem('confId', this.confId);
            this.getTableData(this.confId);
            console.log('getTableData');
          }else {
            this.initParams();
            console.log('get params');
          }
        }).catch(function (error) {
          console.log('get user error');
          console.log(error);
        });
      }
    },
    loginByToken() {
      let token = localStorage.getItem("token");
      if (!token) return;
      loginByToken(token).then(res => {
        localStorage.setItem('userName', res.data.name)
        localStorage.setItem("currentUser", JSON.stringify(res.data.profile))
      });
    },
    toggleSelectPart(ep, isSelected) {
      if(isSelected) {
        if(ep.guid === this.selectedPartGuid){
            this.selectedPartGuid = 0;
        } else {
            this.selectedPartGuid = ep.guid;
        }
      }else {
        this.selectedPartguid = 0
      }
    },
    claseEditStatus(val){
       if(val){
         this.selectedPartGuid = 0;
       }
    },
    getRole (conf) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if(!conf.hasOwnProperty('basicInfo') || !currentUser) return false
      let isAdmin = currentUser.role === 'ORG_ADMIN'
      let myDeptConf = currentUser.role === 'DEPT_ADMIN' && (conf.applicant && conf.applicant.deptId === currentUser.deptId)
      let isRoomAdmin =  !!conf.confRoom && conf.confRoom.bindedUser && conf.confRoom.bindedUser.id === currentUser.id
      let isApplicat = !!conf.applicant && conf.applicant.id === currentUser.id
      let isHostUser = !!conf.hostUserIds && conf.hostUserIds.indexOf(currentUser.id) > 0;
      return (isAdmin || myDeptConf || isRoomAdmin || isApplicat || isHostUser)
    },
    cancelFocusVideo(ep) {
      console.log("cancelFocusVideo");
    },
    setFocusVideo(ep) {
      console.log("setFocusVideo");
    },
    mute(ep,mute=true) {
      const params = {
        numericId:this.confId,
        epGuid:ep.guid,
        muteAudio:mute,
        token:localStorage.getItem('token')
      };

      console.log(params);
      muteOrUnmuteRest(params).then((res) => {
        this.getTableData();
        let msg = mute? this.$t('confControl.muteSuccTip'):this.$t('confControl.unMuteSuccTip');
        this.$dialog.toast({
          mes: msg,
          timeout: 1000
        })
      }).catch((err) => {
        console.log(err)
      });
      console.log("mute")
    },
    unmute(ep) {
      this.mute(ep, false)
    },
    muteAll(ep, muteAll=true) {
      const params = {
        numericId:this.confId,
        muteAudio:muteAll,
        token:localStorage.getItem('token')
      }

      console.log(params)
      muteAllOrUnmuteAllRest(params).then((res) => {
        this.getTableData();
        let msg = muteAll ? this.$t('confControl.muteAllSuccTip') : this.$t('confControl.unMuteAllSuccTip');
        this.$dialog.toast({
          mes: msg,
          timeout: 1000
        })
      }).catch((err) => {
        console.log(err);
      })
      console.log("muteAll");
    },
    unmuteAll(ep) {
      this.muteAll(ep, false)
      console.log("unmuteAll")
    },
    setFocusVideo(ep,setFocus=true) {
      const params = {
        numericId: this.confId,
        epGuid: ep.guid,
        setFocus: setFocus,
        token:localStorage.getItem('token')
      };

      console.log(params);
      setOrCancelFocusVideoRest(params).then((res) => {
        this.getTableData(); 
        let msg = setFocus? this.$t('confControl.focusSuccTip') : this.$t('confControl.unFocusSuccTip');
        this.$dialog.toast({
          mes: msg,
          timeout: 1000
        })
      }).catch((err) => {
        console.log(err);
      });
      console.log("setOrCancelFocusVideoRest");
    },
    cancelFocusVideo(ep) {
      this.setFocusVideo(ep, false);
      console.log("setOrCancelFocusVideoRest")
    },
    setHandsUp(ep, setHandsUp = false) {
      const params = {
        numericId: this.confId,
        epGuid: ep.guid,
        handsUp: setHandsUp,
        token: localStorage.getItem('token')
      };
      console.log(params)
      setOrCancelHandsUpRest(params).then((res) => {
        this.getTableData()
        let msg = setHandsUp? this.$t('confControl.handsupSuccTip') : this.$t('confControl.handsoffSuccTip');
        this.$dialog.toast({
          mes: msg,
          timeout: 1000
        })
        if(setHandsUp) {
          console.log("set handsUp successed");
        }else {
          console.log("cancel handsUp successed");
        }
      }).catch((err) => {
        if(setHandsUp) {
          console.error("set handsUp error ",err)
        }else {
          console.error("cancel handsUp error",err)
        }
      });
    },
    cancelHandsUp(ep) {
      this.setHandsUp(ep,false);
      console.log("set handsUp start");
    },
    setMessageOverlay(ep) {
      console.log("setMessageOverlay");
    },
    disconnectionEp(ep){
      this.$dialog.confirm({
        title:this.$t('common.Prompt'),
        mes: this.$t('confControl.sureToHangup') + ep.name + this.$t('confControl.sMeeting'),
        opts: [{
          txt: this.$t('common.Cancel'),
          color: false
        },{
          txt: this.$t('common.Save'),
          color: true,
          callback: () => {
            this.didDisconnectionEp(ep)
          }
        }]
      })
    },
    didDisconnectionEp(ep){
      const params = {
        numericId: this.confId,
        epGuid: ep.guid,
        token: localStorage.getItem('token')
      };
      disconnectionEpRest(params).then((res) => {
        this.getTableData();
        console.log('remove endpoint successed')
        this.$dialog.toast({
          mes: this.$t('confControl.hangupSuccTip'),
          timeout: 1000
        })
      }).catch((err) => {
        console.log('remove endpoint error')
        console.log(err);
      })
    },


    //---------------------获取列表数据
    getTableData(confId=undefined){
      // if(typeof ) {
      //
      // }
      if(this._isVue) {
        window.vueComp = this;
      }
      // if(this.$route && this.$route.query && this.$route.query.guid) {
      //   guid = this.$route.query.guid;
      //
      // }
      // if (this.$route && this.$route.query && this.$route.query.confid) {
      //   this.confid = this.$route.query.confid;
      // }
      // if(numericId === undefined) {
      //   let urlParamsObj = getUrlParamsObj(window.location.href);
      //   numericId = urlParamsObj['numericId'];
      // }
      // this.numericId = numericId;

      // if (confId === undefined) {
      //   confId = localStorage.getItem('confId')
      // }
      // this.confId = confId;
      // if(!guid) return;
      // this.confGuid = guid;
      if(confId === undefined) {
        if(this.confId) {
          confId = this.confId;
        }else {
          confId = localStorage.getItem("confId")
        }
      }
      console.log('confId',confId);
      let para = {
        token:localStorage.getItem('token'),
        numericId:confId,
        deviceId:localStorage.getItem('deviceId')
      };

      getConfAttendssListRest(para).then((res) => {
        this.conf = res.data;
        this.attendssData = this.conf.parties;
        console.log('get endpoints length from server = '+ this.conf.parties.length);
        window.vueComp.attendssDataFilter = [];
        for (let part of this.attendssData) {
          if(part && 'connected' === part['connectionStatus']) {
            //判断是否是主持人
//             if(part.guid === this.conf.lecturerGuid) {
//               part.name += '主会场';
//             }
            if(window.vueComp.conf.hostUserIds.indexOf(part.userId ) > 0) {
              part.name += this.$t('confControl.host');
            }
            window.vueComp.attendssDataFilter.push(part);
            console.log('join conf endpont name = ' + part.name);
          }
        }
        window.vueComp.hasPermission = window.vueComp.getRole(window.vueComp.conf);
        console.log('join conf endponts length = '+ window.vueComp.attendssDataFilter.length);
      }).catch((error) => {
      });
    },
    getImgURL(part) {
      return window.location.protocol + "//" + fileServletHost + "/fileServlet?userToken=" + localStorage.getItem("token") + "&action=userAvatar&ownerId=" + part.deviceId;
    },
    //邀请
    shareActionSheet () {
      this.showShareSheet = !this.showShareSheet;
    },
    //返回
    routerBack(){
       this.$router.go(-1);
    },

    //设置中间内容高度
    setMainHeight(){
      if(this.attendssData){
            //root height
            let wHeight = parseInt(document.documentElement.clientHeight)
            //root font size
            let htmlRoot = document.documentElement;
            if(wHeight > 414) {
              htmlRoot.style.fontSize = htmlFontSize * 54/41.4 + 'px'
            }
            let htmlFontSize = parseFloat(htmlRoot.style.fontSize)
            //top bar height
            let topDomRem = parseFloat(this.$refs.confTopBar.height)
            let t = htmlFontSize * topDomRem;
            //down bar height
            let confDownBar = this.$refs.confDownBar;
            let d = parseFloat(confDownBar.getBoundingClientRect().height)
            //mid height
            let midHeigh= wHeight - t - d
            let midSize = (midHeigh + 'px').toString()
            //set mid height
            let mainDomEle = document.querySelector('.confControlAuto')
            mainDomEle.style.height = midSize;
            this.$forceUpdate()
       }

    }
  },
  components: {
    VNav,
    VButton,
    VIcon,
    VTabs,
    VTab,
    VCardContainer,
    Card,
    List,
    Item,
    shareTemplate
  },
  beforeDestroy () {
    console.log("get ongoingConferences timer is close");
    clearInterval(this.intervalid);
  }
}
</script>
