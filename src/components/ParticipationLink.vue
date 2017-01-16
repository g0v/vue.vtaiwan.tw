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
          this.ulinkall.push("<a href= "+this.urllink[i]+" target='_blank'>"+this.data_base[j].icon+"</a>");
        }
      }            
    }
  }
}

</script>
<style lang="scss" >
  i.con {
        padding: 0.6em 0.5em 1.5em 0.5em;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.82);
        display: static;
        background: #49A3DD;
        border-radius: 0.5em;
        width: 70%;
        margin: 0em 0em 0.5em 0em;
  }
//   @media only screen and (max-width: 767px) {
              
// i{
//   display: flex;
//   margin-bottom: 26px;  
// }
//   }
</style>
