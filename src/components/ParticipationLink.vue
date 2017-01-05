<template lang="jade">  
 .urllink(v-if = "ulinkall.length > 0")
  span.urllink(v-for="(item, index) in ulinkall")
   a(v-html = "ulinkall[index]")
</template>

<script>
import axios from 'axios'
var main = require('./../filters/index.js')
export default {
  props:['urllink'],
  data () {
    return {
      ulinkall:[],
      
      data_base:[
        {
          key: 'hackpad',
          icon:"<i class='edit icon'></i>共筆"
        },
        {
          key: 'sayit',
          icon:"<i class='book icon'></i>記錄"
        },
        {
          key: 'youtube',
          icon:"<i class='play icon'></i>影片",
        },
        {
          key: 'pol.is',
          icon:"<i class='users icon'></i>討論"
        },
        {
          key: 'talk.vtaiwan.tw',
          icon:"<i class='comment outline icon'></i>留言"
        },
        {
          key: 'app.sli.do',
          icon:"<i class='bullhorn icon'></i>提問"
        },
        {
          key: 'PDF',
          icon:"<i class='text file outline icon'></i>PDF"
        },
        
      ]
    }
  },
  created:function(a,b){
    for(var i=0;i<this.urllink.length;i++){
      for(var j=0; j<this.data_base.length ;j++){
        if(this.urllink[i].indexOf(this.data_base[j].key)!=-1){
          this.ulinkall.push("<a href= "+this.urllink[i]+" target='_blank'>"+this.data_base[j].icon+"</a>");
        }
      }            
    }
  }
}

</script>
<style lang="scss" scoped>
  a {
      font-size: 2em;
      margin-left: 20px;
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