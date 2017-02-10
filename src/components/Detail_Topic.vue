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

  .ui.container.pusher

    #opener.ui.icon.basic.button(@click="showSidebar", @mouseover="showSidebar")
      i.sidebar.icon
      span.fat-only 議題目錄

    NextStage(v-if = "article.id !== undefined", :article="article")
    h1.ui.huge.header {{article.title}}
    // .ui.basic.segment
    Slide(v-if = "article.id !== undefined", :article="article")
      // video(:style="{'background-image': 'url('+article.cover+')'}")

    .ui.top.attached.three.item.stackable.big.menu
      a.item(v-for="(step, idx) in tabcontent", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        i.icon(v-bind:class="{'info circle': step === '詳細內容','calendar': step === '議題時間軸','comments': step === '參與討論' }")
        p {{step}}
    .ui.segment.attached(v-if = "article.id !== undefined")
      info(v-for="(step, idx) in tabcontent",:article="article", :desc = "step", v-show="idx == myIdx")

  // .thin-only
  //    .ui.container

  //           // .ui.basic.segment
  //           NextStage(v-if = "article.id !== undefined", :article="article")
        

  //           h1.ui.huge.header {{article.title}}

  //           // .ui.basic.segment
  //           Slide(v-if = "article.id !== undefined", :article="article")
  //             // video(:style="{'background-image': 'url('+article.cover+')'}")

  //           .ui.big.steps.top.attached
  //             a.step(v-for="(step, idx) in tabcontent", :class="{'active': idx == myIdx}", @click="myIdx = idx")
  //               i.icon(v-bind:class="{'info circle': step === '詳細內容','calendar': step === '議題時間軸','comments': step === '參與討論' }")
  //               | {{step}}
                
  //           .ui.segment.attached(v-if = "article.id !== undefined")
  //             info(v-for="(step, idx) in tabcontent",:article="article", :desc = "step", v-show="idx == myIdx")      
</template>

<script>


// import axios from 'axios'
import Slide from './Detail_Topic_Slide.vue'
import NextStage from './Detail_Topic_NextStage.vue'
import info from './Detail_info.vue'

export default {
  name: 'Detial_Topic',
  props: ['allTopics'],
  components: {
      NextStage,
      Slide,
      info
  },
  data () {
    return {
      myIdx: 0,
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
     showSidebar:function(){
      $('.ui.left.sidebar').sidebar('show');
      // $('.ui.left.sidebar').next().remove('.ui.left.sidebar'); 
    },
    hideSidebar(){
      $('.ui.left.sidebar').sidebar('hide');
    },
    routename:function(){
      return this.$route.params.tRouteName;
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
  }

}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

// .component {
//   margin: auto;
// }
// .fat-only {
// h1.ui.huge.header {
//   margin: 1em;
//   font-size: 2rem;
// }
// }
// .ui.left.sidebar.inverted.vertical.menu {
#sidebar.sidebar {
  // top: $navHeight;
  // width: 220px;
  text-align: left;
  // .header {
    // font-size:1.2em;
  // }
  // .menu a {
    // font-size: 1em;
  // }
  .menu {
    margin: 0;
    .router-link-active{
      color: white;
      // font-weight: 600;
      // background: rgba(255,255,255,.08);
    }
  }
}

#opener.button {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    // padding: 10px;
    // float:left;
    // overflow: hidden;
    // border-top: none;
    // white-space: nowrap;
    // margin:1px 0 0 0;
}

// .thin-only  { 

//   .ui.steps .step {
//     border-right-width:0;
//   }
//   h1.ui.huge.header {
//     margin-top:0;
//     font-size:1.5rem;
//   }
//   .tab_container {
//     width: 98%;
//   }
//   .ui.big.steps.top.attached {
//     a.step {
//       border-bottom: inherit;
//     }
//   }
// }

</style>
