<template lang="jade">
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
        // if(detail_info.indexOf("425")>-1 && window.innerWidth<425){
        //   this.information = detail_info.replace("425","100%");
        // }
        // else {
        //     this.information = detail_info;
        // }
      })
  },
}

</script>

<style lang="scss" modules="styles">

@media only screen and (max-width: 900px) {

  .content {
    iframe {
      width:100%;
    }
  }
}
</style>
