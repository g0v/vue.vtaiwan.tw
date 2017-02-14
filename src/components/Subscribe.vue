<template lang="jade">
  .component
    .ui.container
      .row.BGgray
        .ui.left.aligned.text.container
          h2 訂閱電子報
            .ui.form
              .field
                label email：
                input(type='text',name="email",v-model="email",placeholder='請輸入email')
              .ui.green.submit.button
                | 送出       
              .ui.error.message
      
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
    }
  },

  methods: {
    getContactus(id) {
      var head = {
        // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        // headers: {'X-My-Custom-Header': 'Header-Value'}
        headers: {'X-Custom-Header': 'foobar'}
        
      }
      
      let body = JSON.parse(JSON.stringify({ "email": "smith02620@gmail.com"}));
      // let config = JSON.parse(head);
      // console.log(config)
      // Vue.http.options.emulateJSON = true;
      //let header = JSON.parse(JSON.stringify({"headers":{'Content-Type': 'application/x-www-form-urlencoded'}}));
      axios.post('https://talk.vtaiwan.tw/invites?api_key=5a8b11ee7a8904d870f0cd5e32de5100d59e1390a316b86206c20d4b7dbe911b&api_username=smith02620',body,config)
      .then((response) => {
        
        console.log(response);
      })
        
       
    },
    greet: function (event) {
        this.counter++;
        this.getContactus(this.counter);
    }
  },
  created: function(){
    this.getContactus();
  },
  updated: function(){
    var vm = this;
    $('.ui.accordion')
      .accordion()
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
          vm.getContactus();
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
