<template lang="jade">
  .component
    .ui.container
      .row.BGgray
        .ui.left.aligned.text.container
          h2 聯絡我們
          p vTaiwan 是個由g0v 眾多人維護的開放社群，歡迎給予我們您寶貴的意見與指教，我們將盡速回應。您的意見也將公開於討論區中，供所有讀者參考。
            .ui.form
              .field
                label 標題：
                input(type='text',name="subject",v-model="subject",placeholder='請輸入標題(字數須達10個字以上)...')
              .field
                label 內容：
                textarea(v-model="content",name="content",style='margin-top: 0px; margin-bottom: 0px; height: 168px;', placeholder="請輸入您寶貴的意見...")
              .ui.green.submit.button
                | 送出       
              .ui.error.message
      .row.left
        .ui.segment.attached
          h2 歷史留言
          div(v-for = "(item, index) in Discussion")         
            div.ui.styled.accordion
                div.title
                  i.dropdown.icon
                  | {{Discussion[index].title}}
                div.content
                  Discussion_Comment(:comment_id="Discussion[index].id", :slice="false")
      
  

</template>


<script>
import Discussion_Comment from './Detail_Topic_Discussion_Comment.vue'
import caxios from '../js/request'


export default {
  name: 'Home',
  components: {
    Discussion_Comment,
    
  },
  props:['allTopics', 'catagories'],
  data () {
    return {
      subject: "",
      content: "",
      Discussion: [],
    }
  },

 methods: {
   getContactus(id) {
        caxios.get('https://talk.vtaiwan.tw/c/contactus/l/latest.json?page=0')
          .then((response) => {
            this.Discussion = response.data['topic_list']['topics'].slice(1); // 取得詳細內容(第一篇)
            
            console.log(this.Discussion)
          })
      }

 },
 created: function(){
   this.getContactus();
    // $('.ui.accordion').accordion();
 },
  updated: function(){
    $('.ui.accordion')
      .accordion()
    ;
    $('.ui.form')
      .form({
        fields: {
          subject: {
            rules: [
              {
                type   : 'minLength[10]'
              }
            ]
          },
          content: {
            rules: [
              {
                type   : 'minLength[10]'
              }
            ]
          },
        },
        onSuccess: function(event, fields) {
          window.location.href = "mailto:replies+contactus@vtaiwan.tw?subject="+fields.subject+"&body="+fields.content;
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
.ui.green.button,  {                         //送出按鈕
  background-color: #40B3BF;
  margin-bottom:1em;
}

</style>
