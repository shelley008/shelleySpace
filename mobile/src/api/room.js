import { BaseURL, axios } from "./config";

//-----------------------------------获取会议室详情--------------------------------------------

export const getRoomById = params => {
  let url = `${BaseURL}/rooms/` + params.id;
  console.log("mobile getRoomById url===",url);
  return axios.get(url, { params: params });
};

// token
export const getMyRoom = params => {
  let url = `${BaseURL}/myRoom`;
  console.log("mobile myRoom url===", url);
  return axios.get(url, { params: params });
};
// token
export const updateMyRoomPassword = (token,params) => {
  let url = `${BaseURL}/myRoomPassword?token=`+token;
  console.log("mobile updateMyRoomPassword url===", url);
  return axios.put(url, params);
};
//numericId
export const getRoomInfo = params => {
  let url = `${BaseURL}/roomInfo`;
  console.log("mobile roomInfo url===", url);
  return axios.get(url, { params: params });
};
