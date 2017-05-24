<template lang="jade">  

.component

  .ui.left.aligned.container
    template(v-if = "dType")

      .slido(v-html="dType.slido", v-if = "dType.type.includes('slido')")

      .polis(v-html="dType.polis", v-if = "dType.type.includes('polis')")
        // .polis(:data-conversation_id = "dType.polis")
        // script(async = 'true', src = 'https://pol.is/embed.js')
      // div(v-if = "dType.type.includes('hackpad')")
      //   .hackpad(v-html="dType.hackpad")

      .livehouse(v-html="dType.livehouse", v-if = "dType.type.includes('livehouse')") 

      .discourse.ui.fluid.styled.accordion(v-for="(disc, index) in dType.discourse", v-if="dType.type.includes('discourse')")
        .title.discoursetitle
          i.dropdown.icon
          | {{disc.title}}
        .content
          Discussion_Comment(:comment_id="disc.id", :slice="false")

    template(v-if="lastStep == '歷史案件' || lastStep == '送交院會'")
          #history.div(v-if = "lastStep==='歷史案件'")
            | 本案已討論結束，詳細歷程可參考「議題時間軸」
          #other.div(v-else)
            div(v-if = "lastStep==='送交院會'")
              | 本案已擬定草案，送交院會審查中
            div(v-else)
              | 本案目前無可線上參與的項目 
</template>

<script>
import caxios from '../js/request'
import discourse from '../js/discourse.js'
import chineseSort from '../js/chineseSort.js'
import Discussion_Comment from './Detail_Topic_Discussion_Comment.vue'


export default {
  props: ['article'],
  components: {
      Discussion_Comment,
  },
  data () {
    return {
      dType: {},
      lastStep: ""
    }
  },
  methods: {
    accordion:function(){
      $('.ui.accordion').accordion();
    },
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
          if(i['raw'].indexOf("意見徵集") == 0 || i['raw'].indexOf("研擬草案") == 0){
            link=i['raw'].split(/\s/) // add link to link[]
          }
          this.lastStep = i['raw'].split(" ",1)[0]
        }
        for(let j of link){
          if(j.indexOf("pol.is") > -1){ //篩出含有polis的連結  
            dType.type.push('polis')    
            // dType.polis = j.replace(/.*\//, "")
            dType.polis = "<iframe src="+j+ " frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>";
          }
          else if(j.indexOf("sli.do") > -1){ //篩出含有slido的連結    
            dType.type.push('slido')
            dType.slido = "<iframe src='"+j+ "' frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>"
          }
          else if(j.indexOf("livehouse") > -1){ //篩出含有slido的連結    
            dType.type.push('livehouse')
            dType.livehouse = "<iframe width='100%' height='1000px' src='"+j.replace("livehouse.in/","livehouse.in/embed/")+"' frameborder='0' allowfullscreen></iframe>"
          }
          else if(j.indexOf("hackpad.com") > -1){ //篩出含有hackpad的連結    
            let hack = j.replace(/https.*-/,"");
            dType.type.push('hackpad')
            dType.hackpad = "<iframe id='hackpad-"+hack+"' src='https://hackpad.com/"+hack+"' scrolling='yes' height='1000px' width='100%' frameborder='0'></iframe>" 
            // https://hackpad.com/ep/api/embed-pad?padId=
          }
          else if(j.indexOf("talk.vtaiwan.tw") > -1){ //篩出含有discourse的連結
            j = j.replace(/(.*)\/$/, "$1") // discard last char '/'
            discourse.getAllTopics(j + '.json',0)
            .then((response) => {
              let topics = response.sort((a,b)=>chineseSort(a.title,b.title))
              dType.type.push('discourse')
              dType.discourse = topics.map( t => {
                return {
                  'title': t.title, 
                  'id': t.id
                }
              })
              // dType.check = true
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

<style lang="scss" scoped>
@import "../sass/global.scss";
.component {                         //內文文字P大小
  font-size: 1.5rem;
  // font-family: $main_font; 
  line-height: 1.5em;
}
.ui.left.aligned.container {
  width: 99% !important;
  @media only screen and (max-width: $breakpoint){
    margin: 0 .1em !important;
  }
}
</style>

<style lang="scss">
@import "../sass/global.scss";
// .textleft{                                     //內文置左
//   text-align: left;
// }
// .ui.styled.accordion {                        //討論串框大小
//   width: 100%;
// }

#history,#other {
  text-align: center;
}
.ui.styled.accordion .title {                 //討論串標題顏色
  color: rgba(0, 0, 0, 0.60);
  font-family: $main_font; 
}
.ui.styled.accordion .active.content {             //內文寬度為100%
    display: block;
    max-width: 100%;
}


</style>
