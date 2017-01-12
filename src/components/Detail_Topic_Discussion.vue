
<template lang="jade">  
div.textleft
  div(v-if = "slido_id !== undefined && slido_id.length >0")
    span(v-html="slido_id")

  div(v-if = "polis_id !== undefined && polis_id.length >0") 
    .polis(:data-conversation_id="polis_id")
    script(async='true', src='https://pol.is/embed.js')

  div(v-if = "discourse_id !== undefined && discourse_id >0")
    //Discussion_Comment       
    div(v-for = "(item, index) in discourse_title")
      .ui.accordion(style="display: block;")
        div(v-if = "index==0")
          .active.title
            i.dropdown.icon  
            |{{discourse_title[index].title}} 
          .active.content
            Discussion_Comment(:comment_id="discourse_title[index].id")
        div(v-if = "index!=0")
          .title
            i.dropdown.icon  
            |{{discourse_title[index].title}} 
          .content
            Discussion_Comment(:comment_id="discourse_title[index].id")
    script.
      $('.ui.accordion').accordion();  

  
  
</template>

<script>
import axios from 'axios'
import Discussion_Comment from './Detail_Topic_Discussion_Comment.vue'


export default {
  props:['article'],
  components: {
      Discussion_Comment,
  },
  data () {
    return {
          test:"<iframe src='https://talk.vtaiwan.tw/embed/comments?topic_id=886' id='discourse-embed-frame' width='100%' frameborder='0' scrolling='no' height='4790px'></iframe>",
          polis_id:[],
          slido_id:[],
          discourse_id:[],
          discourse_title:[],
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
              //this.discourse_id=detail_info[i]['raw'].split(regex)[j].replace(/.*\//,"");
              //this.discourse_id=887; //test
              console.log( this.discourse_id=detail_info[i]['raw'].split(regex)[j])
              axios.get(this.discourse_id=detail_info[i]['raw'].split(regex)[j] +'.json')
              .then((response_discourse)=>{

                var title = response_discourse.data.topic_list.topics;
                for(i=0;i<title.length;i++){
                  this.discourse_title[i] = title[i]
                }
                console.log( this.discourse_title);
                this.discourse_id=887;
                
              })
            }
          }      
        }
     })    
  },
 
  // updated:function(){

  //    // $('.ui.accordion').accordion('close all');    
  //     $('.ui.accordion').accordion();  

  // }
}
</script>

<style lang="scss" scoped>
.textleft{
  text-align: left;
}

</style>