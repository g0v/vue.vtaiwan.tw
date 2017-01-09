<template lang="jade">  
 //<div class='column'><i class='con edit icon'>Archive</i></div>
 
 .urllink(v-if = "ulinkall.length > 0")
  span.urllink(v-for="(item, index) in ulinkall")
   span(v-html = "ulinkall[index]")
</template>

<script>
import axios from 'axios'
var main = require('./../filters/index.js')
export default {
  props:['urllink'],
  data () {
    return {
      ulinkall:[],
     gg:"<div class='column'><i class='archive icon'></i>Archive</div>",
      data_base:[
        {
          key: 'hackpad',
          icon:"<i class='con edit icon'> 共筆</i>"
        },
        {
          key: 'sayit',
          icon:"<i class='con book icon'> 記錄</i>"
        },
        {
          key: 'youtube',
          icon:"<i class='con play icon'> 影片</i>",
        },
        {
          key: 'pol.is',
          icon:"<i class='con users icon'> 討論</i>"
        },
        {
          key: 'talk.vtaiwan.tw',
          icon:"<i class='con comment outline icon'> 留言</i>"
        },
        {
          key: 'app.sli.do',
          icon:"<i class='con bullhorn icon'> 提問</i>"
        },
        {
          key: 'PDF',
          icon:"<i class='con text file outline icon'> PDF</i>"
        },
        
      ]
    }
  },
  created:function(a,b){
    for(var i=0;i<this.urllink.length;i++){
      for(var j=0; j<this.data_base.length ;j++){
        if(this.urllink[i].indexOf(this.data_base[j].key)!=-1){
          this.ulinkall.push("<div class='ui active button'><a href= "+this.urllink[i]+" target='_blank'>"+this.data_base[j].icon+"</a></div>");
        }
      }            
    }
  }
}

</script>
<style lang="scss">
  i.con {
      font-size: 25px;
      margin-left: 20px;
      color: #49a3a0;
      display:inline;
  }
  .column:hover .icon {
    color: #009FDA;
}
.ui.active.button{
  background-color: transparent;
}
.ui.button {
    
    margin: 11x .25em 0 0;
    padding: 13px 11.5px 8px 0px;
    border-radius: 81.285714rem;
}

</style>


// data_base:[
//         {
//           key: 'hackpad',
//           icon:'https://upload.wikimedia.org/wikipedia/commons/b/b0/Writing_Circle.svg'
//         },
//         {
//           key: 'sayit',
//           icon:'https://talk.pdis.nat.gov.tw/uploads/default/original/1X/0702e94b7c83e63a7c33826c4552e1d2a540d860.png'
//         },
//         {
//           key: 'youtube',
//           icon:'https://upload.wikimedia.org/wikipedia/commons/3/37/Youtube.svg',
//         },
//         {
//           key: 'pol.is',
//           icon:'https://talk.pdis.nat.gov.tw/uploads/default/original/1X/c56e47b659f9f1298de3f43abb3777b5f21aad2f.PNG',
//         },
//         {
//           key: 'talk.vtaiwan.tw',
//           icon:'http://www.discourse.org/images/logo.png',
//         },
//         {
//           key: 'app.sli.do',
//           icon:'https://talk.pdis.nat.gov.tw/uploads/default/original/1X/3d16d62bc946033dfefb4029a5149d3f3420aebc.png',
//         },
//       ]