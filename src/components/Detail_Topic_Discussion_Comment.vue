<template lang="jade">  
 div.container
          h2.ui.header
          i.icon.inverted.circular.blue.comment 
          | Comments
          #discourse-comments
          script.
            var discourseUrl = "https://talk.vtaiwan.tw";
            function showDiscourseTopic(topic) {
              var comments = document.getElementById('discourse-comments');
              var iframe = document.getElementById('discourse-embed-frame');
              if (iframe) { iframe.remove(); }
              iframe = document.createElement('iframe');
              iframe.src = 'https://talk.vtaiwan.tw/embed/comments?topic_id='+topic;
              iframe.id = 'discourse-embed-frame';
              iframe.width = '100%';
              iframe.height = '500px';
              iframe.frameBorder = '0';
              iframe.scrolling = 'yes';
              console.log(iframe);
              comments.appendChild(iframe);
            };
            showDiscourseTopic(887);
        // DiscourseEmbed = { discourseUrl: 'https://talk.vtaiwan.tw/',topicId: 887 };
        // (function() {
        // var d = document.createElement('script'); d.type = 'text/javascript'; d.async = true;
        // d.src = this.DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
        // (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(d);
        // })(); 


</template>

<script>
import axios from 'axios'

export default {
  props:['comment_id'],
  data () {
    return {
      
      
    }
  },
  created:function(a,b){
    
    

  }
}

</script>

<style lang="scss" scoped>

.container {
    position: relative;
    max-width: 900px;
    margin: 20px auto 0 auto;
    background-color: #f5f5f5;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    padding-top: 15px;
    padding-bottom: 60px;
    margin-bottom: 30px;
}

</style>