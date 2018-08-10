import {BaseURL, axios, fileServletHost} from './config'

export const getConferenceListRest = params => {
  let url = `${BaseURL}/conferences`
  console.log(url)
  return axios.get(url, {params: params})
}

export const getConferenceRest = params => {
  let url = `${BaseURL}/conferences/` + params.id
  console.log(url)
  return axios.get(url, {params: params})
}

export const saveConference = params => {
  let url = `${BaseURL}/conferences?token=` + localStorage.getItem('token')
  console.log(url)
  return axios.post(url, params)
}

export const updateConference = params => {
  let url = `${BaseURL}/conferences/` + localStorage.getItem('confid') + `?token=` + localStorage.getItem('token')
  console.log(url)
  return axios.put(url, params)
}

export const removeConferenceRest = params => {
  let url = `${BaseURL}/conferences/` + params.id
  console.log(url)
  return axios.delete(url, {params: params})
}

export const conferenceInfo = params => {
  let url = `${BaseURL}/conferenceInfo`
  console.log(url)
  return axios.get(url, {params: params})
}

export const getUserAvatar = params => {
  let url = window.location.protocol + '//' + fileServletHost + '/fileServlet'
  console.log(url)
  return axios.get(url, {params: params})
}

export const terminateConferenceRest = (params) => {
  //  let url = `${BaseURL}/ep/`+params.deviceId+`/meetings/`+params.numericId+`/parties`;
  let url = `${BaseURL}/ongoingConferences/`+params.confId+`/control/terminate?token=`+params.token;
  console.log(url);
  return axios.put(url,  {} )
}
