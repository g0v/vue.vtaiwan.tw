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

@media screen and (min-width: $breakpoint){
  .content{
    font-family: $main_font;
    max-width: 800px;
    margin:0 auto;
    h1,h2,h3,h4,h5,h6 {
      text-align: center;
    }
    p,li{
      text-align: left;
    }
  }
}
@media screen and (max-width: $breakpoint) {
  .content {
    font-family: $main_font;
    iframe {
      width:100%;
    }
    h1,h2,h3,h4,h5,h6{
      text-align: center;
    }
    p,li,ol{
      text-align: left;
    }
  }
}
</style>
