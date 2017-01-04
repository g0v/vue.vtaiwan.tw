<template lang="jade">  
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
          tt:'89bzf78kbn',
          ulinkall:[],
    }
  },
  
watch: { // 確認資訊是否已經傳進來
    urllink:function (val, oldVal) {
     
        console.log(oldVal);
        
        console.log(val);

    }
  }

}
</script>


<style lang="scss" scoped>
  
</style>