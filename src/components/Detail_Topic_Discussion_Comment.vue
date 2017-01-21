<template lang="jade">  

    .component
      h2.ui.header
        i.icon.inverted.circular.blue.comment 
        | Comments
      div.ui.large.labels
        div.ui.label
          | 回復 {{comment.length}}
        div.ui.label
          | 觀看 {{views['views']}}
        div.ui.label
          | 用戶 {{views['participant_count']}}
        div.ui.label
          | 最新回復 {{date}}
      div(v-for="(item, index) in comment")
        div.ui.comments
          div.comment
            a.avatar
              img(:src="comment[index]['avatar_template']")
            div.content
              a.author
                | {{comment[index]['username']}}
              div.metadata               
                span.date
                  div(v-html="comment[index]['created_at']")
              div.text
                div(v-html="comment[index]['cooked']")
              div.line
      a(v-bind:href="'https://talk.vtaiwan.tw/t/topic/'+comment_id" target="_blank")
        div.ui.fluid.green.labeled.submit.icon.button
          i.icon.edit
          | 我要留言
      

        
              
            
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
      date:[],
    }
  },
  created:function(a,b){
    axios.get('https://talk.vtaiwan.tw/t/topic/'+ this.comment_id +'.json')
    .then((response_comment)=>{
     this.views = response_comment['data']['last_posted_at'];
      this.comment = response_comment['data']['post_stream']['posts'].slice(1);
      for(var i=0; i<this.comment.length; i++){
        this.username =this.comment[i]['avatar_template'].replace(/{size}/,"100");
        this.comment[i]['avatar_template']=this.comment[i]['avatar_template'].replace(/.*/,'https://talk.vtaiwan.tw'+this.username);
        this.comment[i]['created_at']=this.comment[i]['created_at'].replace(/T.*/,"");
        this.username= this.comment[i]['avatar_template']
      }
      var today = new Date();
      var lastpostday = new Date(this.views);
      this.date=(today-lastpostday)/(1000*60*60*24);
      if(this.date>1){
        this.date=Math.floor(this.date)+"天";
      }
      else if(this.date>0.041){
        this.date=Math.floor(this.date*24)+"小時";
      }
      else{
        this.date=Math.floor(this.date*24*60)+"分鐘";
      }
    
    })
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
    width: 76%;
    margin: auto;
    margin-bottom: 1em;
    font-size: 1.5rem;
    @media only screen and (max-width: 767px){
      font-size: 0.8rem;
    }
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
    font-size: 1.5rem;
    @media only screen and (max-width: 767px){
      font-size: 1rem;
    }
    

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