<template lang="jade">
.component.pushable

  .sidebar.ui.left.inverted.vertical.menu(@mouseleave="showSidebar('hide')")
    .item(v-for = "(step,idx) in stage")
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

    NextStage(v-if = "article.id !== undefined", :article="article")

    h1.ui.centered.header.segment.basic(v-if = "article.id !== undefined")
      | {{article.title}}

    Slide(v-if="article.id !== undefined", :articleId="article.id", :link='tabcontent[2] && tabs(getHash("disc"))')

    #anchor.ui.container

      .buttonMenu.ui.big.secondary.pointing.menu.segment.basic(v-if = "article.id")
        router-link.item(v-for="(step, idx) in tabcontent", :to="tabs(idx)", replace, :class="{'active':idx === tabIndex}", :title='step', v-if='step')
          i.icon(:class="{'info circle': step == '詳細內容','calendar': step == '時程與相關連結','comments': step == '參與討論','history': step == '歷史案件','university': step =='院會討論'}")
          p.fat-only {{step}}

      .information(v-if = "article.id")
        transition(name='fade', mode='out-in')
          component(:is='tabList[tabIndex]', :articleId="article.id", :class='tabList[tabIndex]')

</template>

<script>

import Slide from './Detail_Topic_Slide.vue'
import NextStage from './Detail_Topic_NextStage.vue'
import Description from './Detail_Topic_Description.vue'
import Discussion from './Detail_Topic_Discussion.vue'
import Timeline from './Detail_Topic_Timeline.vue'

export default {
  name: 'Detial_Topic',
  props:['allTopics', 'catagories','allNews','allInfo'],
  // props: ['allTopics'],
  components: {
      NextStage,
      Slide,
      Description,
      Discussion,
      Timeline,
  },
  data () {
    return {
      tabcontent:[null,"時程與相關連結",null],
      stage:["即將開始","意見徵集","研擬草案","送交院會","歷史案件"],
      hashList: [
        'desc',
        'time',
        'disc'
      ],
      tabList: [
        'Description',
        'Timeline',
        'Discussion'
      ],
      tabIndex: 1
    }
  },
  computed: {
    article:function(){
      var rtName = this.$route.params.tRouteName;
      var t = this.allTopics.filter((o) => o.routeName == rtName)[0];
      return t || new Object()
    },
  },
  methods:{
    showSidebar:function(param){
      if (param === 'hide') {
        $('.ui.left.sidebar').sidebar('hide');
      }
      else {
        $('.ui.left.sidebar').sidebar('show');
      }
    },
    status_modify:function(status){
      if(status == "即將開始" || status =="歷史案件" || status == "送交院會"){
        this.tabcontent[2] = null;
      }
      else if(status == "意見徵集" || status == "研擬草案"){
        this.tabcontent[2] ="參與討論";
      }
    },
    getHash: function(param) {
      /* return #hash index, or #hash, or default index */
      if (param && typeof param === 'string') {
        return this.hashList.indexOf(param)
      }
      else {
        return this.hashList[param] || this.$options.data().tabIndex
      }
    },
    tabs: function (idx) {
      /* FIX ME: please drop-out strings of hashList appear in the path */
      return this.$route.path.replace(/\/(desc|time|disc)$/,'') + '/' + this.hashList[idx]
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
  },
  watch:{
    $route: function(){
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

      this.status_modify(this.article.status);
      this.tabIndex = this.getHash(this.$route.params.tab)
    },
  },
  created:function(){
      this.status_modify(this.article.status);
      this.tabIndex = this.getHash(this.$route.params.tab)
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
