
<template lang="jade">  
div
  div(v-if = "slido_id !== undefined && slido_id.length >0")
    span(v-html="slido_id")
  div(v-if = "polis_id !== undefined && polis_id.length >0") 
    .polis(:data-conversation_id="polis_id")
    script(async='true', src='https://pol.is/embed.js')

   div(v-if = "discourse_id !== undefined && discourse_id >0")
      
        div.container
          h2.ui.header
          i.icon.inverted.circular.blue.comment 
          | Comments
          #discourse-comments
          script.
            var discourseUrl = "https://talk.vtaiwan.tw";
            function showDiscourseTopic(topic) {
              var comments = document.getElementById('discourse-comments');
              var iframe = document.getElementById('discourse-embed-frame');
              if (iframe) { iframe.remove(); }
              iframe = document.createElement('iframe');
              iframe.src = 'https://talk.vtaiwan.tw/embed/comments?topic_id='+topic;
              iframe.id = 'discourse-embed-frame';
              iframe.width = '100%';
              iframe.height = '500px';
              iframe.frameBorder = '0';
              iframe.scrolling = 'yes';
              console.log(iframe);
              comments.appendChild(iframe);
            };
            showDiscourseTopic({{discourse_id}});
        // DiscourseEmbed = { discourseUrl: 'https://talk.vtaiwan.tw/',topicId: 887 };
        // (function() {
        // var d = document.createElement('script'); d.type = 'text/javascript'; d.async = true;
        // d.src = this.DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
        // (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(d);
        // })();       
  
</template>

<script>
import axios from 'axios'
export default {
  props:['article'],
  data () {
    return {
          test:"<iframe src='https://talk.vtaiwan.tw/embed/comments?topic_id=886' id='discourse-embed-frame' width='100%' frameborder='0' scrolling='no' height='4790px'></iframe>",
          polis_id:[],
          slido_id:[],
          discourse_id:[],
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
            else if(detail_info[i]['raw'].split(regex)[j].indexOf("talk.vtaiwan.tw")>-1){
              this.discourse_id=detail_info[i]['raw'].split(regex)[j].replace(/.*\//,"");
              this.discourse_id=887; //test
              console.log(this.discourse_id)
            }
          }      
        }
     })    
  }
}
</script>

<style lang="scss" scoped>
.header{
      text-align: left,
}
.container {
    position: relative;
    max-width: 900px;
    margin: 20px auto 0 auto;
    background-color: #f5f5f5;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    padding-top: 15px;
    padding-bottom: 60px;
    margin-bottom: 30px;
}

</style>