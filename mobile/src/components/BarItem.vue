<template>
  <!--<a class="tab-item"  v-link="{path: path, activeClass: 'active', replace: true}">-->
  <!--</a>-->
  <router-link class="nav-item" v-bind:to="path" >
    <i class="icon-prefix" :class="iconClass" ></i>
    <span class="nav-label" v-text="label"></span>
  </router-link>
</template>

<script>
export default {
  data () {
    return {
      active: true
    }
  },

  props: {
    path: '',
    icon: '',
    label: ''

  },
  computed: {
    // iconStyle () {
    //   let style = {'font-size': this.path.indexOf('myroom') > 0 || this.path.indexOf('confSchedule') > 0 ? '16px' : '0.55rem',
    //     'display': this.path.indexOf('myroom') > 0 || this.path.indexOf('confSchedule') > 0 ? 'inline-block' : 'block'
    //   }
    //   return style
    // },
    iconClass () {
      return `icon-${this.icon}`
    },
    iconClassHover () {
      return ''
    }
  }
}
</script>
