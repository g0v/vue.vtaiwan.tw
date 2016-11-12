<style lang="scss" scoped>

@import "./sass/global.scss";

.app {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  @include transition(border-color 0.5s ease);
  &.join {    border-color: $join  }
  &.comment {    border-color: $comment  }
  &.live {    border-color: $live  }
  &.track {   border-color: $track  }
}

.main {
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

.fade-out-speard-in-enter, .fade-out-speard-in-leave-active {
  opacity: 0
}

.fade-out-speard-in-leave-active {
  @include transition(all .3s);
}

.fade-out-speard-in-enter-active {
  @include transition(all .5s ease-in);
}

.fade-out-speard-in-enter {
  @include transform(rotateY(45deg));
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.footer {
  margin: 0 auto;
  margin-top: 40px;
  max-width: 1170px;
}

</style>

<template lang="jade">
#app.app
  navbar.navbar(:routes = "myRoutes")

  Slideshow.slideshow

  StepGuide.stepGuide

  a.sidebar-button(@click="openSideBar = !openSideBar")
    span(v-if="openSideBar") -
    span(v-else) +

  breadcrumb(:routes = "myRoutes", :pure="pure")

  #main.main
    transition(name='fade-out-speard-in', mode='out-in')
      router-view.view

  Footer.footer
</template>

<script>

import navbar from './components/app_navbar.vue'
import breadcrumb from './components/app_breadcrumb.vue'
import Slideshow from './components/Slideshow.vue'
import StepGuide from './components/StepGuide.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    navbar,
    breadcrumb,
    Slideshow,
    StepGuide,
    Footer
  },
  data () {
    return {
      myRoutes: [
        {en:'Home',t:'首頁',r:''},
        {en:'User manual',t:'使用手冊',r:'join'},
        {en:'About',t:'關於 vTaiwan',r:'comment'},
        {en:'Login', t:'登入',r:'live'},
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
</style>
