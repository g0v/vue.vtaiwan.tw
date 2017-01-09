<template lang="jade">
#app.app
  Navbar.navbar(:routes = "myRoutes", :allTopics = "allTopics")

  #main.main
    transition(name='fade-in', mode='out-in')
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
      catagories: [],
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
    }
  },
  mounted: function(){
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

          tmp['slogan'] = /slogan *: *(.*)/g.exec(firstPost.raw)[1];
          tmp['status'] = (firstPost.id===lastPost.id) ? "即將開始" : lastPost.raw.split(" ")[0];
          if(tmp['status'] === "討論中")
          {
            tmp['progress'] = this.getProgress(lastPost.raw);
            tmp['total'] = this.getTotal(lastPost.raw);
          }

          tmp['owner'] = /@(\w+)/g.exec(firstPost.raw)[1];
          tmp['cover'] = /cover *: *(.*)/g.exec(firstPost.raw)[1];

          this.allTopics.push(tmp);

        })
      })
    })

    axios.get('https://talk.vtaiwan.tw/posts/2094.json?include_raw=1')
    .then((response)=>{
      var configs = response.data.raw.split('\n')
      configs.forEach((config)=>{
        var tmp = {};
        tmp['t'] = config.split(" ")[0];
        tmp['routeName'] = config.split(" ")[1];
        tmp['cover'] = config.split(" ")[2];
        this.catagories.push(tmp);
      })
    })
  }
}

</script>

<style lang="scss" >

@import "./sass/global.scss";

.app {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  @include transition(border-color 0.5s ease);
  &.join {    border-color: $join  }
  &.intro {   border-color: $intro  }
  &.live {    border-color: $live  }
  &.track {   border-color: $track  }
}

.main {
  position: relative;
  top: 0;
  width: 100%;
  text-align: center;
}

// ********************** transition

.fade-in-enter, .fade-in-leave-active {
  opacity: 0
}

.fade-in-leave-active {
  // @include transition(all .3s);
}

.fade-in-enter-active {
  @include transition(all .5s ease-in);
}

.fade-in-enter {
  // @include transform(rotateY(45deg));
}

// ********************** 

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
