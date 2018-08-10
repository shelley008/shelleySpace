<template>
  <div class="contact-wrap">
    <v-nav :path="path" :title="$t('usersVue.title')" :returnFlag="returnFlag"></v-nav>
    <yd-search required :show-clear-icon="true"  class="contact-search" :placeholder="$t('usersVue.nameTip')"  v-model="searchval" :on-submit="searchUser"></yd-search>
    <div class="contact-body">
        <div class="contact-navbar">
          <yd-slider index="0" :loop="false" :show-pagination="false">
              <yd-slider-item v-for="(nav,index) in navList" :key="index">
                  <span @click="changeDept(nav.id,nav.name,index,0)" :class="{color_blue:index == 0}">{{ nav.name }}</span>
              </yd-slider-item>
          </yd-slider>
        </div>
        <div class="contact-body-box" :style="{height:checkListHeight+'px'}" >
            <!-- <yd-checklist v-model="dcheckList" ref="checklistDemo1" color="#4381ff" :callback="selectDept" class="contact-body-user" :label="false">
              <yd-checklist-item v-for="(dept,index) in deptList" :key="index" :val="dept.id" :class="{'dept-item': dept}">
                    <div class="user-outter" @click="changeDept(dept.id,dept.shortName,index,1)">
                        <div class="user-name" v-if="dept.shortName.length > 10">{{dept.shortName.substring(0,10)}}...({{dept.userList.length}})</div>
                        <div class="user-name" v-else>{{dept.shortName}}({{dept.userList.length}})</div>
                        <span class="icon-right"></span>
                    </div>
              </yd-checklist-item>
            </yd-checklist> -->
            <yd-cell-group v-if="isShowList" color="#4381ff"  class="contact-body-dept">
              <yd-cell-item v-for="(dept,index) in deptList" :key="index" :val="dept.id" class="dept-item"  @click.native="changeDept(dept.id,dept.shortName,index,1)">
                <div slot="left" class="user-outter" >
                    <div class="user-name" v-if="dept.shortName.length > 10">{{dept.shortName.substring(0,10)}}...({{dept.userList.length}})</div>
                    <div class="user-name" v-else>{{dept.shortName}}({{dept.userList.length}})</div>
                </div>
                <span slot="right" class="icon-right"></span>
              </yd-cell-item>
            </yd-cell-group>
            <yd-checklist v-if="isShowList" v-model="ucheckList" ref="userchecklist" color="#4381ff" :callback="selectUser" >
              <yd-checklist-item v-for="(user,index) in userList" :key="index" :val="user.id" >
                    <div class="user-outter">
                        <div class="user-head">
                            <img :src="getImgURL(user)" :onerror="errorImg01" class="demo-checklist-img">
                        </div>
                        <div class="user-name" v-if="user && user.displayName && user.displayName.length > 15">{{user.displayName.substring(0,15)}}...</div>
                        <div class="user-name" v-else>{{user.displayName}}</div>
                    </div>
              </yd-checklist-item>
            </yd-checklist>
            <div class="tips" v-if="!isShowList && !isShowRefreshBtn && !noSearchResult">
                <span>{{$t('usersVue.noUserMsg')}}</span>
            </div>
            <div class="no-network" v-if="isShowRefreshBtn">
                <img src="../assets/img/no_network.png" alt="">
                <span>{{$t('usersVue.nonetWork')}}</span>
                <button class="refresh-btn" @click="getData()">{{$t('usersVue.reloadBtn')}}</button> 
            </div>
            <div class="tips" v-if="noSearchResult">
              <span>{{$t('usersVue.noResult')}}</span>
            </div>
        </div>
    </div>

    <div class="contact-footer" v-if="!isShowRefreshBtn">
        <yd-checkbox v-model="isCheckAll" shape="circle" :change="checkAll" color="#4381FF">{{$t('usersVue.checkAll')}}</yd-checkbox>
        <div class="btn-confirm" @click="submitHandler()">
            <span>{{$t('usersVue.confirm')}}</span><span>({{selectedItemCount}})</span>
        </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue';
  import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
  import {CheckList, CheckListItem} from 'vue-ydui/dist/lib.rem/checklist';
  import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button';
  import {Search} from 'vue-ydui/dist/lib.rem/search';
  import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.rem/checkbox';
  import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell';
  import VNav from '../components/Nav'
  import {getUserListRest, getDeptListRest} from '../api/users'
  import {fileServletHost} from "../api/config"

  import {nameTransfer} from '../assets/js/pysort'
  import {UsersClass} from '../assets/js/users'

  Vue.component(Slider.name, Slider);
  Vue.component(SliderItem.name, SliderItem);
  Vue.component(CellGroup.name, CellGroup);
  Vue.component(CellItem.name, CellItem);
  Vue.component(CheckBox.name, CheckBox);
  Vue.component(CheckBoxGroup.name, CheckBoxGroup);
  Vue.component(Search.name, Search);
  Vue.component(CheckList.name, CheckList);
  Vue.component(CheckListItem.name, CheckListItem);
  Vue.component(Button.name, Button);
  Vue.component(ButtonGroup.name, ButtonGroup);
  export default {
    data() {
      return {
        title: '邀请',
        path: '/confSchedule',
        returnFlag: 'true',
        searchval:'',
        navList:[],
        isShowList:false,
        isShowRefreshBtn:false,
        noSearchResult:false,
        //展示数据
        userList:[],
        deptList:[],

        //选择数据
        dcheckList: [],
        ucheckList: [],

        isCheckAll: false,
        selectedItemCount: 0,
        errorImg01:'this.src="' + require('../assets/img/user.png') + '"',
        checkListHeight:''
      }
    },
    created: function(){
      this.initNav()
      this.getData()
      this.currentDeptId = 0
    },
    mounted() {
      this.checkListHeight = document.body.clientHeight - (1.33333 + 1.17333 + 1.06667 + 1.30667 + 0.26667) * 75 / 2
    },
    watch: {
      $route(to, from) { 
        // 对路由变化作出响应...
        if (Object.is(to.path, "/users")) {
          this.getData()
          this.initNav()
        }
      },
      searchval(val){
        if(val == ''){
          this.initUserAndDeptList(this.currentDeptId)
          this.noSearchResult = false
        }
      }
    },
    computed: {
    },
    methods: {
      initNav() { // 初始化导航
        this.navList = [{id:0,name:this.$t('usersVue.contacts')}]
      },
      resetData () { // 重置数据
        this.isCheckAll = false
        this.searchval = ''
      },
      getDepts () { // 获取部门数据
        let params = {}
        return getDeptListRest(params).then(res => {
          if (res.data.length === 0) {

          } else {
            this.depts = res.data.sort(function(d1, d2){
              return  d1.shortName.toUpperCase().charCodeAt(0) - d2.shortName.toUpperCase().charCodeAt(0)
            })
          }
        })
        .catch(error => {});
      },
      getUsers () { // 获取用户数据
        let params = {}
        return getUserListRest(params).then(res => {
          if (res.data.length === 0) {
          
          } else {
            this.users = res.data
          }
        })
        .catch(error => {});
      },
      getData() { // 获取接口数据后调用初始化页面函数
        let _this = this
        let checkListIds ;
        if(_this.$store.state.checkList){
          checkListIds = _this.$store.state.checkList.map(function(item){ return item.id})
        }
        Promise.all([this.getDepts(), this.getUsers()])
        .then(function() {  
            _this.UsersClass = new UsersClass(_this.depts, _this.users, checkListIds)
            _this.initUserAndDeptList(0)
        })
        .catch(function(){
          //请求失败的提示 UI
          _this.isShowList = false
          _this.isShowRefreshBtn = true
        })
      },
      initUserAndDeptList(id){ // 初始化页面
        let rootTree = this.UsersClass.getAllChilrenByDeptId(id)
        this.userList = nameTransfer(rootTree.userList)
        this.deptList = rootTree.deptList
        if(this.users.length == 0 || this.depts.length == 0){
          this.isShowList = false
          this.isShowRefreshBtn = false
        }else if(this.userList.length == 0 && this.deptList.length == 0){
          this.isShowList = false
          this.isShowRefreshBtn = false
        }else{
          this.isShowList = true
          this.isShowRefreshBtn = false
        }
        this.ucheckList = this.UsersClass.getCurrentDeptSelectedUsers(id);
      },
      changeDept (id,name,index,type) { // 切换部门
        this.currentDeptId = id
        this.initUserAndDeptList(id)
        let tmpNavList = Object.assign([],this.navList)
        if(type == 0){ // 从内到外
          if(index == tmpNavList.length-1){
            return 
          }
          tmpNavList.splice(index+1,tmpNavList.length - index - 1)
          this.navList = tmpNavList
        }else if(type == 1){ //从外到内
          tmpNavList.push({id:id,name:name})
          this.navList = tmpNavList
        }
        this.isSelectedAllcheck(id)
      },
      isSelectedAllcheck(deptId) { // 判断是否全选
        let hasSelectedcount = this.UsersClass.getCurrentDeptSelectedUsers(deptId).length
        this.isCheckAll = hasSelectedcount == 0 ? false : this.userList.length == hasSelectedcount
      },
      searchUser (value){ //搜索用户
        if (!value) return ;
        this.userList =  this.users.filter(user => new RegExp(value, 'i').test(user.displayName))
        this.deptList = []
        this.noSearchResult = this.userList.length == 0 ? true : false
      },
      submitHandler () { //点击确定按钮事件
        let selectedCommonUsers = this.UsersClass.getAllSelectedUsers()
        this.$store.dispatch('setCheckList',selectedCommonUsers);
        let confid = this.$route.query.confid
        this.$router.push({
          path: '/confSchedule',
          query: { confid: confid },
          replace: true
        })
      },
      // selectDept (values, isCheckAll) { // 选择部门
      //   console.log('d',values, isCheckAll)
      //   let selectedUsers = this.UsersClass.getChildrenUsersByDeptId(this.currentDeptId)
      //   this.isSelectedAllcheck(this.currentDeptId)
      // },
      selectUser (values, isCheckAll) { // 选择用户
        let selectedUsers = this.UsersClass.getChildrenUsersByDeptId(this.currentDeptId, true)
        let needAdd = []
        let needRemove = []

        for(let value of values) {
          let hasExist = false 
          for(let selected of selectedUsers) {
            if(value == selected.id) {
              hasExist = true
            }
          }
          if(!hasExist) {
            needAdd.push(value)
          }
        }
        if(needAdd.length > 0) {
          this.UsersClass.addUsers(needAdd)
        }

        for(let selected of selectedUsers) {
          let hasExist = false 
          for(let value of values) {
            if(value == selected.id) {
              hasExist = true
            }
          }
          if(!hasExist) {
            needRemove.push(selected.id)
          }
        }
        if(needRemove.length >0) {
          this.UsersClass.removeUsers(needRemove)
        }

        this.isSelectedAllcheck(this.currentDeptId)
        this.selectedItemCount = this.UsersClass.getAllSelectedUsers().length
      },
      checkAll () { // 全选触发函数
        this.isCheckAll = !this.isCheckAll;
        this.$refs.userchecklist.$emit('ydui.checklist.checkall', this.isCheckAll);
      },
      getImgURL(user){ // 获取用户头像
         return window.location.protocol + "//" + fileServletHost + "/fileServlet?userToken=" + localStorage.getItem("token") + "&action=userAvatar&ownerId=" + user.id;
      }
    },
    components: {
      VNav
    }
  }
</script>
<style lang="scss" scoped>

</style>