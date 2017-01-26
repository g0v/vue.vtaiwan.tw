<template lang="jade">
  .component

    .fat-only
      div.styles.content(v-html='information')

    .thin-only
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

.fat-only {
    .content {
      font-family: $main_font;
      font-size:1.2rem;
      max-width: 800px;
      margin:0 auto;
      h1,h2,h3,h4,h5,h6 {
        text-align: center;
      }
      p,li,ol {
        text-align: left;
      }
      p {
        iframe{
          display: block;
          margin: 0 auto;
        }
      }
      blockquote{
        margin:0 0 10px 0;
        text-align: left;
        padding: 5px;
        border-left: 5px solid #e9e9e9;
        background-color: #f8f8f8;
        font-weight: 600;
      }
    }
}
.thin-only { 
    .content {
      font-family: $main_font;
      // font-size:1.2rem;
      iframe {
        width:100%;
      }
      h1,h2,h3,h4,h5,h6 {
        text-align: center;
      }
      p,li,ol {
        text-align: left;
      }
      blockquote {
        margin:0 0 10px 0;
        text-align: left;
        padding: 5px;
        border-left: 5px solid #e9e9e9;
        background-color: #f8f8f8;
        font-weight: 600;
      }
    }
}
</style>
