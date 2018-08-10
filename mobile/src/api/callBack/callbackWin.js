
import {isiOS } from '../../common/js/utils.js'

export const joinConfCallBack = (confNumber = '', confPassword = '') => {

}

export const tokenExpiredCallBack = () => {
    if(isiOS) {
      if( window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.callbackObj.postMessage(tokenExpired)
      }
    }else {
      if(window.callbackObj && window.callbackObj.tokenExpired) {
        window.callbackObj.tokenExpired()
      }
    }
}

//app callback
window.updateToken = function(token) {
  console.log('winapp callback get new token =' + token)
  if(token) {
    localStorage.setItem('token',token)
  }
}
