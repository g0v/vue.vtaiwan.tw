<template lang="jade">  

    .component
      h2.discussioncomment.ui.header
        i.discussioncomment.icon.inverted.circular.blue.comment 
        |Comments
      div.ui.large.labels
        div.ui.label
          | 回復 {{comment.length}}
        div.ui.label
          | 觀看 {{views['views']}}
        div.ui.label
          | 用戶 {{views['participant_count']}}
      div(v-for="(item, index) in comment")
        div.discussioncomment.ui.comments
          div.discussioncomment.comment
            a.discussioncomment.avatar
              img(:src="comment[index]['avatar_template']")
            div.discussioncomment.content
              a.discussioncomment.author
              {{comment[index]['username']}}
              div.discussioncomment.metadata               
                span.discussioncomment.date
                  div(v-html="comment[index]['created_at']")
              div.discussioncomment.text
                div(v-html="comment[index]['cooked']")
              div.discussioncomment.line
      a(v-bind:href="'https://talk.vtaiwan.tw/t/topic/'+comment_id" target="_blank")
        div.discussioncomment.ui.fluid.green.labeled.submit.icon.button
          i.discussioncomment.icon.edit
          |我要留言
      

        
              
            
</template>

<script>
import axios from 'axios'

export default {
  props:['comment_id'],
  data () {
    return {
      comment:[],
      username:[],
      views:[],
    
    }
  },
  created:function(a,b){
    axios.get('https://talk.vtaiwan.tw/t/topic/'+ this.comment_id +'.json')
    .then((response_comment)=>{
     this.views = response_comment['data'];
      this.comment = response_comment['data']['post_stream']['posts'].slice(1);
      for(var i=0; i<this.comment.length; i++){
        this.username =this.comment[i]['avatar_template'].replace(/{size}/,"100");
        this.comment[i]['avatar_template']=this.comment[i]['avatar_template'].replace(/.*/,'https://talk.vtaiwan.tw'+this.username);
        this.comment[i]['created_at']=this.comment[i]['created_at'].replace(/T.*/,"");
        this.username= this.comment[i]['avatar_template']
      }
      console.log(this.comment_id)
      //console.log(username)
    console.log(this.views)
    })
   // ['post_stream']['posts'].slice(1)

  }
}

</script>

<style lang="scss" scoped modules="discussioncomment">
@import "../sass/global.scss";
.ui.large.label, .ui.large.labels .label {//資訊列
    font-size: 0.5rem;
    margin-bottom:2em;
}
.ui.green.button,  { //我要留言按鈕
    background-color: rgba(0, 181, 173, 0.6);
}
.ui.fluid.button, { //我要留言按鈕大小
    width: 100%;
    margin: auto;
    margin-bottom: 1em;
    font-size: 0.6rem;
}
.textleft{
      text-align: left;
}
.line{
  border-bottom: 2px solid rgba(0,0,0,.1);
  margin: 2em -2em 2em -3.5em;
}

.ui.header:first-child { ////comment icon
    margin-bottom: 1em;
    font-size: 0.6rem;
}

.ui.comments {
     max-width: 93%;
}

.ui.comments .comment img.avatar {
  width: inherit;
}
.ui.button{
      font-size: 1.5rem;
}


</style>