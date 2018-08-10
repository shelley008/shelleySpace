<template>
<div class="content invite preventOverflowX" :class="{enLabelWidth:!isLangCN}">
  <v-nav :path="path" :title="title" :returnFlag="returnFlag"></v-nav>
  <div class="confSchedule_main">
    <div class="wrapper-line conf-top-bot">
        <yd-cell-group class="conf-bot-top">
            <yd-cell-item>
                <span slot="left">{{ $t('common.conferences.name') }}</span>
                <yd-input slot="right" v-model="conf.name" max="40" required :placeholder="$t('confSchedule.nameTip')" :show-success-icon="false"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
    </div>
    <div class="wrapper-line conf-box">
        <yd-cell-group class="conf-bot-mid">
            <yd-cell-item>
                <span slot="left">{{ $t('common.conferences.startTime') }}</span>
                <yd-datetime class="start-time" :class="{'colorc1':conf_now}" :readonly="conf_now" type="datetime" v-model="conf.startTime" slot="right" :init-emit="false" :start-date="startDate" :end-date="endDate"></yd-datetime>
                <yd-checkbox v-model="conf_now" slot="right" color="#4381ff">{{ $t('confSchedule.now') }}</yd-checkbox>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" :class="{letter2em:isLangCN}">{{ $t('common.conferences.duration') }}</span>
                <yd-datetime ref="conf_dur" type="time" v-model="conf.duration" slot="right" :init-emit="false"></yd-datetime>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">{{ $t('common.conferences.password') }}</span>
                <div slot="right" class="passwordWrap">
                      <yd-input slot="right" v-model="conf.password" regex="^\d{1,12}$" :show-success-icon="false"  :placeholder="$t('common.tips.pswTip')"></yd-input>
                </div>
            </yd-cell-item>
            <yd-cell-item class="conf_remark">
                <span slot="left">{{$t('common.conferences.remark')}}</span>
                <div slot="right" class="conf_remark_input">
                   <textarea class="descriptionArea descriptionWrapHeight" ref="descriptionArea" rows="1" :maxlength="descMaxlegth" :placeholder="$t('confSchedule.remarkTip')" v-model="conf.description"></textarea>
                   <div class="description-limitLen">{{conf.description.length}}/{{descMaxlegth}}</div>
                </div>
            </yd-cell-item>
        </yd-cell-group>
    </div>

    <div class="wrapper-line conf-top-bot">
         <div class="userHeadWrapper">
            <div class="left-add-box">
                <span @click="addUser('expand')" class="btn-addbar"></span>
            </div>
            <div v-for="(user,index) in userList" class="userList-body" :key="index">
                <span class="user-item-img">
                  <img :src="getImgURL(user)" class="img-head-default" :onerror="errorImg01" />
                </span>
                <div class="user-item-title">
                 <p class="user-item-name" v-if="user.name.length>5">{{user.name.substring(0,5)}}...</p>
                 <p class="user-item-name" v-if="user.name.length<=5">{{user.name}}</p>
                 </div>
                <i class="icon-del" @click="delUser(index)">-</i>
            </div>
         </div>
    </div>
   </div>

   <div class="fixBottom x-size-foot">
       <div class="btn_blue_straight" v-on:click="scheduleConf()">{{ $t('common.SaveBtn') }}</div>
    </div>

  </div>
</template>

