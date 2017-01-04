<template lang="jade">
  .component    
    .ui.container
      h2.ui.header {{article.title}}
        .sub.header {{article.status}}
      br
      video(controls, :style="{'background-image': 'url('+article.cover+')'}")
        // source(:src = "https://github.com/g0v/vue.vtaiwan.tw/blob/master/vTaiwan%20v4%20record.mov", type="video/mov")
      br
      .steps
        router-link(v-for="(s,idx) in steps", :to="'/topic/'+$route.params.tRouteName+'/step/'+idx", exact='') {{s}}

      br
      //詳細內容
    .step(v-if = "$route.params.sId == 0 && article.id !== undefined") 
      Description(:article="article")
      //時間軸
    .step(v-if = "$route.params.sId == 1 && article.id !== undefined")
      br
      Timeline(:article="article")
    // 參與討論
    .step(v-if="$route.params.sId == 2 && article.id !== undefined")
      {{timeline}}
      {{polis_link}}
      Discussion(:urllink="polis_link")
      //iframe from polis
      // .ui.container
      //   .polis(:data-conversation_id=" t.polisId || fooPolisId")
      //   script(async='true', src='https://pol.is/embed.js')
    // 下一階段
    .step(v-if="$route.params.sId == 3")
      h2 be continued
</template>

<script>

import axios from 'axios'
import Description from './Detail_Topic_Description.vue'
import Discussion from './Detail_Topic_Discussion.vue'
import Timeline from './Detail_Topic_Timeline.vue'


export default {
  name: 'Detial_Topic',
  props: ['allTopics'],
  components: {
      Description,
      Discussion,
      Timeline
  },
  data () {
    return {
      steps: ['詳細內容', '議題時間軸', '參與討論', '下一階段'],
      // myS: '詳細內容'
      fooPolisId: '89bzf78kbn',
      article:{}, // title & status
      information:{}, // 詳細內容
      timeline:[], // 時間軸
      polis_link:[] // polis連結
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
  created:function(){
    console.log("created");
  },
  beforeUpdate:function(){

     axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
     .then((response)=>{
       var detail_info = response.data;

       detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容

       if(this.timeline.length === 0){
         for(var i in detail_info){
           var regex = /(?: (?:init )?)|\n/g;
           var timeline_content = {};
           var link = {};
           var links = [];
           var polis = {};
           timeline_content['title'] = detail_info[i]['raw'].split(regex)[0]; // 進度
           timeline_content['start'] = detail_info[i]['raw'].split(regex)[1]; // 開始日期

           link= detail_info[i]['raw'].split(regex); // 第二行後連結
           console.log(detail_info[i]['raw'].split(regex,3));
           if(timeline_content['start'].length <detail_info[i]['raw'].split(regex)[2].length){ // 若為"寫草案" 則無結束日期 僅開始日期
             timeline_content['start'] = timeline_content['start'] + " " + detail_info[i]['raw'].split(regex)[2];
             timeline_content['end'] = null;
           }
           else{
             timeline_content['end'] = "至"+ detail_info[i]['raw'].split(regex)[2]; // 結束日期
           }
           
           for(var j = 3; j < link.length; j++ ){
             if(detail_info[i]['raw'].split(regex)[j].indexOf("pol.is")>-1){
               
               polis =  "polis"+detail_info[i]['raw'].split(regex)[j];
               this.polis_link.push(polis);
             } 
             links.push(detail_info[i]['raw'].split(regex)[j]);
           }
           timeline_content['link'] = links;
          //  timeline_content['polis'] = polis;
           console.log(this.polis_link); 
           this.timeline.push(timeline_content);
         }
         
       }

       
       
     })
      
  },
  watch:{
    
  }
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
  // justify-content: center;
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
      flex: 2 0 6em;
      font-size: 1.0em;
    }
    .null {
      flex: 4 2;
    }
  }
}

/*
.clickDeselectsHull {
  display: none !important;
}*/



</style>
