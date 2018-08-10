
import { isPcWebUI } from './utils.js';

export function setFromatParam(key,val){
    if(isPcWebUI()){
        return;
    }
    let callbackObj = window.callbackObj
    let param = JSON.stringify(val)
    if(isiOS()){
      let callFunc = key + '$' + param
      if( window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.callbackObj.postMessage(callFunc)
      }
    } else if (callbackObj){
      if(key === 'shareEmail') {
        callbackObj.shareEmail(param)
      }else if(key === 'shareWechat') {
        callbackObj.shareWechat(param)
      }else if(key === 'isShowNav') {
        callbackObj.isShowNav(param)
      }else if(key === 'joinConf') {
        callbackObj.joinConf(param)
      }
    }
}

//iOS判断
export function isiOS() {
    let u = navigator.userAgent;
    let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
   // console.log('----isios----'+isIos)
    return isIos;
}

//isAndroid判断
export function isAndroid () {
    let u = navigator.userAgent
    let isAnd = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    return isAnd
}


 //动态提示框信息
export function showMsg(val){
    let domEle = document.createElement("div");
    domEle.setAttribute("class","popLayout");
    let inEle = document.createElement("span");
    let txt = document.createTextNode(val);
    inEle.appendChild(txt);
    domEle.appendChild(inEle);
    document.body.appendChild(domEle);
    setTimeout(function () {
       document.body.removeChild(domEle);
      }, 1500)
}


//时长
export function formatDurationFn(ms){
    if(!ms) return
    var hours = parseInt(ms / (1000 * 60 * 60));
    var minutes = Math.ceil(parseInt(ms % (1000 * 60 * 60)) / (1000 * 60));
    hours = hours == 0 ? '' : `${hours} ${window.vue.$t('common.hours')}`
    minutes = minutes == 0 ? '' : `${minutes} ${window.vue.$t('common.minutes')}`
    return hours + minutes
}

/*
* @method 时长格式化
* @param: {字符串} [ms] 毫秒数 (eg. 36000)
* @return {字符串} 时间字符串 (eg. 01:00)
*/
export function formatDuration2Num(ms){
    if(!ms) return
    var hours = parseInt(ms / (1000 * 60 * 60));
    var minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
    if(hours < 10){
        hours = "0" + hours
    }
    if(minutes < 10){
        minutes = "0" + minutes
    }
    return hours + ':' + minutes
}


/*
* set footer position
* ele 选择器
* posVal 位置
* page 页面
*/
export function setFootPosition(ele,posVal,page){
    let winH =  parseInt(document.documentElement.clientHeight)
    let footEle = document.querySelector(ele)
    let pos = 0
    let deviceIphoneX = false
    let deviceIphoePlus = false
    let deviceIphoe8 = false
    //showMsg(winH)
    if(winH == 768) deviceIphoneX = true
    if(winH == 716) deviceIphoePlus = true
    if(winH == 647) deviceIphoe8 = true
    if(deviceIphoneX){
        if(page === 'subpage') pos = 20 + 'px'
        if(page === 'conference') pos = 100 + 'px'
    }else if(deviceIphoePlus && page === 'conference'){
        pos = 70 + 'px'
    }else if(deviceIphoe8 && page === 'conference'){
        pos = 65 + 'px'
    }
    if(!pos && page !== 'subpage') {
        pos = '30px'
    }
    footEle.setAttribute('style',`bottom:${pos} !important`)
}


/*
* set 备注高度
* def 编辑页备注高度
* ele textarea
*/
export function makeExpandingArea(def,ele) {
    let el = document.querySelector(ele)
    if(!el) {return}
    if(def){
        el.style.height = 'auto'
        el.style.height = def + 'px'
    }
    let setStyle = function(el) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px'
    }
    let delayedResize = function(el) {
        window.setTimeout(function() {
            setStyle(el)
        },0);
    }
    if (el.addEventListener) {
        el.addEventListener('input',function() {
            setStyle(el)
        },false);
        setStyle(el)
    } else if (el.attachEvent) {
        el.attachEvent('onpropertychange',function() {
            setStyle(el)
        });
        setStyle(el)
    }
    if (window.VBArray && window.addEventListener) { //IE9
        el.attachEvent("onkeydown",function() {
            let key = window.event.keyCode;
            if (key == 8 || key == 46) delayedResize(el);
        });
        el.attachEvent("oncut",function() {
            delayedResize(el);
        }); //处理粘贴
    }
}