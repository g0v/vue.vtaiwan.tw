<template lang="jade">
.component.pushable

  .sidebar.ui.left.inverted.vertical.menu(@mouseleave="showSidebar('hide')")
    .item(v-for = "(step,idx) in stages")
      .header
        p {{step}}
      .menu
        router-link.item(v-for = "(obj,idx) in allTopics",
          v-if="step === obj.status",
          :to="'/topic/' + obj.routeName",
          :class="{'router-link-active': obj.routeName === $route.params.tRouteName }")
          p {{obj.title}}

  .opener.fat-only(@mouseover="showSidebar")

  .pusher

    NextStage(v-if = "article.id", :article="article")

    h1.ui.centered.header.segment.basic(v-if = "article.id")
      | {{article.title}}

    //- Slide(v-if="article.id", :articleId="article.id", :link='tabcontent[2] && hashList[getHash("disc")]')
    Slide(v-if="article.id", :articleId="article.id", :link='status && hashList[2]')

    .ui.container

      .buttonMenu.ui.big.secondary.pointing.menu.segment.basic(v-if = "article.id")
        //- router-link.item(v-for="(step, idx) in tabcontent", :to="hashList[idx]", replace, :class="{'active':idx === tabIndex}", :title='step', v-if='step')
        router-link#time.item(:to='"#time"', :class="{'active': 1 === tabIndex}", title='timeline')
          i.icon.calendar
          p.fat-only 時程與相關連結
        router-link#disc.item(:to='"#disc"', :class="{'active': 2 === tabIndex}", title='discussion', v-if='status')
          i.icon.comments
          p.fat-only 參與討論

      .information(v-if = "article.id")
        transition(name='fade', mode='out-in')
          component(:is='tabList[tabIndex]', :articleId="article.id", :class='tabList[tabIndex]')

</template>

<script>

import Slide from './Detail_Topic_Slide.vue'
import NextStage from './Detail_Topic_NextStage.vue'
// import Description from './Detail_Topic_Description.vue'
import Discussion from './Detail_Topic_Discussion.vue'
import Timeline from './Detail_Topic_Timeline.vue'

export default {
  name: 'Detial_Topic',
  props:['allTopics', 'catagories','allNews','allInfo', 'tRouteName'],
  components: {
      NextStage,
      Slide,
      // Description,
      Discussion,
      Timeline,
  },
  data () {
    return {
      // tabcontent:[null,"時程與相關連結", "參與討論"],
      stages:["即將開始","意見徵集","研擬草案","送交院會","歷史案件"],
      hashList: [
        '#desc',
        '#time',
        '#disc'
      ],
      tabList: [
        'Description',
        'Timeline',
        'Discussion'
      ],
      tabIndex: 1,
      topic: this.$route.params.tRouteName
    }
  },
  computed: {
    article:function(){
      let t = this.allTopics.filter((o) => o.routeName == this.$route.params.tRouteName);
      return t[0] || new Object()
    },
    status: function () {
      let stage = this.stages.indexOf(this.article.status)
      if (stage > -1) {
        if (stage === 1 || stage === 2 ) {
          return true
        }
      }
      else
        return false
    }
  },
  methods:{
    showSidebar:function(param){
      $('.ui.left.sidebar').sidebar((param === 'hide') ? 'hide' : 'show')
    },
    status_modify:function(article){
      // console.log(article)
      // let status = article.status
      // if(status == "即將開始" || status =="歷史案件" || status == "送交院會"){
      //   this.tabcontent[2] = null;
      // }
      // else if(status == "意見徵集" || status == "研擬草案"){
      //   this.tabcontent[2] ="參與討論";
      // }

      if (this.$route.hash) {
        console.log(this.$route.hash)
        this.tabIndex = this.getHash(this.$route.hash)
      }

      /* change meta title & image */
      var meta_img = document.createElement('meta');
      meta_img.setAttribute("property", "og:image");
      meta_img.content = this.article.cover;
      $('meta[property="og:image"]').remove();
      document.getElementsByTagName('head')[0].appendChild(meta_img);
      var meta_title = document.createElement('meta');
      meta_title.setAttribute("property", "og:title");
      meta_title.content = this.article.title + " - vTaiwan.tw";
      $('meta[property="og:title"]').remove();
      document.getElementsByTagName('head')[0].appendChild(meta_title);

    },
    getHash: function(param) {
      /* return #hash index, or #hash, or default index */
      if (param && typeof param === 'string') {
        return this.hashList.indexOf(param) || this.$options.data().tabIndex
      }
      else {
        return this.hashList[param] || this.$options.data().tabIndex
      }
    }
  },
  mounted:function(){
    $('.ui.left.sidebar').sidebar({
        context: $('.pushable'),
        dimPage: false,
        transition: 'overlay',
        mobileTransition: 'overlay',
        // scrollLock: true,
        delaySetup: true
    }).sidebar('attach events', '.sidebar .menu')

    /* boot */
    this.status_modify(this.article)
  },
  watch:{
    '$route': function () {
      this.status_modify(this.article)
    }
  },
  created:function(){
    // console.log(this.$route.params.tRouteName)
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.ui.sidebar {
  text-align: left;
  .menu {
    margin: 0 !important;
    .router-link-active{
      color: white;
    }
  }
}

.opener {
  height: 100%;
  width: 1ch;
  background: #1B1C1D; /* the color of sidebar */
  position: fixed;
  left: 0;
  z-index: 100;
  &::after {
    content: '其它提案';
    word-wrap: break-word;
    width: 3ch;
    padding: 1em 5px;
    position: fixed;
    top: 2em;
    left: 1ch;
    color: white;
    background: #1B1C1D;
  }
}

.pusher{
  min-height:90vh;
  padding-bottom: 1em;
}

.information {
  min-height: 10em;
}

.buttonMenu {
  justify-content: center;
  border: 0 !important;
}
</style>
