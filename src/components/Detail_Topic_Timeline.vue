<template lang="jade">

  .component  
  
    .fat-only
      .event-list
        .item(v-for = "(ev,idx) in timeline", :class="['dark','gloom','light'][idx % 3]")
          .big 從 {{ev.start}} 開始 {{ev.end}}
          .small 
            p {{ ev.title }}  
            .title {{ ev.info }}
          .small 
            p 相關連結
            Plink(:urllink="ev.link")

    .thin-only
      .event-list
        .item(v-for = "(ev,idx) in timeline", :class="['dark','gloom','light'][idx % 3]")
          .big 從 {{ev.start}} 開始 {{ev.end}}
          .small 
            p {{ ev.title }}  
            .title {{ ev.info }} 
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
        detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容

          for(var i in detail_info){
            var regex = /(?: (?:init )?)|\n/g; // 用來分開字串
            var date_regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g; //yyyy-mm-dd(ex:2016-10-31)
            var time_regex = /^(2[0-3]|1[0-9]|0[0-9]|[^0-9][0-9]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])$/g; // hh:mm:ss(ex:19:00:00)
            var timeline_content = {}; // 時間軸內容
            var comment = {}; // 暫存處理回覆內容
            var links = []; // 回覆中的連結
            timeline_content['title'] = detail_info[i]['raw'].split(regex)[0]; // 進度
            timeline_content['start'] = detail_info[i]['raw'].split(regex)[1]; // 開始日期

            comment= detail_info[i]['raw'].split(regex); // 每一個議題簡介(第一篇)底下回覆內容

            if(timeline_content['start'].length > detail_info[i]['raw'].split(regex)[2].length){ // 若為"寫草案" 則無結束日期 僅開始日期
                timeline_content['start'] = timeline_content['start'] + " " + detail_info[i]['raw'].split(regex)[2];
                timeline_content['end'] = null;
            }
            else{ // 有結束日期
                timeline_content['end'] = "至 "+ detail_info[i]['raw'].split(regex)[2]; // 結束日期
            }
            if(detail_info[i]['raw'].split(regex)[2].length > 10){ // 無結束日期
                timeline_content['end'] = null;
            }
            for(var j = 1; j < comment.length; j++ ){ // 回覆中的連結處理
                if( comment[j].indexOf("http")>-1){ // 字串含有"http" -> 連結
                  links.push(detail_info[i]['raw'].split(regex)[j]);
                }
                if( comment[j].indexOf("http")==-1 && comment[j].match(date_regex)==null && comment[j].match(time_regex)==null ){ // 字串不符合網址、日期、時間等格式 ->  簡介
                  timeline_content['info'] = comment[j];
                }
            }
            timeline_content['link'] = links; 
            this.timeline.push(timeline_content);
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
    &.dark { background-color: #eeeeee }
    &.gloom { background-color: #f4f4f4 }
    &.light { background-color: #fbfbfb }
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
.fat-only {
  .big {
        flex: 1 0 15em;
  }
}
.thin-only {
  .item {
    padding: 1em 0 1em 0.5em;
     font-size:1.1rem;
    .big {
          flex: 1 0 6em;
    }
  }  
}



</style>