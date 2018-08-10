let isBroswer = () => {
  let _broswer = {}
  var sUserAgent = navigator.userAgent
  var isOpera = sUserAgent.indexOf('Opera') > -1
  if (isOpera) {
    if (navigator.appName === 'Opera') {
      _broswer.version = parseFloat(navigator.appVersion)
    } else {
      var reOperaVersion = new RegExp('Opera (\\d+.\\d+)')
      reOperaVersion.test(sUserAgent)
      _broswer.version = parseFloat(RegExp['$1'])
    }
    _broswer.opera = true;
    _broswer.name = 'opera';
  }
  let isChrome = sUserAgent.indexOf('Chrome') > -1
  if (isChrome) {
    let reChorme = new RegExp('Chrome/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?')
    reChorme.test(sUserAgent)
    _broswer.version = parseFloat(RegExp['$1'])
    _broswer.chrome = true
    _broswer.name = 'chrome'
  }
  let isKHTML = (sUserAgent.indexOf('KHTML') > -1 || sUserAgent.indexOf('Konqueror') > -1 || sUserAgent.indexOf('AppleWebKit') > -1) && !isChrome
  if (isKHTML) {
    let isSafari = sUserAgent.indexOf('AppleWebKit') > -1
    let isKonq = sUserAgent.indexOf('Konqueror') > -1
    if (isSafari) {
      let reAppleWebKit = new RegExp('Version/(\\d+(?:\\.\\d*)?)')
      reAppleWebKit.test(sUserAgent)
   //   let fAppleWebKitVersion = parseFloat(RegExp['$1'])
      _broswer.version = parseFloat(RegExp['$1'])
      _broswer.safari = true
      _broswer.name = 'safari'
    } else if (isKonq) {
      let reKong = new RegExp('Konqueror/(\\d+(?:\\.\\d+(?\\.\\d)?)?)')
     // let reKong = new RegExp('Konqueror/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?')
      reKong.test(sUserAgent)
      _broswer.version = parseFloat(RegExp['$1'])
      _broswer.konqueror = true
      _broswer.name = 'konqueror'
    }
  }
  let isIE = sUserAgent.indexOf('compatible') > -1 && sUserAgent.indexOf('MSIE') > -1 && !isOpera
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(sUserAgent)
    _broswer.version = parseFloat(RegExp['$1'])
    _broswer.msie = true
    _broswer.name = 'msie'
  }
  var isMoz = sUserAgent.indexOf('Gecko') > -1 && !isChrome && !isKHTML;
  if (isMoz) {
    var reMoz = new RegExp('rv:(\\d+\\.\\d+(?:\\.\\d+)?)')
    reMoz.test(sUserAgent)
    _broswer.version = parseFloat(RegExp['$1'])
    _broswer.mozilla = true
    _broswer.name = 'mozilla'
  }
  return _broswer
}

export const isiOS = () => {
  let u = navigator.userAgent
  let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  return isIos
}

export const isAndroid = () => {
  let u = navigator.userAgent
  let isAnd = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  return isAnd
}

export const isPcWebUI = () => {
  console.log(isBroswer())
  var userAgentInfo = navigator.userAgent.toLowerCase()
  var Agents = ['android', 'iphone', 'windows phone', 'ipad', 'ipod']
  var ret = true
  Agents.forEach((item) => {
    if (userAgentInfo.indexOf(item) >= 0) {
      ret = false
    }
  })
  return ret
}

export const getUrlParamsObj = url => {
  let paramsObj = {}
  let arr = url.split('?')
  if (arr.length <= 1) {
    return paramsObj
  }
  arr = arr[1].split('&')
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i].split('=')
    paramsObj[a[0]] = a[1]
  }
  return paramsObj
}


export const changeLang = (i18n) => {
  let urlParamsObj = getUrlParamsObj(window.location.href);
  let defaultLang = 'cn'
  let lang = urlParamsObj['lang'];
  if(!lang) {
    lang = localStorage.getItem('lang')
  }else if(lang !== defaultLang && lang !== 'en') {
    lang = defaultLang;  //cn
  }
  if(lang) {
    localStorage.setItem('lang', lang)
  }else {
    localStorage.setItem('lang',defaultLang);
  }
  i18n.locale = localStorage.getItem('lang')
}

//深拷贝
export const deepClone = source => {
  const targetObj = source.constructor === Array ? [] : {}
  for(let keys in source){
    if(source.hasOwnProperty(keys)){
      if(source[keys] && typeof source[keys] === 'object'){
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      }else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj;
}
