<template lang="jade">
#app.app
  Navbar(:routes = "myRoutes", :allTopics = "allTopics")

  // #test0 test jQuery

  #main.main
    transition(name='fade', mode='out-in')
      router-view.view(:allTopics="allTopics", :catagories="catagories", :allNews="allNews")

  MyFooter.footer
</template>

<script>

import Navbar from './components/app_navbar.vue'
import MyFooter from './components/MyFooter.vue'
import caxios from './js/request'

// import $ from 'jquery'
// import jQuery from 'jquery'
// window.jQuery = jQuery

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
        // {en:'Login', t:'登入',r:'login'},
      ],
      catagories: [],
      allTopics: [],
      allNews: []
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
      // var regex = /(?: (?:init )?)|\n/g;
      // var start = new Date(raw.split(regex)[1]+"T00:00:00+08:00");
      // var end = new Date(raw.split(regex)[2]+"T00:00:00+08:00");
      let re = /[0-9]+-[0-9]+-[0-9]+(\s[0-9]+:[0-9]+:[0-9]*)?/g
      let start = new Date(raw.match(re)[0])
      let end = new Date(raw.match(re)[1] || raw.match(re)[0])
      var now = new Date();
      if (now > end) {
        return (end - start)/(24*60*60*1000); /* Math.floor? */
      }
      else{
        return (now - start)/(24*60*60*1000);
      }
    },
    getTotal(raw) {
      // var regex = /(?: (?:init )?)|\n/g;
      // var start = new Date(raw.split(regex)[1]+"T00:00:00+08:00");
      // var end = new Date(raw.split(regex)[2]+"T00:00:00+08:00");
      let re = /[0-9]+-[0-9]+-[0-9]+(\s[0-9]+:[0-9]+:[0-9]*)?/g
      let start = new Date(raw.match(re)[0])
      let end = new Date(raw.match(re)[1] || raw.match(re)[0])
      return (end - start)/(24*60*60*1000)
    }
  },
  mounted: function(){
    // $('#test0').hide(); // tester

    caxios.get('https://talk.vtaiwan.tw/c/meta-data.json')
    .then((response)=>{
      var topics = response.data.topic_list.topics.slice(1);
      topics.forEach((topic)=>{
        caxios.get('https://talk.vtaiwan.tw/t/'+topic.id+'.json?include_raw=1')
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
          if(tmp['status'] === "意見徵集")
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

    caxios.get('https://talk.vtaiwan.tw/posts/2094.json?include_raw=1')
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

    caxios.get('https://talk.vtaiwan.tw/t/facebook/1249/last.json?include_raw=1') //news
    .then((response)=>{
      var news = response.data;
      news = news['post_stream']['posts'].slice(1);
      
      news.forEach((post)=>{
        var tmp = {};
        var tag = {};
        var tags = [];
        post = post['raw'].split("<br>");
        tmp['title'] = post[1];
        tmp['content'] = post[3];
        tmp['img_link'] = post[5];
        tmp['source'] = post[7];
        if(post[9]!=""){
          tag = post[9].split("\n")[0].replace(/，|#/g," ");
          tag = tag.split(" ");
          for(var i in tag){
            if(tag[i]!=""){
              tags.push(tag[i]);
            }
          }
        }
        tmp['tags'] = tags;
        tmp['news_link'] = post[11];
        tmp['source_link'] = post[11].split("/")[2];
        tmp['setup_time'] = post[13];
        this.allNews.push(tmp);
      })
      console.log(this.allNews);
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

.navbar {
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  right: 0;
}

.footer {
  position: relative;
  margin: 0 auto;
  // margin-top: 40px;
  max-width: 100%;
}

</style>
