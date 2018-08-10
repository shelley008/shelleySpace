<template>
 <div class="share-content preventOverflowXY">
   <div class="share-title"><span>{{ $t('shareVue.title') }}</span></div>

    <!-- <mt-popup v-model="popupVisible" position="top">{{copyMsg}}</mt-popup> -->
    <ul class="icon-list">
        <li>
            <a class="btn" :data-clipboard-text="copyword" @click="shareWechat()">
                <span class="icon-img icon-share"><span class="icon-img-share"></span></span>
                <span class="icon-name">{{ $t('shareVue.weChatMobileSharing') }}</span>
            </a>
        </li>
        <li>
            <a class="btn" :data-clipboard-text="copyurl" @click="shareEmail()">
                <span class="icon-img icon-email"><span class="icon-img-blue"></span></span>
                <span class="icon-name">{{ $t('shareVue.emailSharing') }}</span>
            </a>
        </li>
        <li>
            <a class="btn" :data-clipboard-text="copyurl" @click="clipboardUrl()">
                <span class="icon-img icon-url"><span class="icon-img-green"></span></span>
                <span class="icon-name">{{ $t('shareVue.copyMeetingLink') }}</span>
            </a>
        </li>
        <li>
            <a class="btn" :data-clipboard-text="copyword" @click="clipboardWord()">
                <span class="icon-img icon-info"><span class="icon-img-yellow"></span></span>
                <span class="icon-name">{{ $t('shareVue.copyMeetingMessage') }}</span>
            </a>
        </li>
    </ul>
</div>
</template>
<script>
import {hostUrl} from '../api/config'
import {conferenceInfo} from '../api/conference'
import {getRoomInfo} from '../api/room'
import Clipboard from 'clipboard'
import {setFromatParam,showMsg} from "../common/js/global.js"

