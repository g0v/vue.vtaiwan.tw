<template lang="jade">
 h1 Social Media Link Test     
  br
  // a(:href= "youtubelink" , target='_blank')
  //  img(:src="youtubeicon" width="200" height="200")
  // a(:href= "hackpadlink" , target='_blank') 
  //  img(:src="hackpadicon" width="200" height="200")
  // a(:href= "sayitlink" , target='_blank') 
  //  img(:src="sayiticon" width="200" height="200")
  // br
  // .polis(:data-conversation_id="tt")
  // script(async='true', src='https://pol.is/embed.js')
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
          youtubeicon: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Youtube.svg',
          hackpadicon: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Writing_Circle.svg',
          sayiticon: 'https://talk.pdis.nat.gov.tw/uploads/default/original/1X/0702e94b7c83e63a7c33826c4552e1d2a540d860.png',
         
          // urllink:['https://hackpad.com/20161110--KEmoTM5HU85','http://sayit.archive.tw/2015-08-27-uberx-%E8%87%AA%E7%94%A8%E8%BB%8A%E8%BC%89%E5%AE%A2%E6%84%8F%E8%A6%8B%E5%BE%B5%E9%9B%86%E8%AB%AE%E8%A9%A2%E6%9C%83%E8%AD%B0'],
          
          ulinkall:[],
          test:[],    
    }
  },
  
  created:function(a,b){
    console.log(a+" " + b)
    var title='youtube';
    for(var i=0;i<this.urllink.length;i++){
      var urllinktext=[{}];
      var ttt;
      var search_hackpad= this.urllink[i].indexOf('hackpad');
      var search_talkpdis= this.urllink[i].indexOf('sayit');
      var seav
      if(search_hackpad!==-1){
         ttt="<a href= "+this.urllink[i]+" target='_blank'><img src="+this.hackpadicon+" width='200'' height='200'></a>"
         this.ulinkall.push(ttt);
         search_hackpad=-1;
        
      }
      if(search_talkpdis!==-1){
         ttt="<a href= "+this.urllink[i]+" target='_blank'><img src="+this.sayiticon+" width='200'' height='200'></a>"
         this.ulinkall.push(ttt);

         search_talkpdis=-1;
      }

    }
   console.log(this.ulinkall);
   
    // axios.get('https://talk.vtaiwan.tw/t/eliquor/917.json')
    // .then((response)=>{
    //   var topics = response.data.post_stream.posts;
    //   var topic={};
    //   for(var i in topics){
    //   topic[i]=topics[i].cooked;
    //   this.youtubelink= main.huha(topic[i]);
    //   console.log(this.youtubelink);
    //   }
     
      
    

    // })



    
  }

}
</script>


<style lang="scss" scoped>
  
</style>