
<template lang="jade">  
div
  div(v-if = "slido_id !== undefined && slido_id.length >0")
    span(v-html="slido_id")
  div(v-if = "polis_id !== undefined && polis_id.length >0") 
    .polis(:data-conversation_id="polis_id")
    script(async='true', src='https://pol.is/embed.js')
  div(v-if = "discourse_id !== undefined && discourse_id.length >0")
  #discourse-comments
  script.
   DiscourseEmbed = { discourseUrl: 'https://talk.vtaiwan.tw/',topicId: 887 };
      (function() {
      var d = document.createElement('script'); d.type = 'text/javascript'; d.async = true;
      d.src = this.DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
      (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(d);
      })();
  
    // DiscourseEmbed = { discourseUrl: 'https://talk.pdis.nat.gov.tw/',topicId: 17 };
</template>

<script>
import axios from 'axios'
export default {
  props:['article'],
  data () {
    return {
          polis_id:[],
          slido_id:[],
          discourse_id:[],
          dd:"<iframe src='https://app.sli.do/event/m35dexjd' frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>",
          gg:"https://app.sli.do/event/m35dexjd",
    }
  },
  created:function(){
    
   
    axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
     .then((response)=>{
       var detail_info = response.data;
       detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容
      
        for(var i in detail_info){
          var regex = /(?: (?:init )?)|\n/g;
          var link = {};

          link = detail_info[i]['raw'].split(regex); // 連結集合

          for(var j = 3; j < link.length; j++ ){
            if(detail_info[i]['raw'].split(regex)[j].indexOf("pol.is")>-1){ //篩出含有polis的連結  
              this.polis_id = detail_info[i]['raw'].split(regex)[j].replace(/.*\//,"");
            }
            else if(detail_info[i]['raw'].split(regex)[j].indexOf("sli.do")>-1){ //篩出含有slido的連結    
               this.slido_id="<iframe src="+detail_info[i]['raw'].split(regex)[j]+ "frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>";
               //測試
               //this.slido_id="<iframe src='https://app.sli.do/event/m35dexjd' frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>";
            }
       }       
            
     }
     
     })    
  }
}
</script>

<style lang="scss" scoped>
</style>