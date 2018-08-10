<template>
    <div class="share-container">
        <div class="share-bg">
            <div class="logo"><img src="../../assets/share_logo.png" alt=""></div>
            <div class="share-box share-box-up">
                <h4>您即将加入：{{room.name}}</h4>
                <p><i>云会议室号码：</i><span>{{room.numericId}}</span></p>
                <p><i>云会议室密码：</i><span>{{room.password&&room.password!=''?room.password:'无'}}</span></p>

            </div>
            <div class="share-box share-box-down">
                <h4>入会方式</h4>
                <template>
                   <p><i>方式一：</i><span>PC客户端</span></p>
                </template>
                <template v-if="room.softEndpointJoinUrl&&room.softEndpointJoinUrl!=''">
                    <p><span>会捷通客户端入会<a :href="openurl">点击此处</a></span></p>
                    <!-- <p>通过<a :href="openurl" >单击此处</a>查看会议</p> -->
                    <!-- <p>通过<a style="cursor: pointer;" @click="openHexmeetHJT()">单击此处</a>查看会议</p> -->
                </template>
                <template v-if="room.hardEndpointJoinUrl&&room.hardEndpointJoinUrl!=''">
                    <p><i>方式二：</i><span>会捷通云视讯终端入会</span></p>
                    <p>通过遥控器输入<span class="t-blue">{{room.hardEndpointJoinUrl}}</span></p>
                </template>
                <template v-if="room.h323EndpointJoinUrl&&room.h323EndpointJoinUrl!=''">
                    <p><i>方式三：</i><span>H.323终端入会</span></p>
                    <p>通过遥控器输入<span class="t-blue">{{room.h323EndpointJoinUrl}}</span></p>
                </template>
                <template v-if="room.sipEndpointJoinUrl&&room.sipEndpointJoinUrl.length!=0">
                    <p><i>方式四：</i><span>SIP终端入会</span></p>
                    <p>通过遥控器输入<span class="t-blue">{{room.sipEndpointJoinUrl}}</span></p>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import {getRoomInfo} from "../../api/room";
export default {
    data () {
        return {
            room: {},
            openurl:"",
        }
    },
    mounted () {
        this.getconfRest();
    },methods: {
        getconfRest() {
            this.numericId = this.$route.query.numericId;
            let para = {};
            if (this.numericId) {
                para.numericId = this.numericId;
            }
            getRoomInfo(para).then((res) => {
                console.log(res.data);
                this.room = res.data;
                this.openurl = this.room.softEndpointJoinUrl;
            }).catch(function (error) {
                console.log(error);
            });
        },
        openHexmeetHJT(){
            this.openurl = this.room.softEndpointJoinUrl;
        }, shareWeixin(){
            if(!this.room.domain || ''===this.room.domain){
                return;
            }
            let para = {};
           // para.url = window.location.protocol+'//'+this.conf.domain+'/mobile/#'+window.location.href.split('#')[1];
            para.url = window.location.href;
            let _this = this;
            let imgUrl = window.location.protocol+'//'+_this.room.domain+"/image/logo.png";
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
                        message+='会议号码:'+_this.room.numericId+'\n';
                        if(_this.room.password&&_this.room.password!=''){
                            message+='会议密码:'+_this.room.password;
                        }
                    wx.onMenuShareAppMessage({
                        title: '[会捷通] '+_this.room.name, // 分享标题
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

