<template lang="jade">
.description
  div.styles.content(v-html='information')
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
        var detail_info = response.data['post_stream']['posts'][0]['cooked'].split("<hr>")[1]; // 取得詳細內容(第一篇)
        this.information = detail_info;
      })
  },
}

</script>

<style lang="scss" modules="styles">

@import "../sass/global.scss";

@media screen and (min-width: 768px){
  .content{
    h1,p,a {
      font-family: $main_font
    }
  }
}
@media screen and (max-width: 768px) {
  .content {
    font-family: $main_font
    h1 {
      font-family: $main_font
    }
    iframe {
      width:100%;
    }
  }
}
</style>
