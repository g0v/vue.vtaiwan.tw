<template lang="jade">
  p(v-html = "information")
    {{article}}
</template>

<script>

import axios from 'axios'

export default {
  props: ['allTopics','article'],
  data () {
    return {
      information:"" // 詳細內容
    }  
  },
  computed: {
  },
  created:function(){
      axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
      .then((response)=>{
      this.information = response.data['post_stream']['posts'][0]['cooked'].split("<hr>")[1]; // 取得詳細內容(第一篇)       
      })
  },
  // watch: { // 確認資訊是否已經傳進來
  //   article:function (val, oldVal) {
  //     if(val.id !== oldVal.id || (this.information==="" && val.id!==undefined))
  //     {
  //       axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
  //       .then((response)=>{
  //         this.information = response.data['post_stream']['posts'][0]['cooked'].split("<hr>")[1]; // 取得詳細內容(第一篇)       
  //       })
  //     }
  //   }
  // }
}

</script>

<style scoped lang="scss">
p {
  text-align: center;
}
</style>
