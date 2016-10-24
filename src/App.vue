<template lang="jade">
#app(:class="pure($route.path)")
  navbar(:routes = "myRoutes")

  a.sidebar-button(@click="openSideBar = !openSideBar", :class="pure($route.path)")
    span(v-if="openSideBar") -
    span(v-else) +

  breadcrumb(:routes = "myRoutes")
  
  #main
    transition(name='fade', mode='out-in')
      router-view.view
  footer
    | 施工中...
    a(href='https://g0v.hackpad.com/vTaiwan--H2QhNRFVMOw', target="_blank") Hackpad
    | |
    a(href='https://xd.adobe.com/view/504e446c-90c8-4816-5ac3-941ee02cbdff/', target='_blank') 視稿
    | |
    a(href='https://github.com/g0v/vue.vtaiwan.tw/issues', target='_blank') 議題區
    | |
    a(href="https://bestian.github.io/start-vue") 學習Vue
</template>

<script>

import navbar from './components/app_navbar.vue'
import breadcrumb from './components/app_breadcrumb.vue'

export default {
  components: {
    navbar,
    breadcrumb
  },
  data () {
    return {
      myRoutes: [
        {en:'Home',t:'首頁',r:''},
        {en:'Pitch Issue',t:'來提個議題',r:'join'},
        {en:'Comment',t:'留言不忘返',r:'comment'},
        {en:'Live Draft', t:'直播寫草案',r:'live'},
        {en:'Follow PROPOSAL', t:'來追蹤定案',r:'track'}
      ],
      openSideBar: false
    }
  },
  methods: {
    pure(path) {
      var obj = this.myRoutes.filter((o) => {
        return '/'+o.r == path;
      })[0]
      return obj ? obj.r : ''
    }
  }
}

</script>


<style lang="scss">

@import "./sass/global.scss";

* {  box-sizing: border-box }
a, button {
  cursor: pointer !important;
}

html {
  font-size: 16px;
  font-size: 2.5vm;
  font-size: 2.5vmin;
}

body {
  visibility: visible;
  opacity: 1;
  @include transition(opacity 0.5s ease);
  padding: 0;
  margin: 0;
}

#app {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  border: 5px solid $main;
  @include transition(border-color 0.5s ease);
  &.join {    border-color: $join  }
  &.comment {    border-color: $comment  }
  &.live {    border-color: $live  }
  &.track {   border-color: $track  }
}

#main {
  position: relative;
  top: 1.5rem;
  width: 100%;
  text-align: center;
}


.sidebar-button {
  position: fixed;
  z-index: 99999;
  top: $bread-top - 5px;
  left: 0;
  width: 35px;
  height: 35px;
  font-size: 35px;
  text-align: center;
  background-color: $main;
  &.join { background-color: $join }
  &.comment { background-color: $comment }
  &.live { background-color: $live }
  &.track { background-color: $track }
  @include transition(background-color 0.5s ease);
}


footer {
  position:fixed;
  bottom:0;
  left: 20%;
  width: 60%;
  height: 2rem;
  text-align:center;
  background-color: #ccc;
  padding: 7px;
  border-top: 1px dotted green;
  a {padding: 5px}
}

.fade-enter-active, .fade-leave-active {
  @include transition(opacity .5s ease-in);
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
