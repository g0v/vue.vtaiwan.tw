<template lang="jade">
  .component
    .ui.container
      .row.BGgray
        
        .ui.left.aligned.text.container
          h2 聯絡我們
          p vTaiwan 是個由g0v 眾多人維護的開放社群，歡迎給予我們您寶貴的意見與指教，我們將盡速回應。您的意見也將公開於討論區中，供所有讀者參考。
          form.ui.reply.form
            .ui.fluid.input
                input(type='text',v-model="subject",width='100%', placeholder='請輸入標題(字數須達10個字以上)...')
            .field
                textarea(v-model="content",style='margin-top: 0px; margin-bottom: 0px; height: 168px;', placeholder="請輸入您寶貴的意見...")
            a.ui.green.labeled.submit.icon.button(v-on:click="greet",v-bind:href="mailurl")
              i.icon.edit
              |  送出
          // span Multiline message is:
          // p(style='white-space: pre') {{ checkedNames }}
          // br
          // textarea(v-model='message', placeholder='add multiple lines')
         
              

        
  

</template>


<script>




export default {
  name: 'Home',
  components: {
    
  },
  props:['allTopics', 'catagories'],
  data () {
    return {
      subject: "",
      content: "",
      mailurl: "",
    }
  },

 methods: {
    getmailurl: function(){
      this.mailurl = "mailto:smith02621@gmail.com?subject="+this.subject+"&body="+this.content;
    },
    greet: function (event) {
      if(this.subject.length<10){
        alert('標題字數須達10個字以上')
      }
      if(this.content<10){
        alert('內容字數須達10個字以上')
      }
    }
 },
  watch: {
    subject: function(){
      this.getmailurl();
    },
    content: function(){
      this.getmailurl();
    }
  },
}
</script>

<style scoped lang="scss">
@import "../sass/global.scss";
.row.BGgray{
    background-color: #efefef;
    padding-top: 2em;
}
.ui.form { //送出botton 置右
    text-align: right;
}
.ui.green.button,  {                         //我要留言按鈕
  background-color: #40B3BF;
}

</style>
