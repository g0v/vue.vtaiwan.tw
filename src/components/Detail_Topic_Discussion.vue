
<template lang="jade">  
.Discoussioncomponent.textleft
  div(v-if = "slido_id !== undefined && slido_id.length >0")
    span(v-html="slido_id")

  div(v-if = "polis_id !== undefined && polis_id.length >0") 
    .polis(:data-conversation_id="polis_id")
    script(async='true', src='https://pol.is/embed.js')

  div(v-if = "hackpad_id !== undefined && hackpad_id.length >0")
    div.hackpad(v-html="hackpad_id")
  div(v-if = "check >0")
    div(v-for = "(item, index) in discourse_title")
      div.ui.styled.accordion
        div.title
          i.dropdown.icon
          | {{discourse_title[index].title}}
        div.content
          Discussion_Comment(:comment_id="discourse_title[index].id")
  

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
          polis_id:[],
          slido_id:[],
          hackpad_id:[],
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
        else if(link[i].indexOf("hackpad.com")>-1){ //篩出含有hackpad的連結    
          var hack = link[i].replace(/https.*-/,"");
          this.hackpad_id="<iframe id=hackpad-"+hack+" src=https://hackpad.com/"+hack+ " scrolling='yes' height='1000px' width='100%' frameborder='0'></iframe>";//https://hackpad.com/ep/api/embed-pad?padId=
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
  updated:function(){
    $('.ui.accordion').accordion();
  } 
}
</script>

<style lang="scss" >
@import "../sass/global.scss";
.Discoussioncomponent{                         //內文文字P大小
  font-size: 1.5rem;
  font-family: $main_font; 
  line-height: 1.5em;
}
.textleft{                                     //內文置左
  text-align: left;
}
.ui.styled.accordion {                        //討論串框大小
  width: 100%;
}
.ui.styled.accordion .title {                 //討論串標題顏色
  color: rgba(0, 0, 0, 0.60);
  font-family: $main_font; 
}
.ui.accordion .active.content {             //內文寬度為100%
    display: block;
    max-width: 100%;
}
// .hackpad{
//   height:10em;
//   overflow:auto;
// }

</style>