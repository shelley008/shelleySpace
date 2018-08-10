<template>
    <div class="containerWrap preventOverflowX">
      <v-nav :path="path" :title="$t('conferences.title')" :returnFlag="returnFlag"></v-nav>
      <div class="meet-head-wrapper" v-if="!empty">
        <div class="meet-head-nav">
            <router-link class="nav-item" to="/myroom">
                <i class="icon-prefix icon-nav-rank"></i>
                <span class="nav-label">{{ $t('conferences.myRoom') }}</span>
            </router-link>
            <a class="nav-item" @click="gotoConfSchedule">
                <i class="icon-prefix icon-nav-invitefriend"></i>
                <span class="nav-label">{{ $t('conferences.schedule') }}</span>
            </a>
        </div>
      </div>
      <div class="meet-marTop"  v-if="!empty">
          <div class="meet-body-wrapper">
            <v-content type="block-title">
              <span class="block-title-text">{{ $t('conferences.titConfList') }}</span>
            </v-content>
            <div class="meet-list">
              <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo" :pull-text="$t('conferences.pullTxt')" :drop-text="$t('conferences.dropTxt')"  :loading-text="$t('common.loadingTxt')" :show-init-tip="false">
                <div class="card-container"  ref="meetBodyWrapper"  @touchmove="bMove=true" >
                    <v-card-container v-for="(conf,index) in conferences" :key="index">
                      <card type="content" :key="conf.guid">
                        <list type="media">
                          <li class="item-content" @click="joinConfDetail(conf)">
                            <item type="inner">
                              <item type="title-row">
                                <div class="iconStatus">
                                    <div :class="extclass(conf.status)"></div>
                                </div>
                                <item type="title">{{conf.name}}</item>
                                <item type="time" v-if="conf.startTime > 0 && conf.duration > 0">
                                  {{ new Date(conf.startTime) | moment('HH:mm')}}-{{ new Date(conf.startTime + conf.duration) | moment('HH:mm') }}
                                </item>
                              </item>
                            </item>
                          </li>
                        </list>
                      </card>
                      <card type="footerInfo" :key="conf.id">
                        <list type="media" >
                          <li class="footerInfo-item" v-on:click="joinConfDetail(conf)">
                            <div class="item-id">
                                {{ $t('conferences.titConfId') }}:{{conf.numericId}}
                            </div>
                            <div class="item-user">
                                  <div v-for="(userId,index) in conf.userIds" :key="index" class="userImg">
                                    <div :key="userId">
                                      <span v-if="index<4" :key="index"><img v-bind:src="getImgURL(userId)"  :onerror="errorImg01" /></span>
                                      <span v-if="index==4 && (conf.userIds.length)==5" :key="index" class="lx-avatar lx-avatar-samll"><img v-bind:src="getImgURL(userId)"  :onerror="errorImg01" /></span>
                                      <span v-if="index==4 && (conf.userIds.length)>5" :key="index" class="lx-avatar lx-avatar-samll el-icon-plus-box">
                                        <i class="el-icon-plus">{{(conf.userIds.length)-1}}</i>
                                      </span>
                                    </div>
                                </div>
                              </div>
                          </li>
                        </list>
                      </card>
                    </v-card-container>
                  </div>
              </yd-pullrefresh>
            </div>
          </div> 
      </div>

      <div class="meet_menu" v-show="empty">
        <v-card-container class="meet_item_shadow">
          <card type="meet_item">
            <list type="media" >
              <li class="meet_item_line" v-on:click="routerTo('/myroom')" >
                <i class="icon-meet-my"></i>
                <item type="inner" >
                     <span class="meet_menu_t">{{ $t('conferences.myRoom') }}</span>
                     <span class="meet_menu_n">{{ $t('conferences.titRoomId') }} : {{userOwnRoomId?userOwnRoomId:$t('conferences.userOwnRoomId')}}</span>
                </item>
              </li>
            </list>
          </card>
        </v-card-container>
        <v-card-container class="meet_item_shadow">
          <card type="meet_item" >
            <list type="media" >
              <li class="meet_item_line" v-on:click="routerTo('/confSchedule?confid=0')">
                <i class="icon-meet-order"></i>
                <item type="inner" >
                     <span class="meet_menu_t">{{ $t('conferences.schedule') }}</span>
                     <span class="meet_menu_n">{{ $t('conferences.titScheduleText')}}</span>
                </item>
              </li>
            </list>
          </card>
        </v-card-container>
        <div class="wx_code x-size-foot-home">
           <span class="icon-noRoomBg"></span>
        </div>
      </div>

    </div>
</template>


<script>
import VNav from "../components/Nav";
import Bar from "../components/Bar";
import BarItem from "../components/BarItem";
import VCardContainer from "../components/Card";
import Btn from "../components/Button";
import Card from "../components/CardItem";
import VContent from "../components/Content";
import List from "../components/List";
import Item from "../components/ListItem";
import { getConferenceListRest } from "../api/conference";
import { loginByToken } from "../api/login";
import { fileServletHost } from "../api/config";
import { getUrlParamsObj, changeLang } from "../common/js/utils";
import {getMyRoom} from "../api/room";
import {setFootPosition,} from "../common/js/global.js"
import Vue from 'vue'
import {PullRefresh} from 'vue-ydui/dist/lib.rem/pullrefresh';
Vue.component(PullRefresh.name, PullRefresh);

