<template lang="jade">  
 
h1 123132
  //.polis(:data-conversation_id="tt")
  //script(async='true', src='https://pol.is/embed.js')
 
  // .urllink(v-if = "ulinkall.length > 0")
  //   span.urllink(v-for="(item, index) in ulinkall")
  //   span(v-html = "ulinkall[index]")
    
</template>

<script>
import axios from 'axios'
var main = require('./../filters/index.js')
   
export default {
  props:['urllink'],
  data () {
    return {
          tt:'89bzf78kbn',
          ulinkall:[],
    }
  },
  
watch: { // 確認資訊是否已經傳進來
    urllink:function (val, oldVal) {
     
   
        if(val[0].indexOf('pol.is')!=-1){
        //   this.ulinkall.push("<a href= "+this.urllink[i]+" target='_blank'><img src="+this.data_base[j].icon+" width='50'' height='50'></a>");
        console.log('123123132213');
        }
        
        

    }
  }

}
</script>


<style lang="scss" scoped>
  
</style>