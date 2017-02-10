<template lang="jade">  

.Discoussioncomponent.textleft
  template(v-if = "dType")
    // |{{dType}}
    div(v-if = "dType.type.includes('slido')")
      .slido(v-html="dType.slido")
    div(v-if = "dType.type.includes('polis')") 
      .slido(v-html="dType.polis")
      // .polis(:data-conversation_id = "dType.polis")
      // script(async = 'true', src = 'https://pol.is/embed.js')
    div(v-if = "dType.type.includes('hackpad')")
      .hackpad(v-html="dType.hackpad")
    div(v-if = "dType.check == true && dType.type.includes('discourse')")
      div(v-for = "(disc, index) in dType.discourse")
        div.ui.styled.accordion
          div.title
            i.dropdown.icon
            | {{disc.title}}
          div.content
            Discussion_Comment(:comment_id="disc.id", :slice="false")

</template>

<script>
import caxios from '../js/request'
import Discussion_Comment from './Detail_Topic_Discussion_Comment.vue'

export default {
  props: ['article'],
  components: {
      Discussion_Comment,
  },
  data () {
    return {
      dType: {}
    }
  },
  methods: {
    discussionType: function(val){
      let id = val.id // just for alias
      this.dType = { // initialize dType
        'type': []
      } 
      
      let dType = this.dType // just for alias
      caxios.get('https://talk.vtaiwan.tw/t/'+ id +'.json?include_raw=1')
      .then((response)=>{
        let detail_info = response.data
        let regex = /(?: (?:init )?)|\n/g
        let link = []
        detail_info = detail_info['post_stream']['posts'].slice(1) // 取得議題時間軸內容
        for(let i of detail_info){
          if(i['raw'].indexOf("意見徵集") == 0){
            link=i['raw'].split(/\s/) // add link to link[]
          }
        }
        for(let j of link){
          if(j.indexOf("pol.is") > -1){ //篩出含有polis的連結  
            dType.type.push('polis')    
            // dType.polis = j.replace(/.*\//, "")
            dType.polis = "<iframe src="+j+ " frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>";
          }
          else if(j.indexOf("sli.do") > -1){ //篩出含有slido的連結    
            dType.type.push('slido')
            dType.slido = "<iframe src="+j+ "frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>"
          }
          else if(j.indexOf("hackpad.com") > -1){ //篩出含有hackpad的連結    
            let hack = j.replace(/https.*-/,"");
            dType.type.push('hackpad')
            dType.hackpad = "<iframe id='hackpad-"+hack+"' src='https://hackpad.com/"+hack+"' scrolling='yes' height='1000px' width='100%' frameborder='0'></iframe>" 
            // https://hackpad.com/ep/api/embed-pad?padId=
          }
          else if(j.indexOf("talk.vtaiwan.tw") > -1){ //篩出含有discourse的連結
            j = j.replace(/(.*)\/$/, "$1") // discard last char '/'
            caxios.get(j + '.json')
            .then((response) => {
              let topics = response.data.topic_list.topics
              dType.type.push('discourse')
              dType.discourse = topics.map( t => {
                return {
                  'title': t.title, 
                  'id': t.id
                }
              })
              dType.check = true
              /* "return" cannot return outside axios, so use this.var instead */
            })
          }
        }
      })
    }
  },
  watch: {
    article: function(val){
      this.discussionType(val)
    }
  },
  created: function(){
    this.discussionType(this.article) /* first time call */
  },
  updated: function(){
    $('.ui.accordion').accordion();
  },
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


</style>
