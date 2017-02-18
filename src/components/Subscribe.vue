<template lang="jade">
  .componentsubscribe
    .ui.container
      .row.BGgray
        .ui.left.aligned.text.container
          h2 訂閱電子報
          p
            span 已註冊過vtaiwan討論區用戶，請至
            a(href="https://talk.vtaiwan.tw/c/newsletter" title="電子報" target="_blank")電子報討論專區
            span 設定監看頭一帖
          p 尚未註冊請輸入email：
            .ui.form
              .field
                input(type='text',name="email",v-model="email",placeholder='請輸入email')
              .ui.green.submit.button
                | 訂閱       
              .ui.error.message
      .row.left
        .ui.segment.attached
          h2 歷史電子報
          div(v-for = "(item, index) in Discussion")         
            div.ui.styled.accordion
                div.title
                  i.dropdown.icon
                  | {{Discussion[index].title}}
                div.content
                  Discussion_Comment(:comment_id="Discussion[index].id", :slice="false")
          .ui.basic.button(v-if="more.more_topics_url!=undefined", v-on:click="greet")
            | 閱讀更多...    
</template>

<script>
import Discussion_Comment from './Detail_Topic_Discussion_Comment.vue'
import caxios from '../js/request'
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    Discussion_Comment,
    
  },
  props:['allTopics', 'catagories'],
  data () {
    return {
      email: "",
      content: "",
      Discussion: [],
      more: [],
    }
  },

  methods: {
    getContactus(id) {
      caxios.get('https://talk.vtaiwan.tw/c/newsletter/l/latest.json?page='+ id)
      .then((response) => {
        this.more= response.data['topic_list'];
        let discus = response.data['topic_list'];     
        discus = discus['topics'].slice(1); // 取得詳細內容(第一篇)
        for(let i of discus){
          this.Discussion.push(i)
        }
      })
    },
   
    greet: function (event) {
        this.counter++;
        this.getContactus(this.counter);
    }
  },
  created: function(){
    this.getContactus(0);
  },
  updated: function(){
    var vm = this;
    $('.ui.accordion')
      .accordion()
    ;
    $('.follow.button')
  .api('query')
;
    $('.ui.form')
      .form({
        fields: {
          email: {
            rules: [
              {
                type   : 'email',
                prompt : '請輸入正確email'
              }
            ]
          },
        },
        onSuccess: function(event, fields) {
            $.ajax({
                type: "POST",
                url: "https://talk.vtaiwan.tw/invites?api_key=ee7e1395d767055387db097d51fab90bfee69b806dc276adcf6a22f691fad5df&api_username=vtaiwaninvite",
                data: { "email": fields.email},
                success: function(){
                    alert('成功訂閱')
                },
                error: function(){
                  alert('使用者已註冊過')
                }
            });
        }
      })
    ;
  },
}
</script>

<style scoped lang="scss">
@import "../sass/global.scss";
.row.BGgray{
    background-color: #efefef;
    padding-top: 2em;
    margin-bottom: 1em;
}
.left{
    text-align: left;
}

.ui.styled.accordion>.title:first-child {
   font-size: 1.5rem; 
}
.ui.green.button,  {                         //送出按鈕
  background-color: #40B3BF;
  margin-bottom:1em;
}
.ui.container{
  height: 100%;
}
.componentsubscribe{
  min-height: 91vh;
}
.ui.text.container{
  font-family: $main_font;
    font-size: 1 rem;
}
</style>
