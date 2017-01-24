<template lang="jade">
    | {{timeline}}
    .event-list
      .item(v-for = "(ev,idx) in timeline", :class="['dark','gloom','light'][idx % 3]")
        .big 從 {{ev.start}} 開始 {{ev.end}}
        .small 
          p 進度  
          p2 {{ ev.title }} 
        .small 
          p 相關連結
          Plink(:urllink="ev.link")
</template>

<script>

import axios from 'axios'
import Plink from './ParticipationLink.vue'

export default {

    props:['article'],
    components:{
        Plink
    },
    data(){
        return{
            timeline:[] // 時間軸
        }
    },
    created:function(){
        axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
        .then((response)=>{
        var detail_info = response.data;
        console.log(detail_info);
        var test = detail_info['post_stream']['posts'];
        detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容
        console.log(test);
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

            if(timeline_content['start'].length > detail_info[i]['raw'].split(regex)[2].length){ // 若為"寫草案" 則無結束日期 僅開始日期
                timeline_content['start'] = timeline_content['start'] + " " + detail_info[i]['raw'].split(regex)[2];
                timeline_content['end'] = null;
            }
            else{
                timeline_content['end'] = "至 "+ detail_info[i]['raw'].split(regex)[2]; // 結束日期
                console.log(detail_info[i]['raw'].split(regex)[2].length);
            }
            if(detail_info[i]['raw'].split(regex)[2].length > 10){
                timeline_content['end'] = null;
            }
            for(var j = 3; j < link.length; j++ ){
                links.push(detail_info[i]['raw'].split(regex)[j]);
            }
            timeline_content['link'] = links; 
            this.timeline.push(timeline_content);
         }        
       }      
     })
    }
}


</script>

<style lang="scss" scoped>

@import "../sass/global.scss";

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
    }
    .small {
      flex: 2 0 6em;
      p {
        font-weight:600;
        margin-bottom: 1.2rem;
      } 
    }
  }
}
@media screen and (min-width:$breakpoint){
  .big {
        flex: 1 0 15em;
  }
}

@media screen and (max-width:$breakpoint){
  .big {
        flex: 1 0 6em;
  }
}


</style>