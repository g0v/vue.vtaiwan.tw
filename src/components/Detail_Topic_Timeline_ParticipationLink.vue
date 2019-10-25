<template lang="pug">

  .component
    div(v-if = "ulinkall.length > 0")
      a.ui.teal.icon.button(v-for="(item, index) in ulinkall", :href='item.link' target='_blank', :data-tooltip='item.long', data-inverted)
        p
          i.icon(:class="item.icon")
          | {{ item.text }}

</template>

<script>
// import axios from 'axios'
// import $ from 'jQuery'
var main = require('./../filters/index.js')
export default {
  props:['urllink'],
  data () {
    return {
      ulinkall:[],
      data_base:[
        {
          key: 'hackpad',
          icon:"pencil",
          text:"共筆",
          long:'會議共同筆記'
        },
        {
          key: 'sayit',
          icon:"book",
          text:"記錄",
          long:'當日共同筆記整理出的重點'
        },
        {
          key: 'youtube',
          icon:"youtube play",
          text:"直播",
          long:'會議直播影片 youtube'
        },
        {
          key: 'livehouse',
          icon:"youtube play",
          text:"直播",
          long:'會議直播影片 livehouse'
        },
        {
          key: 'pol.is',
          icon:"users",
          text:"討論",
          long:'進入討論'
        },
        {
          key: 'talk.vtaiwan.tw',
          icon:"edit",
          text:"留言",
          long:'進入留言'
        },
        {
          key: 'app.sli.do',
          icon:"bullhorn",
          text:"提問",
          long:'會議共同筆記'
        },
        {
          key: '.pdf',
          icon:"download disk",
          text:"PDF",
          long:'會議共同筆記'
        },
        {
          key: 'g0v.github',
          icon:"github alternate",
          text:"GitBook",
          long:'會議共同筆記'
        },
        {
          key: '',
          icon:"linkify",
          text:"相關",
          long:'與議題相關的連結'
        },
      ]
    }
  },

  created:function(a,b){
    this.urllink.map(link => {
      let item = {}
      /* find matched item in data_base that involved in link */
      let matched = this.data_base.filter(data => link.toLowerCase().indexOf(data.key) > -1)[0]
      item.icon = matched.icon
      item.long = matched.long
      if (/^\[(.*?)\]\((.*)\)/.test(link)) {
        item.text = RegExp.$1;
        item.link = RegExp.$2;
      }
      else {
        item.link = link
        item.text = matched.text
      }
      this.ulinkall.push(item)
    })
  }
}

</script>
<style lang="scss">
@import "../sass/global.scss";
a.ui.icon.button{
  background-color: $main_color;
  margin: .1em .2ch;
  span {
    font-family: $main-font;
  }
}
</style>
