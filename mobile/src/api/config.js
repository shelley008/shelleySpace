import axios from 'axios'
import {tokenExpiredCallBack} from '../api/callBack/callbackWin'
import Vue from 'vue'

let BaseURLBackup
// let serverAddress = 'cloud.hexmeet.com'
let serverAddress = '172.24.0.118'
let restPath = '/api/rest/v2.0'
let hostUrlBackup = window.location.host
let fileServletHostBackup = window.location.host
let serverUrl = window.location.host
let protocol = window.location.protocol
if (process.env.NODE_ENV === 'development') {
  BaseURLBackup = 'http://' + serverAddress + restPath
  fileServletHostBackup = serverAddress
}
else {
  BaseURLBackup = protocol + '//' + serverUrl + restPath
  hostUrlBackup = protocol + '//' + serverUrl + '/webapp'
}

// interceptors
axios.interceptors.response.use(function (response) {
  return response
  }, function (error) {
    // 处理统一的验证失效错误.
    let errorCode = error.response.data.errorCode ? error.response.data.errorCode : null
    if (errorCode && errorCode === 1001) {
      console.log('Token 失效')
      tokenExpiredCallBack()
    } else {
      let msg = ''
      if (errorCode) {
        msg = window.vue.$t(`exceptions.${errorCode}`)
        window.vue.$dialog.toast({
          mes: msg,
          timeout: 1500
        });
      }
      console.log(`errorCode = ${errorCode}, errorMsg = ${msg}`)
    }
    return Promise.reject(error)
})

const BaseURL = BaseURLBackup
const hostUrl = hostUrlBackup
const fileServletHost = fileServletHostBackup
export {BaseURL, axios, hostUrl, fileServletHost}