export default {
  data () {
    return {
      labelwidth: 80,
      copyurl: '',
      copyword: '',
      conf: {},
      popupVisible: false,
      copyMsg: ''
    }
  },
  props: ['isRoom','numericid', 'confid','confNameInfo'],
  mounted () {
    this.initPage()
  },
  watch:{

  },
  methods: {
    initPage: function () {
      if(hostUrl.indexOf('http') > -1) {
        this.serverUrl = hostUrl;
      }else {
        this.serverUrl = window.location.protocol+"//"+ hostUrl;
      }
      let numericId = this.numericid || this.$route.query.numericid
      let confId = this.confid
      if (confId) {
        this.confId = confId
        this.getconfRest()
      }

      if(this.isRoom) {
        if (this.numericid) {
          this.getRoomInfoRest()
        }
      }else {
        if (numericId) {
          this.numericId = numericId
          this.getconfRest()
        }
      }
    },
    getRoomInfoRest () {
      let para = {}
      console.log('getRoomInfoRest form numericid==', this.numericid)
      if (!this.numericid) {
        return
      }
      if (this.numericid) {
        para.numericId = this.numericid
      }
      getRoomInfo(para).then((res) => {
        console.log(res.data)
        this.room = res.data
        if (this.room.domain) {
          this.serverUrl = window.location.protocol + '//' + this.room.domain + '/webapp'
        }
        this.copyurl = this.serverUrl + '/#/shareroom?numericId=' + this.numericid
        this.$emit('listenChildEvent', true)
        this.copyRoomMessage()
      }).catch(function (error) {
        console.log(error)
      })
    },
    getconfRest () {
      let para = {}
      if (this.confId) {
        para.confId = this.confId
      }
      if (this.numericId) {
        para.numericId = this.numericId
      }

      conferenceInfo(para).then((res) => {
        console.log(res.data)
        this.conf = res.data
        if (this.conf.domain) {
          this.serverUrl = window.location.protocol + '//' + this.conf.domain + '/webapp'
        }
        if (this.confId) {
          this.copyurl = this.serverUrl + '/#/shareconf?confId=' + this.confId
        }
        if (this.numericId) {
          this.copyurl = this.serverUrl + '/#/shareconf?numericId=' + this.numericId
        }
        this.copyMessage()
      }).catch(function (error) {
        console.log(error)
      })
    },

    copyRoomMessage () {
      this.copyword =  this.$t('shareVue.cloudRoomName') +'：' + this.room.name
      this.copyword += '\n'+ this.$t('shareVue.cloudRoomPassword') +': ' + (this.room.password && this.room.password !== '' ? this.room.password : this.$t('common.nothing'))
      if (this.room.softEndpointJoinUrl && this.room.softEndpointJoinUrl !== '') {
        this.copyword += '\n\n'+ this.$t('shareVue.HexMeetSoftEndpointJoinUrl')+'：' + this.room.softEndpointJoinUrl
      }
      if (this.room.hardEndpointJoinUrl && this.room.hardEndpointJoinUr != '') {
        this.copyword += '\n'+ this.$t('shareVue.HexMeetHardEndpointJoinUrl')+'：'
        this.copyword += this.$t('shareVue.InputViaTheRemote') + ' ' + this.room.hardEndpointJoinUrl
      }
      if (this.room.h323EndpointJoinUrl && this.room.h323EndpointJoinUrl !== '') {
        this.copyword += '\n'+ this.$t('shareVue.h323EndpointJoinUrl')+'：'
        this.copyword += this.$t('shareVue.InputViaTheRemote') + ' '+this.room.h323EndpointJoinUrl
      }
      if (this.room.sipEndpointJoinUrl && this.room.sipEndpointJoinUrl !== '') {
        this.copyword += '\n'+ this.$t('shareVue.sipEndpointJoinUrl') +'：'+ this.$t('shareVue.InputViaTheRemote')  +' ' + this.room.sipEndpointJoinUrl
      }
    },

    copyMessage () {
      // let statrDate = new Date(this.conf.startTime)
      // let endDate = new Date(this.conf.startTime + this.conf.duration)
      this.copyword = this.$t('shareVue.confName')+'：' + this.conf.confName
      this.copyword += '\n'+ this.$t('shareVue.confTime')+'：' + (this.conf.confTime && this.conf.confTime !== '' ? this.conf.confTime : this.$t('common.nothing'))
      this.copyword += '\n'+ this.$t('shareVue.confNumber')+'：' + this.conf.numericId
      this.copyword += '\n'+ this.$t('shareVue.confPassword')+': ' + (this.conf.confPassword && this.conf.confPassword !== '' ? this.conf.confPassword : this.$t('common.nothing'))
      this.copyword += '\n'+ this.$t('shareVue.confRemark')+'：' + (this.conf.remark && this.conf.remark !== '' ? this.conf.remark : this.$t('common.nothing'))
      if (this.conf.softEndpointJoinUrl && this.conf.softEndpointJoinUrl !== '') {
        this.copyword += '\n\n'+ this.$t('shareVue.HexMeetSoftEndpointJoinUrl')+'：' + this.conf.softEndpointJoinUrl
      }
      if (Object.is(this.conf.hardEndpointJoinUrl, '')) {
        this.copyword += '\n'+ this.$t('shareVue.HexMeetHardEndpointJoinUrl') +'：'
        this.copyword += this.$t('shareVue.InputViaTheRemote') + ' ' + this.conf.hardEndpointJoinUrl
      }
      if (this.conf.h323EndpointJoinUrl && this.conf.h323EndpointJoinUrl !== '') {
        this.copyword += '\n'+ this.$t('shareVue.h323EndpointJoinUrl') +'：'
        this.copyword += this.$t('shareVue.InputViaTheRemote') + ' ' + this.conf.h323EndpointJoinUrl
      }
      if (this.conf.sipEndpointJoinUrl && this.conf.sipEndpointJoinUrl !== '') {
        this.copyword += '\n'+ this.$t('shareVue.sipEndpointJoinUrl') +'：'+ this.$t('shareVue.InputViaTheRemote')  + ' ' + this.conf.sipEndpointJoinUrl
      }
    },

    // 微信分享
    shareWechat(){
      let obj = !!this.isRoom ? this.room : this.conf
      obj.url = this.copyurl
      setFromatParam('shareWechat', obj)
    },
    // 邮件分享
    shareEmail:function(){
      let copyword = this.copyword.replace(/\n/g,'</br>')
      copyword = copyword.replace(/\?/g,'%3F')
      copyword = copyword.replace(/\=/g,'%3')
      let subject = this.conf.confName || this.room.name
      let mailtoConfHref = "mailto:?subject=" + subject + "&body=" + copyword
      setFromatParam('shareEmail', mailtoConfHref)
    },
    clipboardUrl: function () {
      this.clipboardFun(this.$t('shareVue.copyMeetingLinkSuccessInfo'))
    },
    clipboardWord: function () {
      this.clipboardFun(this.$t('shareVue.copyMeetingMessageSuccessInfo'))
    },
    clipboardEmail: function () {
      this.clipboardFun('跳转到邮箱!')
    },
    clipboardFun: function (message) {
      let _this = this
      const clipboard = new Clipboard('.btn')
      clipboard.on('success', e => {
        // console.log('复制成功')
        //调用共用弹层模块
        showMsg(message)
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        // console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    }
  }
}
</script>
<style scoped lang="scss">

</style>

