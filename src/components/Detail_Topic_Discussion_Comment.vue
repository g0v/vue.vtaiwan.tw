<template lang="jade">  

  .Commentcomponent
      div.ui.compact.menu
        a.item(title="回復人數")
          i.reply.icon
          |  {{comment.length}}
        a.item(title="觀看人數")
          i.unhide.icon
          |  {{views['views']}}
        a.item(title="用戶人數")
          i.user.icon
          |  {{views['participant_count']}}   
        a.item(title="最新回復")
          i.calendar.icon
          |  {{this.views['last_posted_at']}} 
      div(v-for="(item, index) in comment")
        div.discussioncomment.ui.comments
          div.comment
            a.avatar
              //回復icon
              img(:src="comment[index]['avatar_template']") 
            div.discussioncontent
              //作者姓名
              a.author
                | {{comment[index]['username']}}
              div.metadata               
                span.date
                  //日期
                  div(v-html="comment[index]['created_at']")
              div.text
                //內容
                div(v-html="comment[index]['cooked']")
              div.commentline
      a(v-bind:href="'https://talk.vtaiwan.tw/t/topic/'+comment_id" target="_blank")
        div.ui.fluid.green.labeled.submit.icon.button
          i.icon.edit
          | 我要留言
   
</template>

<script>
import caxios from '../js/request'

export default {
  props:['comment_id','slice'],
  data () {
    return {
      comment:[],
      views:[],
      check:[],
    }
  },
  methods: {
    getDiscussion_Comment: function(val){
      this.check=0;
      caxios.get('https://talk.vtaiwan.tw/t/topic/'+ val +'.json')
      .then((response_comment)=>{
        let dcomment = {}
        this.views = response_comment['data']; //觀看人數
        if(this.slice==true){
          this.comment = response_comment['data']['post_stream']['posts'].slice(1);
        }
        else if(this.slice==false){
          this.comment = response_comment['data']['post_stream']['posts'];
        }
        for(let i=0; i<this.comment.length; i++){
          if(this.comment[i]['avatar_template'].indexOf("https:")==-1){ //判斷是否含有https網址
            this.comment[i]['avatar_template']=this.comment[i]['avatar_template'].replace(/.*/,'https://talk.vtaiwan.tw'+this.comment[i]['avatar_template']); //抓取icon
          }
          this.comment[i]['avatar_template']=this.comment[i]['avatar_template'].replace(/{size}/,"100"); //icon size =100
          this.comment[i]['created_at']=this.comment[i]['created_at'].replace(/T.*/,"");  //發文日期
          if(this.comment[i]['cooked'].indexOf("htpp")>-1){ //判斷從discourse 來的圖片是否為完整網址
            this.comment[i]['cooked'] = this.comment[i]['cooked'].replace(/<img src="/,'<img src="https://talk.vtaiwan.tw') //不完整的話加入https://talk.vtaiwan.tw
          }
        }
        
        let today = new Date();
        if(this.views['last_posted_at']!=null){
          let lastpostday = new Date(this.views['last_posted_at']);
          let date=(today-lastpostday)/(1000*60*60*24);
          if(date>1){
            this.views['last_posted_at']=Math.floor(date)+" 天 ";
          }
          else if(date>0.041){
            this.views['last_posted_at']=Math.floor(date*24)+" 小時 ";
          }
          else if(date<0.041){
            this.views['last_posted_at']=Math.floor(date*24*60)+" 分鐘 ";
          }
        }
        else{
          this.views['last_posted_at']="0";
        }
      })
      return this.check=1;
    }
  },
  created:function(){
    this.getDiscussion_Comment(this.comment_id);  
  },
  watch: {
    comment_id: function(val){
      this.getDiscussion_Comment(val);
    }
  },

}

</script>

<style lang="scss"  modules="discussioncomment">
@import "../sass/global.scss";
.Commentcomponent {                           //內文文字P大小
  font-size: 1.5rem;
  font-family: $main_font;
}

.ui.compact.menu {                          //資訊列
  margin-bottom: 2em;
}
.ui.menu .item {                            //資訊列
  padding: 0.5em 0.8em;
}
.ui.green.button,  {                         //我要留言按鈕
  background-color: #40B3BF;
}
.ui.fluid.button, {                         //我要留言按鈕大小
  width: 76%;
  margin: auto;
  margin-bottom: 1em;
  font-size: 1.5rem;
  @media only screen and (max-width: 767px){
    font-size: 0.8rem;
  }
}
.commentline{                                 //內文間隔線條
  border-bottom: 2px solid rgba(0,0,0,.1);
  margin: 2em 0em 2em 0em;
}
.ui.comments .comment .text{                  //內文邊間距
  margin: 0.5em 0em 0em 3em;
  @media only screen and (max-width: 767px){
    margin: 2em 0em 0em 0.5em;
  } 
}
.ui.comments {                                //內文寬度
     max-width: 93%;
}
.discussioncontent blockquote{                //內文blockquote
   margin:0 0 10px 0;
   text-align: left;
   padding: 5px;
   border: 0px;
   p{
     text-align: left;
     font-weight: normal;
   }
}
.ui.comments .comment a.author {              //使用者icon 邊界
    margin: 0em 1em 0em 0.5em;
}
.ui.comments .comment img.avatar {            //使用者icon大小
  width: 2em;

}



</style>
