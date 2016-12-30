<template lang="jade">
  .component    
    .ui.container
      h2.ui.header {{article.title}}
        .sub.header {{article.status}}
      br
      video(controls, :style="{'background-image': 'url('+article.cover+')'}")
      //   source(:src = "https://github.com/g0v/vue.vtaiwan.tw/blob/master/vTaiwan%20v4%20record.mov", type="video/mov")
      br
      .steps
        router-link(v-for="(s,idx) in steps", :to="'/topic/'+$route.params.tRouteName+'/step/'+idx", exact='') {{s}}

      br
    .step(v-if = "$route.params.sId == 0")
      p(v-html = "information")
    .step(v-if = "$route.params.sId == 1")
      //時間軸
      // {{timeline}}
      p(v-html = "timeline")
      .event-list
        .item(v-for = "(ev,idx) in timeline", :class="['dark','gloom','light'][idx % 3]")
          .big 從{{ev.start}}開始 至 {{ev.end}}
          .small 進度
            br
            | {{ ev.title }} | {{ev.link}}
          .null
    .step(v-show="$route.params.sId == 2")
      //iframe from polis
      // .ui.container
      //   .polis(:data-conversation_id=" t.polisId || fooPolisId")
      //   script(async='true', src='https://pol.is/embed.js')
    .step(v-if="$route.params.sId == 3")
      h2 be continued
</template>

<script>

import axios from 'axios'

export default {
  name: 'Detial_Topic',
  props: ['allTopics'],
  data () {
    return {
      steps: ['詳細內容', '議題時間軸', '參與討論', '下一階段'],
      // myS: '詳細內容'
      fooPolisId: '89bzf78kbn',
      fooList: [
        {y: 2016, m:10, d: 8, title: '工作組會議' },
        {y: 2016, m:10, d: 8, title: '工作組會議' },
        {y: 2016, m:10, d: 8, title: '工作組會議' },
        {y: 2016, m:9, d: 30, title: '進入草案階段' },
        {y: 2016, m:8, d: 11, title: '討論爭點出現' }
      ],
      article:{}, // title & status
      information:{}, // 詳細內容
      timeline:[] // 時間軸
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
    // t: function () {
     
    //   // return this.allTopics[this.$route.params.tId] 
    // }

  },
  created:function(){
    console.log("created");
  },

  beforeUpdate:function(){

     axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
     .then((response)=>{
       var detail_info = response.data;
       var content = {};
       

       content = detail_info['post_stream']['posts'][0]['cooked']; // 取得詳細內容(第一篇)
       
       detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容

      //  detail_info = detail_info['post_stream']['posts'][0]['raw'];


       console.log(detail_info);
      //  console.log(detail_info[0]['raw']);

       if(this.timeline.length === 0){
         for(var i in detail_info){
           var timeline_content = {};
           var link = {};
           var links = [];
           timeline_content['title'] = detail_info[i]['raw'].split(" ")[0]; // 進度
           timeline_content['start'] = detail_info[i]['raw'].split(" ")[1]; // 開始日期

           link= detail_info[i]['raw'].split(" ")[2]; // 第二行後連結
           timeline_content['end'] = link.split("\n")[0]; // 結束日期


           for(var i = 1; i < link.split("\n").length; i++ ){
             links.push(link.split("\n")[i]);
           }
           timeline_content['link'] = links; 
           this.timeline.push(timeline_content);
         }
         
       }
      
       console.log(this.timeline);

       content = content.split("<hr>")[1]; // 取第一篇中水平線底下的內容
       this.information = content;
       
       
     })
      
  },
  // watch: {
  //   article: function (newVal, oldVal) { 
  //     console.log('article changed','newVal', newVal, 'oldVal', oldVal)
  //   }
  // }
}

</script>

<style scoped lang="scss">
.component {
  position: relative;
  top: 66px;
}

p {
  text-align: center;
}

video {
  min-width: 80%;
  min-height: 50vh;
  background-color: #ccc;
  background-size: cover;
}

.steps {
  display: inline-flex;
  width: 66vw;
  justify-content: center;
  a {
    flex: 1;
    padding: .5em .5em;
    color: black;
    font-size: 1.2rem;
    line-height: 1.1;
    &:hover, &:active, &.active {
      border-bottom: 2px solid black;
    }
    &.router-link-active {
      border-bottom: 2px solid black;  
    }
  }
}

@media only screen and (max-width: 767px) {
  .steps {
    flex-direction: column;  
    a {
      max-width: 50vw; 
      flex: 1 1 5vh;      
    }      
  }
} 




.event-list {
  display: flex;
  flex-flow: column nowrap;
  .item {
    display: flex;
    text-align: left;
    padding: 1em;
    font-size: 1.2rem;
    &.dark { background-color: #ccc }
    &.gloom { background-color: #ddd }
    &.light { background-color: #eee }
    .big {
      display: flex;
      align-items: center;
      flex: 1 0 6em;
    }
    .small {
      flex: 1 0 6em;
      font-size: 0.8em;
    }
    .null {
      flex: 5 2;
    }
  }
}

/*
.clickDeselectsHull {
  display: none !important;
}*/



</style>
