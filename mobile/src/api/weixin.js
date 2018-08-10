import { BaseURL, axios } from "./config";

export const wechatJsConfig = params => {
  let url = `${BaseURL}/wechatJsConfig`;
  console.log("mobile wechatJsConfig url===", url);
  return axios.post(url,  params);
};
