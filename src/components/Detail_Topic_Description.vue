<template lang="jade">
  p(v-html = "information")
</template>

<script>

import axios from 'axios'

export default {
  props: ['article'],
  data () {
    return {
      information:"" // 詳細內容
    }  
  },
  created:function(){
      axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
      .then((response)=>{
      this.information = response.data['post_stream']['posts'][0]['cooked'].split("<hr>")[1]; // 取得詳細內容(第一篇)       
      })
  },
}

</script>

<style scoped lang="scss">
p {
  text-align: center;
}
</style>
