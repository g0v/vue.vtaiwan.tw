<template lang="jade">
#app.app
  Navbar.navbar(:routes = "myRoutes", :allTopics = "allTopics")

  #main.main
    transition(name='fade-out-speard-in', mode='out-in')
      router-view.view(:allTopics="allTopics", :catagories="catagories")

  MyFooter.footer
</template>

<script>

import Navbar from './components/app_Navbar.vue'
import MyFooter from './components/MyFooter.vue'
import axios from 'axios'

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
        {t: '科技', routeName: 'technology'},
        {t: '文化', routeName: 'culture'},
        {t: '教育', routeName: 'education'},
        {t: '勞動', routeName: 'labor'},
        {t: '社會', routeName: 'social_policy'},
        {t: '農業', routeName: 'agriculture'},
        {t: '工業', routeName: 'industry'},
        {t: '商業', routeName: 'commerce'},
        {t: '生態', routeName: 'ecology'},
        {t: '經濟', routeName: 'economy'},
        {t: '財稅', routeName: 'tax'},
        {t: '交通', routeName: 'transport'},
        {t: '健康', routeName: 'health_care'},
        {t: '體育', routeName: 'sports', 
          cover: 'http://lorempixel.com/320/240/sports'},
      ],
      allTopics: []
    }
  },
  methods: {
    pure(path) {
      var obj = this.myRoutes.filter((o) => {
        return '/'+o.r == path;
      })[0]
      return obj ? obj.r : ''
    },
    getSlogan(raw) {
      var myRegexp = /slogan *: *(.*)/g;
      var match = myRegexp.exec(raw)
      return match[1];
    },
    getProgress(raw) {
      var regex = /(?: (?:init )?)|\n/g;
      var start = new Date(raw.split(regex)[1]+"T00:00:00+08:00");
      var end = new Date(raw.split(regex)[2]+"T00:00:00+08:00");
      var now = new Date();
      if (now > end) {
        return (end - start)/(24*60*60*1000);
      }
      else{
        return (now - start)/(24*60*60*1000);
      }
    },
    getTotal(raw) {
      var regex = /(?: (?:init )?)|\n/g;
      var start = new Date(raw.split(regex)[1]+"T00:00:00+08:00");
      var end = new Date(raw.split(regex)[2]+"T00:00:00+08:00");
      return (end - start)/(24*60*60*1000)
    },
    getOwner(raw) {
      var regex = /@(\w+)/g;
      var match = regex.exec(raw);
      return match[1];
    },
    getCover(raw){
      var myRegexp = /cover *: *(.*)/g;
      var match = myRegexp.exec(raw)
      return match[1];
    }
  },
  created: function(){
    axios.get('https://talk.vtaiwan.tw/c/meta-data.json')
    .then((response)=>{
      var topics = response.data.topic_list.topics.slice(1);
      topics.forEach((topic)=>{
        axios.get('https://talk.vtaiwan.tw/t/'+topic.id+'.json?include_raw=1')
        .then((response)=>{
          var topic = response.data;

          var tmp = {};

          tmp['id'] = topic['id'];
          tmp['routeName'] = topic['title'].split(" ")[1];
          tmp['title'] = topic['title'].split(" ")[0];
          tmp['catas'] = topic['tags'];
          tmp['likes'] = 0 ;

          var firstPost = topic.post_stream.posts[0];
          var lastPost = topic.post_stream.posts.slice(-1)[0]; 

          tmp['slogan'] = this.getSlogan(firstPost.raw);
          tmp['status'] = lastPost.raw.split(" ")[0];
          if(tmp['status'] === "討論中")
          {
            tmp['progress'] = this.getProgress(lastPost.raw);
            tmp['total'] = this.getTotal(lastPost.raw);
          }
          tmp['owner'] = this.getOwner(firstPost.raw);
          tmp['cover'] = this.getCover(firstPost.raw);
          // console.log(tmp);
          this.allTopics.push(tmp);
        })
      })
    })
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

strong {
  font-weight: 900;
  color: black;
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
