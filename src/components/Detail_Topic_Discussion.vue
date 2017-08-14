<template lang="jade">
.component
  .ui.left.aligned.container

    template(v-if = "dType")

      .slido(v-html="dType.embeder", v-if = "dType.type === 'typeform'")

      .slido(v-html="dType.slido", v-if = "dType.type === 'slido'")

      .polis(v-html="dType.polis", v-if = "dType.type === 'polis'")

      .livehouse(v-html="dType.livehouse", v-if = "dType.type === 'livehouse'")

      .discourse.ui.fluid.styled.accordion(v-for="(disc, index) in dType.discourse", v-if="dType.type === 'discourse'")
        .title.discoursetitle
          i.dropdown.icon
          | {{disc.title}}
        .content
          Discussion_Comment(:comment_id="disc.id", :slice="false")

    template(v-if="lastStep == '歷史案件' || lastStep == '送交院會'")

      .history.div(v-if = "lastStep==='歷史案件'")
        | 本案已討論結束，詳細歷程可參考「議題時間軸」

      .other.div(v-else)
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
  name: 'Detial_Topic_Discussion',
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
    discussionType: function(article){
      let id = article.id
      let dType = this.dType // just for alias, it's shallow-copy, not deep-copy

      caxios.get('https://talk.vtaiwan.tw/t/'+ id +'.json?include_raw=1')
      .then((response)=>{
        let regex = /(?: (?:init )?)|\n/g
        let rawlinks = []
        let posts = response.data['post_stream']['posts'].slice(1) // 取得議題時間軸內容 except first post
        for(let post of posts){
          /* 尋找最新階段 */
          this.lastStep = post['raw'].split(/\s/,1)[0]
          /* 尋找最新階段為 意見徵集 or 研擬草案 的 post */
          if(post['raw'].indexOf("意見徵集") > -1 || post['raw'].indexOf("研擬草案") > -1){
            rawlinks = post['raw'].split(/\s/)
          }
        }
        for(let link of rawlinks){
          if(link.indexOf("pol.is") > -1){ //篩出含有polis的連結
            dType.type = 'polis'
            dType.polis = "<iframe src="+link+ " frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>";
          }
          else if(link.indexOf("sli.do") > -1){ //篩出含有slido的連結
            dType.type = 'slido'
            dType.slido = "<iframe src='"+link+ "' frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>"
          }
          else if(link.indexOf("livehouse") > -1){ //篩出含有slido的連結
            dType.type = 'livehouse'
            dType.livehouse = "<iframe width='100%' height='1000px' src='"+link.replace("livehouse.in/","livehouse.in/embed/")+"' frameborder='0' allowfullscreen></iframe>"
          }
          else if(link.indexOf("talk.vtaiwan.tw") > -1){ //篩出含有discourse的連結
            link = link.replace(/(.*)\/$/, "$1") // discard last char '/'
            discourse.getAllTopics(link + '.json',0)
            .then((response) => {
              let topics = response.sort((a,b)=>chineseSort(a.title,b.title))
              dType.type = 'discourse'
              dType.discourse = topics.map( t => {
                return {
                  'title': t.title,
                  'id': t.id
                }
              })
            })
          }
          /* 篩出 typeform 連結 */
          else if (link.indexOf('typeform') > -1) {
            dType.type = 'typeform'
            link = link.replace(/.*\((.*)\)/, "$1")
            dType.embeder = `<iframe src='${link}' frameborder='0' width='100%' height='1000px'></iframe>`
          }
          else {
            console.log(link)
          }
        }
        // this.dType = dType
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

.history,.other {
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
