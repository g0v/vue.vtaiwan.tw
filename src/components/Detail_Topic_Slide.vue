<template lang="jade">
  .component

     .content(v-html = "slide.content")

</template>

<script>

import caxios from '../js/request'

export default {
  props: ['article'],
  data () {
    return {
      slide:"" // 詳細內容
    }  
  },
  methods:{
    getSlide(val){
      let id = val.id
        this.slide = { // initialize dType
         'content': ""
        } 
      let slide = this.slide // just for alias
      caxios.get('https://talk.vtaiwan.tw/t/'+ id +'.json?include_raw=1')
      .then((response=>{
        var detail_info = response.data;
        var parser = new DOMParser ();
        detail_info = detail_info['post_stream']['posts'][0]['cooked']; // 取得議題時間軸內容
        var xmlDoc = parser.parseFromString (detail_info, "text/html");
        var result = xmlDoc.getElementsByTagName("iframe")[0].outerHTML;
        slide.content = result;
        return slide.content
      }))
    }
  },
  created:function(){
    this.getSlide(this.article);
  },
  watch:{
    article: function(val){
        this.getSlide(val);
      }
  }
}

</script>

<style lang="scss">
@import "../sass/global.scss";

.content {
  margin: 0 auto;
  text-align: center;
  @media only screen and (max-width: $breakpoint){
    iframe {
      width: auto;
    }
  }
}

</style>
