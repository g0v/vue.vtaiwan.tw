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
    }
  },

 methods: {

 },
  updated: function(){
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
}

.ui.green.button,  {                         //我要留言按鈕
  background-color: #40B3BF;
}

</style>
