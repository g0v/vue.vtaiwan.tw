<template lang="jade">
  .component
    .ui.container

      .ui.basic.segment
        NextStage(v-if = "article.id !== undefined", :article="article")
      // br
      // br

      h1.ui.huge.header {{article.title}}

      .ui.basic.segment
        Slide(v-if = "article.id !== undefined", :article="article")
        // video(:style="{'background-image': 'url('+article.cover+')'}")
      // br

      .ui.big.steps.top.attached
        a.step(v-for="(step, idx) in tabcontent", :class="{'active': idx == myIdx}", @click="myIdx = idx")
         .lable
          // .fa(v-bind:class="{'fa-info-circle': step === '詳細內容','fa-calendar': step === '議題時間軸','fa-users': step === '參與討論' }")
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
      article:{}, // title 
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
  }
}

</script>

<style lang="scss" scoped>

@import "../sass/global.scss";
// @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

.component {
  // padding-top: $navHeight;
  // position: relative;
  // max-width: $comp_max_width;
  margin: auto;
}
.ui.container {
  // width:100%;
}

.ui.medium.header {
  // color:#db2828;
}

label {
  // font-weight: 700;
  // font-size: 18px;
  // display: block;
  // float: left;
  // width: 33.33%;
  // padding: 1.5em;
  // color: #1b1c1d;
  // cursor: pointer;
  // text-decoration: none;
  // text-align: center;
  // background: #f0f0f0;
  // .fa{
  //   font-size: 1.3em;
  //   margin: 0 0.4em 0 0;
  // }
}
// .fa {
//   padding-right:0.3rem;
// }

@media screen and (min-width: $breakpoint){ 
  // .ui.huge.header {
  //   font-family: $main_font;
  //   font-size:2.5em;
  // }
  // .ui.segment.attached{
  //   border-top:1px solid rgba(34,36,38,.15);
  // }
}
@media screen and (max-width: $breakpoint) { // 小於ipad尺寸
  .component {
    // width:98%;
  }
  .ui.steps .step {
    border-right-width:0;
  }
  label {
    // display: none;
    // padding: 1em;
    // span {
      // font-size: 0.8em;
    // }
    // .fa {
    //   display: block;
    //   margin: 0;
    // }
  }
  .ui.huge.header {
    // font-family: $main_font;
    // font-size:2.2em;
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