<script>
    import Vue from 'vue';
    import 'vue-ydui/dist/ydui.base.css';
    import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
    import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell';
    import {Input} from 'vue-ydui/dist/lib.rem/input';
    import {TextArea} from 'vue-ydui/dist/lib.rem/textarea';
    import {Radio, RadioGroup} from 'vue-ydui/dist/lib.rem/radio';
    import {Confirm,Toast,Loading} from 'vue-ydui/dist/lib.rem/dialog';
    import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.rem/checkbox';

    Vue.component(DateTime.name, DateTime);
    Vue.component(CellGroup.name, CellGroup);
    Vue.component(CellItem.name, CellItem);
    Vue.component(Input.name, Input);
    Vue.component(TextArea.name, TextArea);
    Vue.component(Radio.name, Radio);
    Vue.component(RadioGroup.name, RadioGroup);
    Vue.component(CheckBox.name, CheckBox);
    Vue.component(CheckBoxGroup.name, CheckBoxGroup);

    import VNav from "../components/Nav";
    import VContent from "../components/Content";
    import VList from "../components/List";
    import {getConferenceRest,saveConference,updateConference} from "../api/conference"
    import {fileServletHost} from "../api/config"
    //moment
    import moment from 'moment'
    import {setFootPosition,formatDuration2Num,makeExpandingArea} from "../common/js/global.js";

    Vue.prototype.$dialog = {
        confirm: Confirm,
        toast: Toast,
        loading: Loading
    }

    export default {
        data() {
            return {
              title: this.$t('confSchedule.title'),
              confId: 0,
              path: "/conferences",
              conf: {name:'', startTime: '', duration:'', password: '', description: '', users: []},
              popupUserLimit: false,
              returnFlag: true,
              errorImg01:'this.src="' + require('../assets/img/user.png') + '"',
              conf_now: false,
              startDate:'',
              endDate:'',
              descMaxlegth: 128,
              areaH:0
            };
        },
        created() {
          this.initDate()
        },
        mounted() {
            window.vue = this
            this.popupUserLimit = false
            //iphone x footer position
            setFootPosition('.x-size-foot',20,'subpage')
            this.$forceUpdate()
        },
        computed: {
            userList:function(){
                return this.$store.state.checkList
            },
            isLangCN() {
                return this.$i18n.locale == 'cn'
            }
        },
        watch: {
            $route(to, from) {
                // 对路由变化作出响应...
                if ((Object.is(from.path, "/conferences") && Object.is(to.path, "/confSchedule")) || (Object.is(from.path, "/confDetail") && Object.is(to.path, "/confSchedule")) ) {
                   this.initDate()
                   setFootPosition('.x-size-foot',20,'subpage')
                }
            },
            conf_now(){
                this.initStartTime()
            }
        },
        methods: {
            initStartTime () {
                if(this.conf_now){
                    this.conf.startTime = moment(new Date()).format('YYYY-MM-DD HH:mm')
                }else{
                    let sDate, date = new Date()
                    let m = date.getMinutes();
                    (m >= 0 && m < 30)
                            ? sDate = new Date(date.getTime() - m * 60 * 1000 + 60 * 60 * 1000)
                            : sDate = new Date(date.getTime() - m * 60 * 1000 + 1.5 * 60 * 60 * 1000)
                    this.conf.startTime = moment(sDate).format('YYYY-MM-DD HH:mm')
                }
            },
            formatDate(str){
                if(typeof str != 'string' || str.indexOf(':') == -1) return
                return (parseInt(str.split(':')[0]) * 60 * 60 * 1000) + parseInt(str.split(':')[1]) * 60 * 1000
            },
            //会议成员删除
            delUser(index) {
               if (this.userList.length > 1) {
                    let temp_arr = this.userList
                    temp_arr.splice(index, 1);
                    this.$store.dispatch('setCheckList',temp_arr);
               } else {
                   this.showErrorMessage(this.$t('confSchedule.userErrorMsg'))
               }
            },
            //会议成员添加与删除
            addUser() {
                this.$store.dispatch('setCheckList',this.userList);
                let confid = this.$route.query.confid
                this.$router.push({path: '/users',query: { confid: confid }})
            },
            initDate() {
                let _this = this;
                let confid = _this.$route.query.confid
                let currentUser = JSON.parse(localStorage.getItem('currentUser'))
                _this.conf = {name:currentUser.displayName + _this.$t('confSchedule.sMeeting'), startTime: '', duration:'01:00', password: '', description: '', users: []}
                _this.conf_now = false
                _this.startDate = moment(new Date()).format('YYYY-MM-DD HH:mm')
                _this.endDate =  moment(new Date()).add('year',1).format('YYYY-MM-DD HH:mm')

                if(!confid || Object.is(confid, '0')){
                    _this.confId = 0
                    _this.title = _this.$t('confSchedule.title')
                   _this.initStartTime()
                   _this.$store.dispatch('setCheckList',undefined);
                   _this.$nextTick(function(){
                         makeExpandingArea(24,'.descriptionWrapHeight')
                   })
                }else{
                    _this.confId = confid
                    _this.title = _this.$t('confSchedule.editTitle')
                    new Promise(function(resolve, reject) {
                        _this.getconfRest(resolve);
                    })
                    .then(function(temp) {
                        _this.conf.name = temp.name
                        _this.conf.startTime = moment(temp.startTime).format('YYYY-MM-DD HH:mm')
                        _this.conf.duration =  formatDuration2Num(temp.duration)
                        _this.conf.password = temp.password
                        _this.conf.description = temp.description

                       let temp_arr = temp.users.map(function(item){return {id:item.id,name:item.displayName}})
                        _this.$store.dispatch('setCheckList',temp_arr);
                        _this.$nextTick(function(){
                            makeExpandingArea(this.$store.state.confDescription,'.descriptionWrapHeight')
                        })
                    })
                }
            },
            getconfRest(resolve) {
                let _this = this
                let confid = this.$route.query.confid

                if (!confid || Object.is(confid, '0')) return
                let para = {
                    id: confid,
                    token: localStorage.getItem('token')
                };
                getConferenceRest(para)
                .then(res => {
                    resolve(res.data)
                })
                .catch(function(error) {
                    console.log(error)
                })
            },
            gotoControlConf() {
                var _this = this
                _this.$router.push({
                    path: '/confControl',
                    query: {
                        numericId: this.conf.numericId,
                        token: localStorage.getItem('token'),
                        userId: this.userId,
                        from: 'message'
                    }
                });
            },
            showErrorMessage(msg) {
                this.$dialog.toast({
                    mes: msg,
                    timeout: 1500
                });
            },
            scheduleConf() {
                //设置默认值
                var _this = this
                let paras = {
                    duration: 3600000,
                    endpointIds: [],
                    layout: '0X0',
                    maxBandwidth: '1920',
                    maxPartyCount:10,
                    name: "",
                    password: "",
                    profile: "HD",
                    recordingEnabled: false,
                    redialingEnabled: false,
                    startTime: 1531909800000,
                    userIds: [],
                    description:'',
                    subtitle: {
                        backgroundColor: "#3300CC",
                        displayRepetitions: 20,
                        displaySpeed: 0,
                        fontSize: 24,
                        foregroundColor: "#FFFF00",
                        transparency: "50",
                        verticalBorder: "50"
                    }
                }
                let duration = _this.conf.duration && _this.formatDate(_this.conf.duration);
                if(Object.is(_this.conf.name, '')) {
                    _this.showErrorMessage(_this.$t('confSchedule.nameErrorMsg'))
                    return
                }
                if(duration < 15 * 60 * 1000) {
                    _this.showErrorMessage(_this.$t('confSchedule.durErrorMsg'))
                    return
                }
                if(_this.conf.password) {
                    let regExPassword =  /\D+/g
                    if(regExPassword.test(_this.conf.password) || _this.conf.password.length > 12){
                           _this.showErrorMessage(_this.$t('common.msgs.pswErrorMsg'))
                           return
                    }
                }
                //传入页面操作数据
                paras.name = _this.conf.name || ''
                paras.startTime =  new Date(this.conf.startTime).getTime() || 0
                paras.duration =  _this.formatDate(_this.conf.duration) || 0
                paras.password  = _this.conf.password || ''
                paras.description =  _this.conf.description || ''
                paras.userIds = _this.userList?_this.userList.map(item=>item.id) : []

                let confid = _this.$route.query.confid
                localStorage.setItem('confid',confid)
                if(!confid || Object.is(confid, '0')){ //新增
                    _this.$dialog.loading.open(_this.$t('confSchedule.loadingText'))
                    saveConference(paras).then(res => {
                        _this.$dialog.loading.close();
                        _this.$store.dispatch('setCheckList',undefined);
                        _this.$router.push({
                                name: 'confScheduleSuccess',
                                params: {
                                    conf:res.data
                                },
                                replace: true
                            })
                    })
                    .catch(function(error) {
                        _this.$dialog.loading.close()
                    })
                }else{ //编辑
                    _this.$dialog.loading.open(_this.$t('confSchedule.loadingText'))
                    paras.useRandomNumericId = false
                    updateConference(paras).then(res => {
                        _this.$dialog.loading.close();
                        _this.$store.dispatch('setCheckList',undefined);
                        _this.$router.push(
                            {path:'/conferences'}
                        )
                    })
                    .catch(function(error) {
                        _this.$dialog.loading.close()
                        _this.showErrorMessage(error.response.data.errorInfo)
                    })
                }
            },
          getImgURL(user){
            return window.location.protocol + "//" + fileServletHost + "/fileServlet?userToken=" + localStorage.getItem("token") + "&action=userAvatar&ownerId=" + user.id;
          }
        },
        components: {
            VNav,
            VContent,
            VList
        }
    };
</script>

