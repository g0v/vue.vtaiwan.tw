<template lang="jade">  

    div.commentbox
      h2.ui.header
        i.icon.inverted.circular.blue.comment 
        |Comments{{comment_id}}
      div(v-for="(item, index) in comment")
        .div.ui.comments
          div.comment
            a.avatar
              img(:src="comment[index]['avatar_template']")
            div.content
              a.author
              {{comment[index]['display_username']}}
              div.metadata
                span.date
                 div(v-html="comment[index]['created_at']")
                  
            
              div.text
                div(v-html="comment[index]['cooked']")
              div.line
      a(v-bind:href="'https://talk.vtaiwan.tw/t/topic/'+comment_id" target="_blank")
        div.ui.fluid.blue.labeled.submit.icon.button
          i.icon.edita
          |我要留言
      

        
              
            
</template>

<script>
import axios from 'axios'

export default {
  props:['comment_id'],
  data () {
    return {
      i:[],
      topic_id:[878,887],
      comment:[],
      username:[],
    
    }
  },
  created:function(a,b){
    axios.get('https://talk.vtaiwan.tw/t/topic/'+ this.comment_id +'.json')
    .then((response_comment)=>{
     
      this.comment = response_comment['data']['post_stream']['posts'].slice(1);
      for(var i=0; i<this.comment.length; i++){
        this.username =this.comment[i]['avatar_template'].replace(/{size}/,"100");
        this.comment[i]['avatar_template']=this.comment[i]['avatar_template'].replace(/.*/,'https://talk.vtaiwan.tw'+this.username)
        this.username= this.comment[i]['avatar_template']
      }
       console.log(this.comment)
      console.log(username)
    
    })
   // ['post_stream']['posts'].slice(1)

  }
}

</script>

<style lang="scss" >

.textleft{
      text-align: left;
}
.line{
  border-bottom: 3px solid rgba(0,0,0,.1);
  margin: 20px 0px 20px 0px;
}
.ui.fluid.button, .ui.fluid.buttons {
    width: 30%;
    margin: auto;
}
.ui.header:first-child {
    margin-bottom: 2em;
}

.ui.comments {
     max-width: 93%;
}
.commentbox{
     background-color: #f5f5f5;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    padding: 0.5em;
}
.ui.comments .comment img.avatar {
  width: inherit;
}


</style>