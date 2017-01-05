<template lang="jade">  
 span(v-if = "polis_id !== undefined") 
  .polis(:data-conversation_id="polis_id")
  script(async='true', src='https://pol.is/embed.js')
     
</template>

<script>
import axios from 'axios'
export default {
  props:['urllink'],
  data () {
    return {
          polis_id:[],
          ulinkall:[],
    }
  },
  created:function(){
    if(this.urllink[0].indexOf('pol.is')!=-1){
      this.polis_id = this.urllink[0].replace(/.*\//,""); //擷取pol.is網址 字串
    }
  }
}
</script>


<style lang="scss" scoped>
  
</style>