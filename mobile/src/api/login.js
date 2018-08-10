import {BaseURL, axios} from './config'

export const doLoginRest = params => {
  return axios.put(`${BaseURL}/web/login`, params)
}

export const loginByToken = token => {
  return axios.get(`${BaseURL}/authentication?token=` + token, {})
}

export const autoLogin = () => {
  let username = localStorage.getItem('userName')
  let password = localStorage.getItem('password')
  if (!username || !password) {
    console.log('auto login failed')
    return;
  }
  var pwd = crypto.createHash('sha1').update(password, 'utf-8').digest('HEX')
  console.log(pwd)
  let para = {
    account: username,
    password: pwd
  }
  doLoginRest(para).then((res) => {
    console.log('login username password', username, password)
    var _this = this
    localStorage.setItem('token', res.data['token'])
    localStorage.setItem('userName', username)
    localStorage.setItem('password', password)
    localStorage.setItem("currentUser", JSON.stringify(res.data.profile))
  }).catch((err) => {
  })
}
