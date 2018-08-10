import {exceptions_cn} from './exceptions_cn'
const zh ={
  common: {
    nothing:'无',
    back:'<返回',
    OK : '确定',
    Cancel : '取消',
    Prompt : '提示',
    SaveBtn:'保存',
    Save:'确定',
    loadingTxt:'加载中...',
    hours:'小时',
    minutes:'分钟',
    conferences:{
      name:'会议名称',
      startTime:'开始时间',
      duration:'时长',
      numericId: '会议ID',
      password:'会议密码',
      remark:'会议备注'
    },
    tips:{
      pswTip:'12位以内数字'
    },
    msgs:{
      pswErrorMsg:'密码为1-12位数字!'
    }
  },
  message: {
    hello: '你好',
    about: '关于',
    welcome: "欢迎"
  },
  confControl: {
    navTitle: '会议管理',
    title:'邀请',
    attendss: {
      name:'名称',
      label:'操作'
    },
    btns: {
      muteAll:'全体静音', // 全体静音
      unmuteAll:'解除全体静音', // 解除全部静音
      subtitle : '字幕',
      Handsoff : '取消举手',
      Handsup : '举手',
      unfocus : '取消焦点',
      focus : '设为焦点',
      mute : '静音',
      unmute : '解除静音',
      hangup : '挂断'
    },
    status : {
      FocusVideo : '焦点视频',
      Handsup : '已举手',
      unmute : '非静音',
      mute : '静音'
    },
    host:' 主持人', // (主持人)
    lecturer:' (主会场)',
    noMeetingMessage:'无入会或无在线终端!',
    muteSuccTip:'静音成功！',
    unMuteSuccTip:'解除静音成功！',
    muteAllSuccTip:'全部静音成功！',
    unMuteAllSuccTip:'解除全部静音成功！',
    focusSuccTip:'设置焦点视频成功！',
    unFocusSuccTip:'解除焦点视频成功！',
    handsupSuccTip:'举手成功！',
    handsoffSuccTip:'取消举手成功！',
    hangupSuccTip:'已挂断终端',
    sureToHangup:'你确定要挂断会议中的终端【',
    sMeeting : "】?"
  },
  conferences:{
    title:'会捷通',
    myRoom:'我的会议室',
    schedule:'预约会议',
    join:'加入会议',
    titOngoing:'召开',
    titSchedule:'预约',
    titConfId:'会议ID',
    titConfPwd:'会议密码',
    titConfTime:'时间',
    titConfList:'会议列表',
    titRoomId:'号码',
    titScheduleText:'开始预约您的会议',
    userOwnRoomId:'未分配会议室',
    noMeetingInfomation : '暂无会议信息',
    notice : {
      CancelDeletionMeeting : '已取消删除会议',
      CancelTerminateMeeting : '已取消结束会议'
    },
    pullTxt:'下拉刷新',
    dropTxt:'释放更新'
  },
  confDetail : {
      title:'会议详情',
      operate:
      {
        share:'分享',
        edit:'编辑',
        delete:'删除',
        enterconf:'加入会议',
        controlconf : '控制会议',
        terminate : '结束'
      },
      sureToTerminate:'你确定要结束【',
      sureTodelete: '你确定要删除【',
      sMeeting : "】的会议?"
  },
  shareVue : {
    title:'您还可以',
    weChatMobileSharing :'微信分享',// /手机
    emailSharing : '邮件分享',
    copyMeetingLink : '会议链接', //复制
    copyMeetingMessage : '会议信息',//复制
    copyMeetingLinkSuccessInfo: '会议URL已被复制剪贴板!',
    copyMeetingMessageSuccessInfo: '会议信息已被复制剪贴板!',

    cloudRoomName : '云会议室名称',
    cloudRoomPassword : '云会议室密码',
    HexMeetSoftEndpointJoinUrl : '会捷通客户端入会链接',
    HexMeetHardEndpointJoinUrl : '会捷通云视讯终端入会',
    InputViaTheRemote : '通过遥控器输入 ',
    h323EndpointJoinUrl : 'H.323终端入会',
    sipEndpointJoinUrl : 'SIP终端入会',
    confName:'会议名称',
    confTime : '会议时间',
    confNumber : '会议号码',
    confPassword : '会议密码',
    confRemark : '会议备注',
    share:'分享'
  },
  myRoomVue : {
    title:'我的会议室',
    roomNumber : '会议室号码',
    updatePassword : '修改密码',
    updateRoomPassword : '修改会议室密码',
    password : '密码',
    ok : '确定',
    noRoomMessage : '请管理员通过自服务平台开通您的会议室权限',
    join:'加入会议',
    closeCamera:'关闭摄像头',
    closeMicrophone:'关闭麦克风'
  },
  inviteVue : {
    share : '分享',
    chosetoshare : '选择分享方式'
  },
  loginVue : {
    userNameTip:'请输入用户名',
    passwordTip:'请输入密码',
    login : '登 录',
    errorMsg:'用户名或密码错误！'
  },
  confSchedule:{
    title:'预约会议',
    editTitle:'编辑会议',
    now:'现在',
    nameTip:'请输入会议名称',
    remarkTip:'请输入会议备注',
    userErrorMsg:'会议成员最少1人',
    sMeeting:'的会议',
    nameErrorMsg:'会议名称不能为空！',
    durErrorMsg:'会议时长不能小于15分钟',
    loadingText:'提交中...'
  },
  usersVue:{
    title:'邀请',
    nameTip:'请输入用户名称',
    contacts:'联系人',
    noUserMsg:'暂无成员',
    nonetWork:'加载失败，请检查您的网络',
    reloadBtn:'重新加载',
    noResult:'未搜索到相关结果',
    checkAll:'全选',
    confirm:'确定'
  },
  confScheduleSucc:{
    title:'预约成功',
    ScheduleSuccMsg:'您的会议已预约成功!'
  },
  exceptions: exceptions_cn
}
export default zh;
