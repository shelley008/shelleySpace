import {BaseURL, axios} from './config'

export const getUserListRest = params => {
  let url = `${BaseURL}/users?token=`+localStorage.getItem('token')
  // console.log(url)
  return axios.get(url, {params: params})
}

export const getUserByFilter = params => {
  let url = `${BaseURL}/users?token=`+localStorage.getItem('token')
  // console.log(url)
  return axios.get(url, {params: params})
}

export const getDeptListRest = params => {
  let url = `${BaseURL}/depts?token=`+localStorage.getItem('token')
  // console.log(url)
  return axios.get(url, {params: params})
}
