<template lang="jade"> 
 {{timeline}}
 .event-list
  .item(v-for = "(ev,idx) in timeline", :class="['dark','gloom','light'][idx % 3]")
    .big 從 {{ev.start}} 開始 {{ev.end}}
    .small 進度
      br
      br  
      | {{ ev.title }} 
    .small 相關連結
      br
      br
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
            timeline:[], // 時間軸
            polis_link:[] // polis連結
        }
    },
    created:function(){
        axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
        .then((response)=>{
        var detail_info = response.data;
        console.log(detail_info);
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
            this.timeline.push(timeline_content);
         }        
       }      
     })
    }
}


</script>

<style lang="scss" scoped>

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



</style>