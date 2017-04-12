<template lang="jade">
.component.pushable

  #sidebar.ui.left.inverted.vertical.menu.sidebar(@mouseleave="hideSidebar")
    .item(v-for = "(step,idx) in stage")
      .header 
        p {{step}} 
      .menu
        router-link.item(v-for = "(obj,idx) in allTopics",
                        v-if="step === obj.status",
                        :to="'/topic/' + obj.routeName",
                        :class="{'router-link-active': obj.routeName === routename }",
                        @click="routename = obj.routeName") 
          p {{obj.title}}   

  #opener.fat-only(@mouseover="showSidebar")

  #pusher.ui.container.pusher

    NextStage(v-if = "article.id !== undefined", :article="article")
    
    h1.ui.centered.header 
      sup
        i.quote.left.icon
      | {{article.title}} 
      sub
        i.quote.right.icon
    
    Slide(v-if = "article.id !== undefined", :article="article")
      // video(:style="{'background-image': 'url('+article.cover+')'}")

    .ui.three.item.big.menu
      router-link.item(v-for="(step, idx) in tabcontent", :to="$route.path+hashName(idx)", :class="{'active':idx===myIdx}", @click="myIdx=idx")
        i.icon(v-bind:class="{'info circle': step == '詳細內容','calendar': step == '議題時間軸','comments': step == '參與討論','history': step == '歷史案件','university': step =='院會討論'}")
        p.fat-only {{step}} 

    .info(v-if = "article.id !== undefined")
      transition(name='fade', mode='out-in')
        Description(v-if="myIdx === 0", :article="article")
        Timeline(v-if="myIdx === hashIdx('#time')", :article="article")
        Discussion(v-if="myIdx === hashIdx('#disc')", :article="article")

</template>

<script>

import Slide from './Detail_Topic_Slide.vue'
import NextStage from './Detail_Topic_NextStage.vue'
import Description from './Detail_Topic_Description.vue'
import Discussion from './Detail_Topic_Discussion.vue'
import Timeline from './Detail_Topic_Timeline.vue'

export default {
  name: 'Detial_Topic',
  props: ['allTopics'],
  components: {
      NextStage,
      Slide,
      Description,
      Discussion,
      Timeline,
  },
  data () {
    return {
      tabcontent:["詳細內容","議題時間軸"],
      stage:["即將開始","意見徵集","研擬草案","送交院會","歷史案件"],
      tabList: [
        '#desc',
        '#time',
        '#disc'
      ]
    }
  },
  computed: {
    myIdx: function () {
      /* return 0 when hash is empty (-1) */
      if(this.$route.hash)
        return this.hashIdx(this.$route.hash)
      else
        return 0
    },
    article:function(){
      var rtName = this.$route.params.tRouteName;
      var t = this.allTopics.filter( (o)=> {
        return o.routeName == rtName;
      })[0];
      if(t===undefined){return new Object()}
      else{return t};
    }
  },
  methods:{
    showSidebar:function(){
      $('.ui.left.sidebar').sidebar('show');
    },
    hideSidebar:function(){
      $('.ui.left.sidebar').sidebar('hide');
    },
    routename:function(){
      return this.$route.params.tRouteName;
    },
    status_modify:function(status){
      if(status =="歷史案件"){
        this.tabcontent[2] = "歷史案件";
        return this.tabcontent;
      }
      if(status == "送交院會"){
        this.tabcontent[2] = "院會討論";
        return this.tabcontent;
      }
      if(status == "即將開始" || status == "意見徵集" || status == "研擬草案"){
        this.tabcontent[2] ="參與討論";
        return this.tabcontent;
      }
    },
    hashIdx: function(hash){
      return this.tabList.indexOf(hash)
    },
    hashName: function(idx){
      return this.tabList[idx]
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
    }).sidebar('attach events', '#sidebar .menu')
  },
  watch:{
    article:function(){
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
    } 
  },
  created:function(){
     this.status_modify(this.article.status);
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

#sidebar.sidebar {
  text-align: left;
  .menu {
    margin: 0;
    .router-link-active{
      color: white;
    }
  }
}

#opener {
  height: 100%;
  width: 1ch;
  background: #1B1C1D; /* the color of sidebar */
  position: fixed;
  left: 0;
  z-index: 100;
}

.ui.top.menu {
  width: 100%;
}

#pusher{
  min-height:90vh;
  padding-bottom: 1em;
}

</style>
