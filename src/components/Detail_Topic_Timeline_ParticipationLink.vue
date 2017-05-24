<template lang="jade">

  .component
    div(v-if = "ulinkall.length > 0")
      a.ui.teal.icon.button(v-for="(item, index) in ulinkall", :href='item.link' target='_blank')
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
      data_base_non:[
        {
          icon:"linkify",
          text:"相關"
        }
      ],
      data_base:[
        {
          key: 'hackpad',
          icon:"pencil",
          text:"共筆"
        },
        {
          key: 'sayit',
          icon:"book",
          text:"記錄"
        },
        {
          key: 'youtube',
          icon:"youtube play",
          text:"直播"
        },
        {
          key: 'livehouse',
          icon:"youtube play",
          text:"直播"
        },
        {
          key: 'pol.is',
          icon:"users",
          text:"討論"
        },
        {
          key: 'talk.vtaiwan.tw',
          icon:"edit",
          text:"留言"
        },
        {
          key: 'app.sli.do',
          icon:"bullhorn",
          text:"提問"
        },
        {
          key: 'PDF',
          icon:"download disk",
          text:"PDF"
        },
        {
          key: 'g0v.github',
          icon:"github alternate",
          text:"GitBook"
        },
      ]
    }
  },

  created:function(a,b){

    for(var i=0;i<this.urllink.length;i++){
      var tag=0;
      for(var j=0; j<this.data_base.length ;j++){
        if(this.urllink[i].indexOf(this.data_base[j].key)!=-1){

          let item = {}
          item.link = this.urllink[i]
          item.icon = this.data_base[j].icon
          item.text = this.data_base[j].text
          this.ulinkall.push(item)
          /* 判斷是否為data_base中的連結 */
          // this.ulinkall
          //   .push("<a href="+this.urllink[i]+" target='_blank' class='ui teal icon button'>"+
          //     this.data_base[j].icon+
          //     "<span class='fat-only'> "+
          //     this.data_base[j].text+
          //     "</span>"+
          //     "</a>"
          //   );
          tag = 1;
        }
      }
      if(tag != 1)  /* 如果不是為data_base的連結 則變成相關連結 */
      {
        let item = {}
        item.link = this.urllink[i]
        item.icon = this.data_base_non[0].icon
        item.text = this.data_base_non[0].text
        if (/^\[(.*?)\]\((.*)\)/.test(item.link)) {
            item.text = RegExp.$1;
            item.link = RegExp.$2;
        }
        this.ulinkall.push(item)
        // this.ulinkall
        //   .push("<a href="+this.urllink[i]+" target='_blank' class='ui teal icon button'>"+
        //     this.data_base_non[0].icon+
        //     "<span class='fat-only'> "+
        //     this.data_base_non[0].text+
        //     "</span>"+
        //     "</a>"
        //   );
      }
    }
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
