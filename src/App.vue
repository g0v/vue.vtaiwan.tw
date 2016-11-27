<template lang="jade">
#app.app
  Navbar.navbar(:routes = "myRoutes")

  #main.main
    transition(name='fade-out-speard-in', mode='out-in')
      router-view.view(:allTopics="allTopics", :catagories="catagories")

  MyFooter.footer
</template>

<script>

import Navbar from './components/app_Navbar.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  components: {
    Navbar,
    MyFooter
  },
  data () {
    return {
      myRoutes: [
        {en:'Home',t:'首頁',r:''},
        {en:'User manual',t:'使用手冊',r:'how-to-use'},
        {en:'About',t:'關於 vTaiwan',r:'intro'},
        {en:'Login', t:'登入',r:'login'},
      ],
      catagories: [
        {t: '商業'},
        {t: '經濟'},
        {t: '科技'},
        {t: '文化'},
        {t: '交通'},
        {t: '體育', 
          cover: 'http://lorempixel.com/320/240/sports'},
        {t: '社會'},
        {t: '農業'}
      ],
      allTopics: [
        {   slogan:'邁向世界的舞台', 
            title:'公司英文名稱登記', 
            status:'討論中',
            progress: 10,
            total: 30,
            owner: '內政部',
            catagory: '科技',
            cover:'http://static.thousandwonders.net/Taiwan.original.3738.jpg',
            likes: 6543
        },        
        {   slogan:'理想與現實',
            title:'公司法中的社會企業',
            status:'討論中',
            progress: 18,
            total: 30,
            owner: '經濟部',
            catagory: '經濟',
            cover:'http://lorempixel.com/320/240/transport',
            likes: 4543
        },        
        {   slogan:'事做不夠假放不夠',
            title:'一例一修草案', 
            status:'已送審', 
            progress: 24,
            total: 30,
            owner: '勞動部',
            catagory: '社會',
            cover:'http://lorempixel.com/320/240/sports',
            likes: 2543
        },        
        {   slogan:'測試一下',
            title:'測試一下', 
            status:'已送審', 
            progress: 24,
            total: 30,
            owner: '不管部',
            cover: 'http://lorempixel.com/320/240/sports',
            likes: 143
        }
      ]
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

<style lang="scss" scoped>

@import "./sass/global.scss";

.app {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  @include transition(border-color 0.5s ease);
  &.join {    border-color: $join  }
  &.intro {    border-color: $intro  }
  &.live {    border-color: $live  }
  &.track {   border-color: $track  }
}

.main {
  position: relative;
  top: 0;
  width: 100%;
  text-align: center;
}


.fade-out-speard-in-enter, .fade-out-speard-in-leave-active {
  opacity: 0
}

.fade-out-speard-in-leave-active {
  // @include transition(all .3s);
}

.fade-out-speard-in-enter-active {
  @include transition(all .5s ease-in);
}

.fade-out-speard-in-enter {
  @include transform(rotateY(45deg));
}

.navbar {
  position: fixed;
  z-index: 50000;
  top: 0;
  left: 0;
  right: 0;
}

.footer {
  position: relative;
  margin: 0 auto;
  margin-top: 40px;
  max-width: 1170px;
}

</style>
