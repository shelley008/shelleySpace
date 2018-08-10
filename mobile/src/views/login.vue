<template>
  <div id="app">
    <div class="login-container">
      <h3 class="login-header">svc</h3>
      <div class="login-body">
        <mt-field  :placeholder="$t('loginVue.userNameTip')" v-model="userName"></mt-field>
        <mt-field  :placeholder="$t('loginVue.passwordTip')" type="password" v-model="password"></mt-field>
        <div class="login-btn" @click="doLogin(userName,password)">{{ $t('loginVue.login') }}</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {doLoginRest} from '../api/login'
  import crypto from 'crypto'
  export default {
    name: 'app',
    data () {
      return {
        userName:localStorage.getItem('userName') || '',
        password:localStorage.getItem('password') || ''
      }
    },
    mounted: function() {
      window.vue = this
    },
    methods: {
      doLogin: function (username, password) {
        let _this = this
        let pwd = crypto.createHash('sha1').update(password, 'utf-8').digest('HEX')
        console.log(pwd)
        let para = {
          account: username,
          password: pwd
        }

        doLoginRest(para).then((res) => {
          console.log('login username password', username, password)
          localStorage.clear()
          localStorage.setItem('userName', username)
          localStorage.setItem('password', password)
          localStorage.setItem('deviceId', res.data['deviceId'])
          localStorage.setItem('token', res.data['token'])
          localStorage.setItem('loginUserName', res.data['username'])
          localStorage.setItem('userId', res.data.userId)

          localStorage.setItem("currentUser", JSON.stringify(res.data.profile))
          _this.$router.push('/conferences')
        }).catch((err) => {
          console.log(err)
          _this.$dialog.toast({
            mes:  this.$t('loginVue.errorMsg'),
            timeout: 1000
          })
        })
      }
    }
  }

</script>
<style scoped>
  .login-container{
    display: flex;
    justify-content:flex-start;
    flex-direction: column;
    align-items: stretch;
  }
    .login-header{
      font-size:1.6rem;
      margin-top:1.6rem;
      text-align: center;
      margin-bottom:.4rem;
    }
    .login-body{
      margin:1rem .9rem;
      padding:.2666667rem;
      border-radius:.06666667rem;
     }
      .login-btn{
        margin-top:1rem;
        font-size:.48rem;
        line-height:1rem;
        padding:.15rem;
        text-align: center;
        color:#fff;
        background: #ef4f4f;
        border-radius:.2rem;
        word-spacing: 0.5em;
      }
      .login-body .mint-cell{
          border:1px solid #ccc;
          padding:.2rem!important;
          margin-right: 0 !important;
          margin-left: 0 !important;
          margin-bottom:.5rem;
      }
     .is-nolabel{
        padding-bottom:1rem !important;
        height: 1.2rem;
      }
</style>
