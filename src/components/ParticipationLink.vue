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
      data_base:[
        {
          key: 'hackpad',
          icon:"<a class='ui teal button'><i class='pencil icon'></i>共筆</a>"
        },
        {
          key: 'sayit',
          icon:"<a class='ui teal button'><i class='book icon'></i>記錄</a>"
        },
        {
          key: 'youtube',
          icon:"<a class='ui teal button'><i class='youtube play icon'></i>影片</a>",
        },
        {
          key: 'pol.is',
          icon:"<a class='ui teal button'><i class='users icon'></i>討論</a>"
        },
        {
          key: 'talk.vtaiwan.tw',
          icon:"<a class='ui teal button'><i class='edit icon'></i>留言</a>"
        },
        {
          key: 'app.sli.do',
          icon:"<a class='ui teal button'><i class='bullhorn icon'></i>提問</a>"
        },
        {
          key: 'PDF',
          icon:"<a class='ui teal button'><i class='download disk icon'></i>PDF</a>"
        },
        {
          key: 'g0v.github',
          icon:"<a class='ui teal button'><i class='github alternate icon'></i>GitBook</a>"
        },
      ]
    }
  },
  created:function(a,b){
    console.log(this.urllink)
    for(var i=0;i<this.urllink.length;i++){
      for(var j=0; j<this.data_base.length ;j++){
        if(this.urllink[i].indexOf(this.data_base[j].key)!=-1){
          this.ulinkall.push("<a href= "+this.urllink[i]+" target='_blank'"+this.data_base[j].icon+"</a>");
        }
      }            
    }
  }
}

</script>
<style lang="scss" >
  .ui.teal.button{
    margin-bottom: 0.5em;
    background-color: #40B3BF;
    @media only screen and (max-width: 767px){
      padding: 0.7em;
    }
  }
</style>
