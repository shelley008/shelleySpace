<template>
  <div class="myroomWrappper preventOverflowXY" >
    <v-nav :path="path" :title="$t('myRoomVue.title')" :returnFlag="returnFlag"></v-nav>
    <v-content type="block" v-if="!empty">
        <div class="center_code">
          <div class="mymeet_number">
            <h4>{{ $t('myRoomVue.roomNumber') }}</h4>
            <p>{{room.numericId}}</p>
          </div>
          <div class="item-inner">
            <div class="btn_blue_default" v-on:click="joinConf(room)">{{ $t('myRoomVue.join') }}</div>
            <div class="changePassword" @click="showPopup = true">{{ $t('myRoomVue.updatePassword') }}</div>
          </div>
          <div class="item-barContainer">
            <div class="item-bar-line">
                <div class="bar-label">{{ $t('myRoomVue.closeCamera') }}</div>
                <div class="bar-switch"><yd-switch v-model="cameraFlag"></yd-switch></div>
            </div>
            <div class="item-bar-line">
                <div class="bar-label">{{ $t('myRoomVue.closeMicrophone') }}</div>
                <div class="bar-switch"><yd-switch v-model="microphoneFlag"></yd-switch></div>
            </div>
            </div>
          <share-template :isRoom="true" :numericid='numericId' :confNameInfo='confNameInfo'
            v-if="numericId" v-on:listenChildEvent="showMsgFromChild" ></share-template>
        </div>
    </v-content>
    <yd-popup v-model="showPopup" position="center" width="90%" :close-on-masker="false">
      <div class="popPassWordWrap">
            <div class="pop-head">
              <p>{{ $t('myRoomVue.updateRoomPassword') }}</p>
            </div>
            <yd-cell-group class="pop-body">
              <yd-cell-item class="pop-input">
                <span slot="left" class="input-base">{{ $t('myRoomVue.password') }}：</span>
                <yd-input  class="input-base" slot="right" v-model="room.password" regex="^\d{1,12}$" :placeholder="$t('common.tips.pswTip')" :show-success-icon="false" :show-error-icon="true" ></yd-input>
              </yd-cell-item>
            </yd-cell-group>

          <div class="pop-foot">
            <yd-button class="pop-btn-default pop-btn-blue" @click.native="updateRoomPassword()" type="primary">{{ $t('common.SaveBtn') }}</yd-button>
            <yd-button class="pop-btn-default pop-btn-gray"  @click.native="cancel()" type="hollow">{{ $t('common.Cancel') }}</yd-button>
          </div>
      </div>
    </yd-popup>

    <!-- 没会议 -->
    <v-content type="noInviteWrappper" v-if="empty">
        <span class="icon-pleaseOpen"></span> 
        <h3>{{ $t('myRoomVue.noRoomMessage')}}</h3>
   </v-content>

  </div>
</template>

<script>
import VNav from "../components/Nav";
import VContent from "../components/Content";
import VList from "../components/List";
import VCardContainer from "../components/Card";
import Card from "../components/CardItem";
import shareTemplate from "../components/share";
import { getRoomById, getMyRoom, updateMyRoomPassword } from "../api/room";
import Vue from 'vue'
import {Switch} from 'vue-ydui/dist/lib.rem/switch'
import {Popup} from 'vue-ydui/dist/lib.rem/popup'
Vue.component(Popup.name, Popup);
import {setFromatParam,showMsg} from "../common/js/global.js";

Vue.component(Switch.name, Switch);

export default {
  data() {
    return {
      // title: "我的会议室",
      path: "/conferences",
      copyurl: "",
      copyword: "",
      empty: true,
      findRoom: false,
      room: {},
      conf: {},
      numericId: 0,
      dialogFormVisible: false,
      returnFlag: true,
      cameraFlag: false,
      microphoneFlag: false,
      showPopup: false,
      confNameInfo:1
    };
  },
  components: {
    VNav,
    VContent,
    VList,
    VCardContainer,
    Card,
    shareTemplate
  },
  mounted() {
    this.getMyRoomMsg();
  },

  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if (Object.is(from.path, '/conferences')) {
        this.getMyRoomMsg();
      }else if(Object.is(to.path, '/myroom')) {
        this.getMyRoomMsg();
      }
    }
  },
  
  methods: {
    //加入会议
    joinConf(room) {
      let param = {
        name: this.room.name,
        numericId: room.numericId,
        password: room.password,
        cameraStatus: this.cameraFlag,
        microphoneStatus: this.microphoneFlag
      }
      setFromatParam('joinConf',param)
    },
    showMsgFromChild: function(data) {
      this.findRoom = data;
    },
    getRoomMsgById: function() {
      let roomid = this.$route.query.roomid;
      if (!roomid || roomid === 0) {
        this.empty = true;
        return;
      }
      let para = {
        token: localStorage.getItem("token"),
        id: roomid
      };
      getRoomById(para).then(res => {
        if (res.data) {
          this.room = res.data;
          this.numericId = this.room.numericId;
          this.empty = false;
        } else {
          this.empty = true;
        }
      })
      .catch(()=>{
        this.empty = true;
      })
      ;
    },
    getMyRoomMsg: function() {
      let para = { token: localStorage.getItem("token") };
      getMyRoom(para).then(res => {
        if (res.data && res.data.numericId) {
          this.room = res.data;
          this.numericId = this.room.numericId
          this.empty = false;
        } else {
          this.empty = true;
        }
      })
      .catch(()=>{
        this.empty = true;
      })
    },
    cancel() {
      this.getMyRoomMsg()
      this.showPopup = false
    },
    updateRoomPassword: function() {
      let token = localStorage.getItem("token");
      let para = { password: this.room.password };
     
      if(this.room.password) {
            let regExPassword = /\D+/g
            if(regExPassword.test(this.room.password) || this.room.password.length > 12){
                showMsg(this.$t('common.msgs.pswErrorMsg'))
                return 
            }
            updateMyRoomPassword(token, para).then(res => {
              this.showPopup = false
              if (res.data) {
                this.dialogFormVisible = false;
              }
            })
           
        }
    }
  }
};
</script>
