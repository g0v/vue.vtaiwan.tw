<template lang="jade">
  .component
    .ui.container
      .row.BGgray
        .ui.left.aligned.text.container
          h2 訂閱電子報
            .ui.form
              .field
                label 標題：
                input(type='text',name="subject",v-model="subject",placeholder='請輸入標題(字數須達10個字以上)...')
              .field
                label 內容：
                textarea(v-model="content",name="content",style='margin-top: 0px; margin-bottom: 0px; height: 168px;', placeholder="請輸入您寶貴的意見(字數須達20個字以上)...")
              .ui.green.submit.button
                | 送出       
              .ui.error.message
      
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
     
    }
  },

  methods: {
    getContactus(id) {
      caxios.post('https://talk.pdis.nat.gov.tw/posts?api_key=cd1a0c22c71b51dec2b702fbb646df99899c27e32c106a1c3173e1ac5336308c&api_username=talk.about.pdis',{})
      .then((response) => {
        let body = this.serialize(JSON.parse(JSON.stringify({ "title": title, "raw": raw, "category": category, "archetype": "regular", "reply_to_post_number": "0" })));
        console.log(response);
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
    $('.ui.accordion')
      .accordion()
    ;
    $('.ui.form')
      .form({
        fields: {
          subject: {
            rules: [
              {
                type   : 'minLength[10]',
                prompt : '標題字數須達10個字以上'
              }
            ]
          },
          content: {
            rules: [
              {
                type   : 'minLength[20]',
                prompt : '內容字數須達10個字以上'
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

.ui.styled.accordion>.title:first-child {
   font-size: 1.5rem; 
}
.ui.green.button,  {                         //送出按鈕
  background-color: #40B3BF;
  margin-bottom:1em;
}

</style>
