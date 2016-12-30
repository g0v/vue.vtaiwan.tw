<template lang="jade">
 h1 Social Media Link Test     
  br
  a(:href= "youtubelink" , target='_blank')
   img(:src="youtubeicon" width="200" height="200")
  a(:href= "hackpadlink" , target='_blank') 
   img(:src="hackpadicon" width="200" height="200")
  a(:href= "sayitlink" , target='_blank') 
   img(:src="sayiticon" width="200" height="200")
  br
  // .polis(:data-conversation_id="tt")
  // script(async='true', src='https://pol.is/embed.js')

</template>

<script>
import axios from 'axios'
var main = require('./../filters/index.js')
   
export default {
  data () {
    return {
          tt:'89bzf78kbn',
          youtubeicon: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Youtube.svg',
          youtubelink: 0,
          hackpadicon: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Writing_Circle.svg',
          hackpadlink: 'https://hackpad.com/331--sxKbHuO1tYw',
          sayiticon: 'https://talk.pdis.nat.gov.tw/uploads/default/original/1X/0702e94b7c83e63a7c33826c4552e1d2a540d860.png',
          sayitlink: 'http://sayit.archive.tw/2015-08-27-uberx-%E8%87%AA%E7%94%A8%E8%BB%8A%E8%BC%89%E5%AE%A2%E6%84%8F%E8%A6%8B%E5%BE%B5%E9%9B%86%E8%AB%AE%E8%A9%A2%E6%9C%83%E8%AD%B0',
          
    }
  },
  
  created: function(){
    
    
    axios.get('https://talk.vtaiwan.tw/t/eliquor/918.json')
    .then((response)=>{
      var topics = response.data.post_stream.posts;
      var topic={};
      for(var i in topics){
      topic[i]=topics[i].cooked;
      this.youtubelink= main.huha(topic[i]);
      console.log(this.youtubelink);
      }
     
      
    

    })

    
  }

}
</script>


<style lang="scss" scoped>
  
</style>