<template lang="jade">
 h1 Social Media Link Test     
  br
  a(:href= "youtubelink" , target='_blank')
   img(:src="youtubeicon")

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
          youtubeicon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/YouTube-social-icon2.jpg/100px-YouTube-social-icon2.jpg',
          youtubelink: 'https://youtu.be/QA4NmuE4Jdc',
          cover1: 'http://lorempixel.com/320/240/sports'
       
    }
  },
  created: function(){
    
    
    axios.get('https://talk.vtaiwan.tw/t/eliquor/917.json')
    .then((response)=>{
      var topics = response.data.post_stream.posts;
      console.log(topics);
      
    })
  }

}
</script>


<style lang="scss" scoped>
  
</style>