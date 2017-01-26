<template lang="jade">
  .component

    .thin-only
     div.styles.content(v-html = "slide")

    .fat-only
     div.styles.content(v-html = "slide")

</template>

<script>

import axios from 'axios'

export default {
  props: ['article'],
  data () {
    return {
      slide:"" // 詳細內容
    }  
  },
  methods:{
      getiframe(iframe){
        var parser = new DOMParser ();
        var xmlDoc = parser.parseFromString (iframe, "text/html");
        var result = xmlDoc.getElementsByTagName("iframe")[0].outerHTML;
        return result;
      },
  },
  created:function(){
     
      axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
      .then((response=>{
        var detail_info = response.data;
        detail_info = detail_info['post_stream']['posts'][0]['cooked']; // 取得議題時間軸內容
        this.slide = this.getiframe(detail_info);
      }))
  }
}

</script>

<style lang="scss" modules="styles">

@import "../sass/global.scss";

.content {
  margin-top:10px;
}

.fat-only {
  margin-bottom: 25px;
}
.thin-only {
  .content {
      iframe {
        width:100%;
      }
  }
}
</style>
