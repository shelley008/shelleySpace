<template>
    <div class="share-container">
        <div class="share-bg">
            <div class="logo"><img src="../../assets/share_logo.png" alt=""></div>
            <div class="share-box text-center errcolor" v-if="errorMessage">{{errorMessage}}</div>
            <div class="share-box">
                <h4>您即将加入：{{conf.confName}}</h4>
                <p><i>会议时间：</i><span>{{conf.confTime&&conf.confTime!=''?conf.confTime:'无'}}</span></p>
                <p><i>会议号码：</i><span>{{conf.numericId}}</span></p>
                <p><i>会议密码：</i><span>{{conf.confPassword&&conf.confPassword!=''?conf.confPassword:'无'}}</span></p>
                <p><i>会议备注：</i><span>{{conf.remark&&conf.remark!=''?conf.remark:'无'}}</span></p>
            </div>
            <div class="share-box">
                <h4>入会方式</h4>
                <template>
                   <p><i>方式一：</i><span>PC客户端</span></p>
                </template>
                <template v-if="conf.softEndpointJoinUrl&&conf.softEndpointJoinUrl!=''">
                    <p ><span>PC上通过<a :href="openurl">点击此处进入会议</a></span></p>
                    <!-- <p>通过<a :href="openurl" >单击此处</a>查看会议</p> -->
                    <!-- <p>通过<a style="cursor: pointer;" @click="openHexmeetHJT()">单击此处</a>查看会议</p> -->
                </template>
                <template v-if="conf.hardEndpointJoinUrl&&conf.hardEndpointJoinUrl!=''">
                    <p><i>方式二：</i><span>会捷通云视讯终端入会</span></p>
                    <p>通过遥控器输入<span class="t-blue">{{conf.hardEndpointJoinUrl}}</span></p>
                </template>
                <template v-if="conf.h323EndpointJoinUrl&&conf.h323EndpointJoinUrl!=''">
                    <p><i>方式三：</i><span>H.323终端入会</span></p>
                    <p>通过遥控器输入<span class="t-blue">{{conf.h323EndpointJoinUrl}}</span></p>
                </template>
                <template v-if="conf.sipEndpointJoinUrl&&conf.sipEndpointJoinUrl.length!=0">
                    <p><i>方式四：</i><span>SIP终端入会</span></p>
                    <p>通过遥控器输入<span class="t-blue">{{conf.sipEndpointJoinUrl}}</span></p>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { conferenceInfo } from '../../api/conference'
import {wechatJsConfig} from '../../api/weixin'
import wx from 'weixin-js-sdk'

export default {
    data () {
        return {
            conf: {},
            openurl:"",
            wechatJsConfig:'',
            errorMessage:''
        }
    },
    mounted () {
        this.getconfRest();
    },methods: {
        getconfRest() {
            this.numericId = this.$route.query.numericId;
            this.confId = this.$route.query.confId;

            let para = {};
            if (this.confId) {
                para.confId = this.confId;
            }
            if (this.numericId) {
                para.numericId = this.numericId;
            }
            let _this = this;
            conferenceInfo(para).then((res) => {
                console.log(res.data);
                if (res.data) {
                     this.conf = res.data;
                    this.openurl = this.conf.softEndpointJoinUrl;
                    this.shareWeixin();
                }

            }).catch((error) => {
                let errorCode = error.response.data.errorCode?error.response.data.errorCode:null;
                if (errorCode&&errorCode === 1400) {
                    _this.errorMessage = "会议不存在";
                    console.log(_this.errorMessage);
                }
            });
        },
        openHexmeetHJT(){
            this.openurl = this.conf.softEndpointJoinUrl;
        },
        shareWeixin(){
            if(!this.conf.domain || ''===this.conf.domain){
                return;
            }
            let para = {};
           // para.url = window.location.protocol+'//'+this.conf.domain+'/mobile/#'+window.location.href.split('#')[1];
            para.url = window.location.href;
            let _this = this;
            let imgUrl = window.location.protocol+'//'+_this.conf.domain+"/image/logo.png";
           //let imgUrl = "http://172.20.0.59:7777/image/logo.png"
            wechatJsConfig(para).then((res) =>{
                if(res.data){
                    this.wechatJsConfig = res.data;
                    if (!this.wechatJsConfig.appId) {
                        return;
                    }
                    wx.config({
                        debug: false,
                        appId: this.wechatJsConfig.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                        timestamp:this.wechatJsConfig.timestamp, // 必填，生成签名的时间戳
                        nonceStr: this.wechatJsConfig.nonceStr, // 必填，生成签名的随机串
                        signature: this.wechatJsConfig.signature,// 必填，签名，见附录1
                        //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
                        jsApiList: [
                            'onMenuShareAppMessage',
                            // 'onMenuShareTimeline',
                            // 'onMenuShareQQ',
                            // 'onMenuShareQZone'
                        ]
                    });
                    //处理验证失败的信息
                    wx.error(function (res) {
                        console.log('验证失败返回的信息:',res);
                        console.log(res.errMsg);
                    });
                    //处理验证成功的信息
                    wx.ready(function () {
                        // alert(window.location.href.split('#')[0]);
                    //分享给朋友
                    let message = "";
                        if (_this.conf.confTime&&_this.conf.confTime!='') {
                             message+='会议时间:'+_this.conf.confTime+'\n';
                        }
                        message+='会议号码:'+_this.conf.numericId+'\n';
                        if(_this.conf.confPassword&&_this.conf.confPassword!=''){
                            message+='会议密码:'+_this.conf.confPassword;
                        }
                    wx.onMenuShareAppMessage({
                        title: '[会捷通] '+_this.conf.confName, // 分享标题
                        desc: message, // 分享描述
                        link: para.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function (res) {
                            // 用户确认分享后执行的回调函数
                            console.log("分享给朋友成功返回的信息为:",res);
                        },
                        cancel: function (res) {
                            // 用户取消分享后执行的回调函数
                            console.log("取消分享给朋友返回的信息为:",res);
                        }
                    });

                    });
                }
            });

    }
    }
}
</script>
