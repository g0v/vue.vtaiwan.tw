
<template lang="jade">  
.component.textleft
  div(v-if = "slido_id !== undefined && slido_id.length >0")
    span(v-html="slido_id")

  div(v-if = "polis_id !== undefined && polis_id.length >0") 
    .polis(:data-conversation_id="polis_id")
    script(async='true', src='https://pol.is/embed.js')

  div.commentboxall(v-if = "discourse_id !== undefined && discourse_id >0")
    //Discussion_Comment       
    div(v-for = "(item, index) in discourse_title")
      .ui.accordion(style="display: block;")
        div.commentbox(v-if = "index==0")
          .active.title
            i.dropdown.icon  
            |{{discourse_title[index].title}}
            .line 
          .active.content
            Discussion_Comment(:comment_id="discourse_title[index].id")
        div.commentbox(v-if = "index!=0")
          .title.titleborder
            i.dropdown.icon  
            |{{discourse_title[index].title}} 
            .line
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
@import "../sass/global.scss";
.textleft{
  text-align: left;
}
.ui.accordion .active.title {                  //選單變化顏色
    background-color: rgba(69, 74, 74, 0.1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.ui.accordion .active.title.titleborder {                  //選單變化顏色
    background-color: rgba(69, 74, 74, 0.1);
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}
.commentbox{
     background-color: #f5f5f5;
    
    padding: 0;
    border-radius: 10px;
}
.commentboxall{
     background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    padding: 0;
    border-radius: 10px;
}
.ui.accordion:not(.styled) .title~.content:not(.ui):last-child { //comment 內容padding1em
    padding: 1em;
}
.line{
  border-bottom: 1px solid rgba(0,0,0,.1);
  margin: 1em 0 0 0 ;
}

.ui.accordion .title:not(.ui) {
    padding: 1em 0em 0em 0em;
}
</style>