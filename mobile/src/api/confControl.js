import {BaseURL, axios} from './config';

const confControl = (action,params) =>{
  let url = `${BaseURL}/ongoingConferences/`+params.numericId+`/parties/`+params.epGuid+`/control/`+action+`?token=`+params.token;
  console.log(url);
  return axios.put(url,  {} )};

// //-----------------------------------与会者列表---------------------------------------------
// export const getConfAttendssListRest = (guid,params) => { return axios.get(`${BaseURL}/ongoingConferences/`+guid, { params: params })};

//-----------------------------------与会者列表---------------------------------------------
export const getConfAttendssListRest = (params) => {
//  let url = `${BaseURL}/ep/`+params.deviceId+`/meetings/`+params.numericId+`/parties`;
  let url = `${BaseURL}/ongoingConferences/`+params.numericId+`?token=`+params.token;
  console.log(url);
  return axios.get(url, { })};

//-----------------------------------断开终端---------------------------------------------
export const disconnectionEpRest = (params) =>{return confControl('disconnect',params)};

//-----------------------------------静音或解除静音---------------------------------------------
export const muteOrUnmuteRest = (params) => {
    let url = `${BaseURL}/ongoingConferences/`+params.numericId+`/parties/`+params.epGuid+`/control/muteAudio?muteAudio=`+params.muteAudio+`&token=`+params.token;
    console.log(url);
    return axios.put(url,  {} )};

//-----------------------------------全部静音或全部解除静音---------------------------------------------
export const muteAllOrUnmuteAllRest = (params) => {
    let url = `${BaseURL}/ongoingConferences/`+params.numericId+`/control/muteAudioAllParties?muteAudio=`+params.muteAudio+`&token=`+params.token;
    console.log(url);
    return axios.put(url,  {} )};

//-----------------------------------设置焦点视频或取消焦点视频 ---------------------------------------------
export const setOrCancelFocusVideoRest = (params) => {
  let url = `${BaseURL}/ongoingConferences/`+params.numericId+`/parties/`+params.epGuid+`/control/setAsFocus?setAsFocus=`+params.setFocus+`&token=`+params.token;
    return axios.put(url,  {} )};

//-----------------------------------举手或取消举手 ---------------------------------------------
export const setOrCancelHandsUpRest = (params) => {
  let url = `${BaseURL}/ongoingConferences/`+params.numericId+`/parties/`+params.epGuid+`/control/handsUp?handsUp=`+params.handsUp+`&token=`+params.token;
  return axios.put(url,  {} )};

