<template lang="jade">
.ui.container

  .ui.left.sidebar.inverted.vertical.menu
    .item(v-for = "(step,idx) in stage")
      .header {{step}}
      .menu
        router-link.item(v-for = "(obj,idx) in allTopics",v-if="step === obj.status",:to="'/topic/' + obj.routeName") {{obj.title}} 

  .pusher
    .fat-only
      .ui.container
      
        // .ui.basic.segment
        button#left-sidebar-toggle
          | show sidebar

        NextStage(v-if = "article.id !== undefined", :article="article")
    
        h1.ui.huge.header {{article.title}}

        // .ui.basic.segment
        Slide(v-if = "article.id !== undefined", :article="article")
          // video(:style="{'background-image': 'url('+article.cover+')'}")

        .ui.big.steps.top.attached
          a.step(v-for="(step, idx) in tabcontent", :class="{'active': idx == myIdx}", @click="myIdx = idx")
            i.icon(v-bind:class="{'info circle': step === '詳細內容','calendar': step === '議題時間軸','comments': step === '參與討論' }")
            | {{step}}
            
        .ui.segment.attached(v-if = "article.id !== undefined")
          info(v-for="(step, idx) in tabcontent",:article="article", :desc = "step", v-show="idx == myIdx")

    .thin-only
      .ui.container

        // .ui.basic.segment
        NextStage(v-if = "article.id !== undefined", :article="article")
    

        h1.ui.huge.header {{article.title}}

        // .ui.basic.segment
        Slide(v-if = "article.id !== undefined", :article="article")
          // video(:style="{'background-image': 'url('+article.cover+')'}")

        .ui.big.steps.top.attached
          a.step(v-for="(step, idx) in tabcontent", :class="{'active': idx == myIdx}", @click="myIdx = idx")
            i.icon(v-bind:class="{'info circle': step === '詳細內容','calendar': step === '議題時間軸','comments': step === '參與討論' }")
            | {{step}}
            
        .ui.segment.attached(v-if = "article.id !== undefined")
          info(v-for="(step, idx) in tabcontent",:article="article", :desc = "step", v-show="idx == myIdx")

</template>

<script>


import axios from 'axios'
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
  methods:{
    // menuClick: function (e){ 
      
    //   $(e.target.parentNode.childNodes).removeClass('is hidden') 
    //   $(e.target).addClass('is show')  
    //   // e.target.classList.add('active') } 
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
  mounted:function() {

    $('.ui.left.sidebar').sidebar({
      dimPage: false,
      transition: 'overlay',
      closable: true,
      scrollLock: true
    });
    $('.ui.left.sidebar').sidebar('attach events','#left-sidebar-toggle');
    

  }
}

</script>

<style lang="scss" scoped>

@import "../sass/global.scss";

.component {
  margin: auto;
}
.ui.left.sidebar{
  top:55px;
}
.fat-only {
  h1.ui.huge.header {
    margin:25px 0 25px 0;
    font-size:2rem;
  }
}
// .pusher {
//   margin-left: -200px;
// }
.thin-only  { 

  .ui.steps .step {
    border-right-width:0;
  }
  h1.ui.huge.header {
    margin-top:0;
    font-size:1.5rem;
  }
  .tab_container {
    width: 98%;
  }
  .ui.big.steps.top.attached {
    a.step {
      border-bottom: inherit;
    }
  }
}

</style>
