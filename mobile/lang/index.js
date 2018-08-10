import Vue from 'vue'
import VueI18n from 'vue-i18n'
import LangEn from './en'
import LangCn from './cn'

Vue.use(VueI18n)
Vue.locale = () => {};

let lang = localStorage.getItem('lang')
let language = (!lang || lang === 'null') ? 'cn' : lang
localStorage.setItem('lang', language)
const i18n = new VueI18n({
  locale: language,
  messages:{
    'cn': LangCn,
    'en': LangEn
  }
})

export default i18n
