<template>
  <div class="appstore">
    <component :is="currentView"></component>
    <div class="footer" v-show="showNav">
      <div :class="{active:confIsActive}" class="footerNav" @click="pageChange('Conferences','会议')">
        <i :class="[!confIsActive?'icon-home':'icon-home-click']" style="font-sise:2rem;"></i>
        <span>会议</span>
      </div>

      <div :class="{active:dialIsActive}" class="footerNav" @click="pageChange('ConfControl','加入会议')">
        <i :class="[!dialIsActive?'icon-dial':'icon-dial-click']"></i>
        <span>加入会议</span>
      </div>

      <div :class="{active:meIsActive}" class="footerNav" @click="pageChange('Me','我')">
        <i :class="[!meIsActive?'icon-me':'icon-me-click']"></i>
        <span>我</span>
      </div>
    </div>
  </div>
</template>

<script>

import Conferences from "./conferences";
import ConfControl from "./confControl";
import Contacts from "./users";
import Me from "./me";
import { isPcWebUI } from "../common/js/utils";
export default {
  name: "suishitong",
  data: function() {
    return {
      title: "我的会议",
      currentView: Conferences,
      confIsActive: true,
      dialIsActive: false,
      contactsIsActive: false,
      meIsActive: false,
      showNav: true
    }
  },
  components: {
    Conferences,
    ConfControl,
    Contacts,
    Me
  },
  mounted: function() {
    this.showNav = isPcWebUI();
  },

  methods: {
    pageChange: function(url, title) {
      this.currentView = url;
      this.title = title;
      this.confIsActive = false;
      this.dialIsActive = false;
      this.contactsIsActive = false;
      this.meIsActive = false;
      console.log(url);
      switch (url) {
        case "Conferences":
          this.confIsActive = true;
          break;
        case "ConfControl":
          this.dialIsActive = true;
          break;
        case "Contacts":
          this.contactsIsActive = true;
          break;
        case "Me":
          this.meIsActive = true;
          break;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../static/css/comment.scss";
@import "../assets/css/sm.css";
[v-cloak] {
  display: none;
}
.fade-transition {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave {
  opacity: 0;
}

div.appstore {
  padding: 0 0 5rem 0;
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    display: -webkit-flex;
    border-top: 1px $gray solid;
    width: 100%;
    background: $white;
    .footerNav {
      flex: 1;
      text-align: center;
      padding: 5px 0;
      > i {
        font-size: 14px;
      }
      > span {
        display: block;
        font-size: 14px;
        margin-top: 5px;
      }
    }
    .footerNav.active {
      i,
      span {
        color: blue;
      }
    }
  }
}
</style>
