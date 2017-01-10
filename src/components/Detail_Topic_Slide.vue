<template lang="jade">
  p(v-html = "slide")
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
        console.log(this.slide);
      }))
  }
}

</script>

<style scoped lang="scss">
p {
  text-align: center;
}
</style>
