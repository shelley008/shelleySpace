import {exceptions_en} from './exceptions_en'
const en ={
  common: {
    nothing: 'NO',
    back:'<Back',
    OK : 'OK',
    Cancel : 'Cancel',
    Prompt : 'Prompt',
    SaveBtn:'Save',
    Save:'Save',
    loadingTxt:'loading...',
    hours:'hour(s)',
    minutes:'minute(s)',
    conferences:{
      name: 'Name',
      startTime: 'Start time',
      duration: 'Duration',
      numericId: 'Conf ID',
      password: 'Password',
      remark: 'Description'
    },
    tips:{
      pswTip:'Please input 1-12 number'
    },
    msgs:{
      pswErrorMsg:'The password should be 1-12 digits!'
    }
  },
  message: {
    hello: 'hello',
    about: 'about',
    welcome: "Welcome"
  },
  confControl: {
    navTitle: 'meeting manage',
    title:'Invite',
    attendss: {
      name:'name',
      label:'action'
    },
    btns: {
      muteAll:'Mute All',
      unmuteAll:'Unmute All',
      subtitle : 'Subtitle',
      Handsoff : 'Handsoff',
      Handsup : 'Handsup',
      unfocus : 'Unfocus',
      focus : 'Focus',
      mute : 'Mute',
      unmute : 'Unmute',
      hangup : 'Hangup'
    },
    status : {
      FocusVideo : 'Focus Video',
      Handsup : 'Handsup',
      unmute : 'Unmute',
      mute : 'Mute'
    },
    host:'host', //(host)
    lecturer:' (lecturer)',
    noMeetingMessage:'No terminal or online terminal!',
    muteSuccTip:'Mute success!',
    unMuteSuccTip:'Unmute success!',
    muteAllSuccTip:'All mute success!',
    unMuteAllSuccTip:'All unmute success!',
    focusSuccTip:'Set focus video success!',
    unFocusSuccTip:'Set unfocus video success!',
    handsupSuccTip:'Handsup success!',
    handsoffSuccTip:'Handsoff success!',
    hangupSuccTip:'Hangup success!',
    sureToHangup:'Are you sure to hangup the terminal [',
    sMeeting : "] in the meeting?"
  },
  conferences:{
    title:'HexMeet',
    myRoom:'My Room',
    schedule:'Schedule',
    join:'Join Conf',
    titOngoing:'Ongoing',
    titSchedule:'Schedule',
    titConfId:'ID',
    titConfPwd:'Password',
    titConfTime:'Time',
    titConfList:'Meeting List',
    titRoomId:'Room ID',
    titScheduleText:'Schedule a Meeting',
    userOwnRoomId:'None',
    noMeetingInfomation : 'No meeting information.',
    notice : {
      CancelDeletionMeeting : 'Cancel deletion meeting',
      CancelTerminateMeeting : 'Cancel terminate the meeting'
    },
    pullTxt:'pull refresh',
    dropTxt:'drop update'
  },
  confDetail: {
    title:'conference detail',
    operate: {
        share:'share',
        edit:'edit',
        delete:'delete',
        enterconf: 'Enter',
        controlconf : 'Control',
        terminate : 'terminate'
      },
      sureToTerminate:'Are you sure to terminate [',
      sureTodelete:'Are you sure to delete [',
      sMeeting : "] 's meeting?"
  },
  shareVue : {
    title:'You Can Also',
    weChatMobileSharing :'WeChat',// /Mobile
    emailSharing : 'Email',
    copyMeetingLink : 'Copy Link',
    copyMeetingMessage : 'Copy Message',
    copyMeetingLinkSuccessInfo: 'The meeting URL has been copied clipboard!',
    copyMeetingMessageSuccessInfo: 'The meeting information has been copied clipboard!',

    cloudRoomName : 'Room Name',
    cloudRoomPassword : 'Room Password',
    HexMeetSoftEndpointJoinUrl : 'HexMeet client Enter Meeting Link',
    HexMeetHardEndpointJoinUrl : 'HexMeet cloud video terminal entrance',
    InputViaTheRemote : 'Input via the remote ',
    h323EndpointJoinUrl : 'The H.323 terminal enter meeting',
    sipEndpointJoinUrl : 'The SIP terminal enter meeting',
    confName :'Name',
    confTime : 'Time',
    confNumber : 'Number',
    confPassword : 'Password',
    confRemark : 'Description',
    share: 'Share'
  },
  myRoomVue : {
    title:'my room',
    roomNumber : 'room Number',
    updatePassword : 'reset Password',
    updateRoomPassword : 'reset the Room password',
    password : 'Password',
    ok : 'OK',
    noRoomMessage : 'Ask the administrator to open your meeting room through the self-service platform',
    join:'Join Conf',
    closeCamera:'Close Camera',
    closeMicrophone:'Close Microphone'
  },
  inviteVue : {
    share : 'Share',
    chosetoshare : 'Choose to share'
  },
  loginVue : {
    userNameTip:'Please input your username',
    passwordTip:'Please input your password',
    login : 'Sign in',
    errorMsg:'Incorrect username or password!'
  },
  confSchedule:{
    title:'schedule',
    editTitle:'edit meeting',
    now:'now',
    nameTip:'Please input meeting name',
    remarkTip:'Please input description',
    userErrorMsg:'At least 1 members of the conference',
    sMeeting:'\'s meeting',
    nameErrorMsg:'The name of the meeting cannot be empty',
    durErrorMsg:'The length of the meeting should not be less than 15 minutes!',
    loadingText:'loading...'
  },
  usersVue:{
    title:'invite',
    contacts:'Contacts',
    nameTip:'Please input user name',
    noUserMsg:'No members',
    nonetWork:'Load failed, please check your network',
    reloadBtn:'Reload',
    noResult:'Not searching for relevant results',
    checkAll:'check all',
    confirm:'Confirm'
  },
  confScheduleSucc:{
    title:'schedule success',
    ScheduleSuccMsg:'Your meeting has been booked for success!'
  },
  exceptions: exceptions_en
}

export default en;
