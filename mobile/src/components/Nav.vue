<template>
  <nav class="header">
    <h1 class="header-title" v-text="title"></h1>
    <router-link v-show="returnFlag" class="button button-link button-nav pull-left leftIcon" v-bind:to="path" >
      <span class="icon icon-left"></span>
    </router-link>
  </nav>
</template>

<script>
export default {
  props: {
    title: '',
    path: '',
    returnFlag:true
  }
}
</script>

