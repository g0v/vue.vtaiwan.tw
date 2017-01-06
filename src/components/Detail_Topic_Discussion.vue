<template lang="jade">  
 span(v-if = "polis_id !== undefined") 
  .polis(:data-conversation_id="polis_id")
  script(async='true', src='https://pol.is/embed.js')
     
</template>

<script>
import axios from 'axios'
export default {
  props:['article'],
  data () {
    return {
          polis_id:[],
    }
  },
  created:function(){
    
    axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
     .then((response)=>{
       var detail_info = response.data;

       detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容
      
       for(var i in detail_info){
           var regex = /(?: (?:init )?)|\n/g;
           var link = {};

           link= detail_info[i]['raw'].split(regex); // 連結集合

           for(var j = 3; j < link.length; j++ ){
             if(detail_info[i]['raw'].split(regex)[j].indexOf("pol.is")>-1){ //篩出含有polis的連結                
               this.polis_id = detail_info[i]['raw'].split(regex)[j].replace(/.*\//,"");
             }
           }
       }       
            
     })    
  }
}
</script>

<style lang="scss" scoped>
</style>