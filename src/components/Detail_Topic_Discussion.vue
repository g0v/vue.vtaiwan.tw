<template lang="jade">
.component
  .ui.left.aligned.container

    div(v-if="dType && dType.type === 'discourse'", :class='dType.type', style='text-align:left')
      .ui.fluid.styled.accordion(v-for="(disc, index) in dType.embeder")
        .title.discoursetitle
          i.dropdown.icon
          | {{disc.title}}
        .content
          Discussion_Comment(:comment_id="disc.id", :slice="false")
    template(v-else)
      div(v-if='dType', v-html='dType.embeder', :class='dType.type', style='text-align:center')


</template>

<script>
import caxios from '../js/request'
import discourse from '../js/discourse.js'
import chineseSort from '../js/chineseSort.js'
import Discussion_Comment from './Detail_Topic_Discussion_Comment.vue'


export default {
  name: 'Detial_Topic_Discussion',
  props: ['articleId'],
  components: {
      Discussion_Comment,
  },
  data () {
    return {
      dType: {
        type: '',
        embeder: ''
      },
      lastStep: ""
    }
  },
  methods: {
    accordion:function(){
      $('.ui.accordion').accordion();
    },
    discussionType: function(id){
      this.dType = Object.assign({}, this.dType)
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
          if(this.lastStep === "意見徵集" || this.lastStep === "研擬草案"){
            rawlinks = post['raw'].split(/\s/)
          }
        }
        /* put the last one of the ext-resources to show in embeded area */
        for(let link of rawlinks.filter(link => link.indexOf('http') > -1)){
          if(link.indexOf("pol.is") > -1){ //篩出含有polis的連結
            dType.type = 'polis'
            dType.embeder = "<iframe src="+link+ " frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>";
          }
          else if(link.indexOf("sli.do") > -1){ //篩出含有slido的連結
            dType.type = 'slido'
            dType.embeder = "<iframe src='"+link+ "' frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>"
          }
          else if(link.indexOf("livehouse") > -1){ //篩出含有livehouse的連結
            dType.type = 'livehouse'
            dType.embeder = "<iframe width='100%' height='1000px' src='"+link.replace("livehouse.in/","livehouse.in/embed/")+"' frameborder='0' allowfullscreen></iframe>"
          }
          else if(link.indexOf("talk.vtaiwan.tw") > -1){ //篩出含有discourse的連結
            link = link.replace(/(.*)\/$/, "$1") // discard last char '/'
            console.log(link + '.json')
            discourse.getAllTopics(link + '.json')
            .then((response) => {
              let topics = response.sort((a,b)=>chineseSort(a.title,b.title))
              dType.type = 'discourse'
              dType.embeder = topics.map( t => ({
                  'title': t.title,
                  'id': t.id
                })
              )
            })
          }
          /* 篩出 typeform 連結 */
          else if (link.indexOf('typeform') > -1) {
            dType.type = 'typeform'
            link = link.replace(/.*\((.*)\)/, "$1")
            dType.embeder = `<iframe src='${link}' frameborder='0' width='100%' height='1000px'></iframe>`
          }
          /* 篩出 hackpad 連結 (deprecated) */
          else if(link.indexOf("hackpad") > -1){
            dType.type = 'hackpad'
            dType.embeder = `Hackpad is moving to Dropbox Paper. Use external <a href='${link}' target='_blank'>link</a> instead.`
          }
          /* 篩出 圖片連結 */
          else if(/.*\.jpg/.test(link)){
            dType.type = 'img'
            link = link.replace(/.*\((.*)\)/, "$1")
            dType.embeder = `<img src='${link}' />`
          }
          else {
            dType.type = 'default'
            dType.embeder = `Please check <a href='${link}' target='_blank'>${link}</a>`
          }
        }
      })
    }
  },
  watch: {
    articleId: function(val){
      this.discussionType(val)
    }
  },
  created: function(){
    this.discussionType(this.articleId) /* first time call */
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