export default {
  data() {
    return {
      banner: [],
      conferences: [],
      // title:'会捷通',
      path: "/confSchedule?confid=0",
      errorImg01: 'this.src="' + require("../assets/img/user.png") + '"',
      topStatus: "",
      list: ["a", "b"],
      bMove: false,
      room: {},
      returnFlag: false,
      userOwnRoomId:'',
      empty:true,
      isHasRoomId:false
    }
  },
  computed: {
    length() {
      return this.conferences.length;
    }
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if (Object.is(from.path, '/conferences')) {
        clearInterval(this.intervalid)
        changeLang(this.$i18n)
      }else if(Object.is(to.path, '/conferences')) {
        this.getMyRoomMsg()
        this.getTableData()
        this.autoRefresh()
      }
    }
  },
  mounted: function() {
    window.vue = this
    changeLang(this.$i18n)
    //iphone x footer position
    setFootPosition('.x-size-foot-home',120,'conference')

    let urlParamsObj = this.getParamsObj();
    if (urlParamsObj && urlParamsObj["token"]) {
      localStorage.setItem("token", urlParamsObj["token"]);
      this.initData();
    } else {
      this.getTableData();
    }
    this.getMyRoomMsg()
    this.autoRefresh()
  },
  methods: {
    gotoConfSchedule(){
       this.$router.push({
              name: 'confSchedule',
              query: {
                  confid:0
              },
              replace: true
         })
    },

    getParamsObj: function() {
      return getUrlParamsObj(window.location.href);
    },
    routerTo(path) {
      this.$router.push({ path: path, replace: true });
    },
    loadList() {
      this.initData();  
    },
    getMyRoomMsg() {
      let para = { token: localStorage.getItem("token") };
      getMyRoom(para).then(res => {
        if (res.data && res.data.numericId) {
           this.room = res.data
           this.userOwnRoomId = res.data.numericId
           this.isHasRoomId = true
        }else{
           this.userOwnRoomId = ''
           this.isHasRoomId = false
        }
      })
      .catch(()=>{
         this.isHasRoomId = false
      })
    },
    initData: function() {
      var _this = this;
      return new Promise(function(resolve, reject) {
        _this.loginByToken(resolve);
      })
        .then(function() {
          return new Promise(function(resolve, reject) {
            _this.getTableData(resolve);
          });
        })
        .then(function() {
          _this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        });
    },
    loginByToken(resolve) {
      let token = localStorage.getItem("token");
      if (!token) return;
      loginByToken(token).then(res => {
        localStorage.setItem('userName', res.data.name)
        localStorage.setItem("currentUser", JSON.stringify(res.data.profile))
        resolve()
      });
    },
    getTableData(resolve) {
      let currentDate = new Date();
      let start = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        0,
        0,
        0
      ).getTime();
      let end = start + 3600 * 1000 * 24 * 365;
      let para = {
        status: "",
        startTime: start,
        endTime: end,
        token: localStorage.getItem("token")
      };
      getConferenceListRest(para)
        .then(res => {
          if (res.data.length === 0) {
            this.empty = true;
          } else {
            this.empty = false;
            this.conferences = res.data;
            resolve();
          }
        })
        .catch(error => {});
    },
    refresh() {
      setTimeout(
        function() {
          this.getTableData();
        }.bind(this),
        1500
      );
    },
    autoRefresh() {
      this.intervalid = setInterval(
        function() {
          this.getTableData();
        }.bind(this),
        5000
      );
    },
    joinConfDetail(conf) {
      if (!this.bMove) {
        let path = "/confDetail";
        // if (Object.is(conf.status, 'ONGOING')) {
        //   path = '/confDetail'
        // }
        this.$router.push({
          path: path,
          query: { confid: conf.id },
          replace: true
        });
      } else {
        this.bMove = false;
      }
    },
    getImgURL(userId) {
      let imageUrl =
        window.location.protocol +
        "//" +
        fileServletHost +
        "/fileServlet?userToken=" +
        localStorage.getItem("token") +
        "&action=userAvatar&ownerId=" +
        userId;
      // console.log(imageUrl);
      return imageUrl;
    },
    //切换会议样式状态
    extclass(code) {
      switch (code) {
        case "ONGOING":
          return "icon-card-status-on";
        default:
          return "icon-card-status-off";
      }
    }
  },
  components: {
    Bar,
    BarItem,
    VCardContainer,
    Card,
    VContent,
    List,
    Item,
    Btn,
    VNav
  },
  beforeDestroy () {
    // console.log("get conferences timer is close");
    clearInterval(this.intervalid);
  }
};
</script>
