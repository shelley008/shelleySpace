<template>
    <div class="confScheduleSuccess_wrap preventOverflowXY">
         <v-nav :path="path" :title="$t('confScheduleSucc.title')" :returnFlag="returnFlag"></v-nav>
         <div class="success_body">
                 <div class="success_title">
                     <i class="success_icon"></i>
                     <h3>{{ $t('confScheduleSucc.ScheduleSuccMsg') }}</h3>
                 </div>
                 <div class="success_msg" :class="{enLabelWidth:!isLangCN}">
                        <div class="success_msg_item">
                            <span>{{ $t('common.conferences.name') }}</span>
                            <h4>{{conf.name}}</h4>
                        </div>
                        <div class="success_msg_item">
                            <span>{{ $t('common.conferences.startTime') }}</span>
                            <h4>{{new Date(conf.startTime) | moment('YYYY-MM-DD HH:mm')}}</h4>
                        </div>
                        <div class="success_msg_item">
                            <span :class="{letter2em:isLangCN}">{{ $t('common.conferences.duration') }}</span>
                            <h4> {{ conf.duration | formatDuration }}</h4>
                        </div>
                        <div class="success_msg_item">
                            <span>{{ $t('common.conferences.numericId') }}</span>
                            <h4>{{conf.numericId}}</h4>
                        </div>
                        <div class="success_msg_item">
                            <span>{{ $t('common.conferences.password') }}</span>
                            <h4>{{conf.password}}</h4>
                        </div>
                 </div>
                 <!-- share -->
                 <div class="success_share">
                     <share-template :numericid="conf.numericId" :confid="conf.id"></share-template>
                 </div>

         </div>
    </div>
</template>

<script>
import VNav from "../components/Nav"
import shareTemplate from "../components/share";
import {formatDurationFn} from "../common/js/global.js"

export default {
  name:'confScheduleSuccess',
  data(){
      return{
          title: "预约成功",
          returnFlag: true,
          path: "/conferences",
          conf: {}
      }
  },
  components:{
     VNav,
     shareTemplate
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if (Object.is(from.path, '/confSchedule') && Object.is(to.path, "/confScheduleSuccess")) {
          this.initConf(this.$route.params.conf)
      }
    }
  },
  created() {
      this.initConf(this.$route.params.conf)
  },
  mounted() {
      this.initConf(this.$route.params.conf)
  },
  computed: {
    isLangCN() {
      return this.$i18n.locale == 'cn'
    }
  },
  methods:{
     initConf(conf) {
        if (!conf) return
        this.conf = conf
     }
  },
  filters: {
       formatDuration(ms){
         let time = formatDurationFn(ms)
         return time
       }
  }
}
</script>



