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

    //- #opener.ui.icon.basic.button.fat-only(@mouseover="showSidebar")
    //-   i.sidebar.icon
    //-   span 議題目錄

    NextStage(v-if = "article.id !== undefined", :article="article")

    h1.ui.centered.header {{article.title}}
    
    Slide(v-if = "article.id !== undefined", :article="article")
      // video(:style="{'background-image': 'url('+article.cover+')'}")

    .ui.three.item.big.menu
      a.item(v-for="(step, idx) in tabcontent", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        i.icon(v-bind:class="{'info circle': step == '詳細內容','calendar': step == '議題時間軸','comments': step == '參與討論','history': step == '歷史案件'}")
        p.fat-only {{step}} 

    .info(v-if = "article.id !== undefined")
      transition(name='fade', mode='out-in')
        //- info(v-for="(step, idx) in tabcontent", :article="article", :desc = "step", v-if="idx == myIdx")
        Description(v-if="myIdx === 0", :article="article")
        Timeline(v-if="myIdx === 1", :article="article")
        Discussion(v-if="myIdx === 2", :article="article")

</template>

<script>
// import axios from 'axios'
import Slide from './Detail_Topic_Slide.vue'
import NextStage from './Detail_Topic_NextStage.vue'
// import info from './Detail_info.vue'
import Description from './Detail_Topic_Description.vue'
import Discussion from './Detail_Topic_Discussion.vue'
import Timeline from './Detail_Topic_Timeline.vue'

export default {
  name: 'Detial_Topic',
  props: ['allTopics'],
  components: {
      NextStage,
      Slide,
      // info,
      Description,
      Discussion,
      Timeline,
  },
  data () {
    return {
      myIdx: 0, /* default page */
      tabcontent:["詳細內容","議題時間軸","參與討論"],
      stage:["即將開始","意見徵集","研擬草案","送交院會","歷史案件"]
    }
  },
  computed: {
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
    // accordion:function(){
    //   $('.ui.accordion').accordion();
    // },
    showSidebar:function(){
      $('.ui.left.sidebar').sidebar('show');
      // $('.ui.left.sidebar').next().remove('.ui.left.sidebar'); 
    },
    hideSidebar:function(){
      $('.ui.left.sidebar').sidebar('hide');
    },
    routename:function(){
      return this.$route.params.tRouteName;
    },
    history_case:function(status){
      if(status =="歷史案件"){
        this.tabcontent[2] = "歷史案件";
        return this.tabcontent;
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
    }
    
  },
  created: function(){
    this.history_case(this.article.status);
  },
  updated:function(){
    this.history_case(this.article.status);
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

// @media only screen and (min-width: $breakpoint) {
//     .ui.huge.header{
//       font-size: 1.2rem;
//     }
// }
// @media only screen and (max-width: $breakpoint) {
//     .ui.huge.header{
//       font-size: 2.2rem;
//     }
// }
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
// #opener.button {
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 100;
// }

.ui.top.menu {
  width: 100%;
}

#pusher{
  min-height:90vh;
  padding-bottom: 1em;
}
// .ui.styled.accordion{
//   margin-bottom: 1em;
// }
// .ui.styled.accordion .title {
//   font-size: 1.5rem;
// }
</style>
