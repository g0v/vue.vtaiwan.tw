
<template lang="jade">  
.component.textleft
  div(v-if = "slido_id !== undefined && slido_id.length >0")
    span(v-html="slido_id")

  div(v-if = "polis_id !== undefined && polis_id.length >0") 
    .polis(:data-conversation_id="polis_id")
    script(async='true', src='https://pol.is/embed.js')

  div.commentboxall(v-if = "check >0")     
    div(v-for = "(item, index) in discourse_title")
      .ui.accordion(style="display: block;")
        div.commentbox
          .title
            i.dropdown.icon  
            |{{discourse_title[index].title}}
            div(v-if = "discourse_title.length!=index+1")
              .line 
            div(v-else)
              .margin-bott
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
          check:[],
          discourse_title:[],
    }
  },
    created:function(){
    axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
    .then((response)=>{
      var detail_info = response.data;
      var regex = /(?: (?:init )?)|\n/g;
      var link;
      detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容
      for(var i in detail_info){
        if(detail_info[i]['raw'].indexOf("意見徵集")==0){
          link=detail_info[i]['raw'].replace(/.*[0-9]/,"").split(/\s/g);
        }
      } 
      for(var i=0; i<link.length;i++){
        if(link[i].indexOf("pol.is")>-1){ //篩出含有polis的連結  
          this.polis_id = link[i].replace(/.*\//,"");
        }
        else if(link[i].indexOf("sli.do")>-1){ //篩出含有slido的連結    
          this.slido_id="<iframe src="+link[i]+ "frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>";
        }
        else if(link[i].indexOf("talk.vtaiwan.tw")>-1){//篩出含有discourse的連結 
          axios.get(link[i]+'.json')
          .then((response_discourse)=>{
            var title = response_discourse.data.topic_list.topics;
            for(i=0;i<title.length;i++){
              this.discourse_title[i] = title[i]
            }
            this.check=1;
          })
        }
      }    
    })    
  },
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";
.textleft{
  text-align: left;
}
.ui.accordion .active.title {                  //選單變化顏色
    background-color: rgba(69, 74, 74, 0.1);
}

.commentbox{
     background-color: #f5f5f5;
    
    padding: 0;
    border-radius: 10px;
}
.commentboxall{
    border: solid 0.1em rgba(0,0,0,.1);
    background-color: #f5f5f5;
    padding: 0;
}
.ui.accordion:not(.styled) .title~.content:not(.ui):last-child { //comment 內容padding1em
    padding: 1em;
    margin-left: 1.5em;
}
.line{
  border-bottom: 1px solid rgba(0,0,0,.1);
  margin: 1em 0 0 0 ;
}
.margin-bott{
  margin: 1em 0 0 0 ;
}

.ui.accordion .title:not(.ui) {
    padding: 1em 0em 0em 1em;
    
}
</style>