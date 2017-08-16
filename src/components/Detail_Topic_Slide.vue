<template lang="jade">
  .component
    .iframe
      div(v-html = "slide.iframe")
    .info
      div(v-html = 'slide.info')
      h1.ui.header
        router-link.ui.big.teal.button(:to="$route.path + '#disc'")
          p
            i.comments.icon
            | 進入討論

</template>

<script>

import caxios from '../js/request'

export default {
  props: ['articleId'],
  data () {
    return {
      slide: {
        iframe: '',
        info: ''
      }
    }
  },
  methods:{
    getSlide(id){
      /* shallow copy */
      let slide = this.slide
      caxios.getTopic(id)
        .then(response => {
          let post = response.data['post_stream']['posts'][0]['cooked'] // 取得議題時間軸內容
          let xmlDoc = new DOMParser().parseFromString(post, "text/html")
          let iframe = xmlDoc.getElementsByTagName("iframe")[0].outerHTML
          slide.iframe = iframe
          let info = post.split("<hr>")[1]; // 取得詳細內容(第一篇)
          slide.info = info.replace(/<if.*slideshare.*e>/, ""); //詳細內容slideshare拿掉
        })
    }
  },
  created:function(){
    this.getSlide(this.articleId);
  },
  watch:{
    articleId: function(val){
        this.getSlide(val);
      }
  }
}

</script>

<style lang="scss" scoped>
@import "../sass/global.scss";
.component {
  background-color: #eee;
  padding: 1em 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  .iframe {
    flex: 0 0 40%;
    text-align: right;
    @media only screen and (max-width: $breakpoint){
      flex: 0 0 100%;
      text-align: center;
    }
  }
  .info {
    flex: 0 0 50%;
    padding: 0 1em 0 1em;
    font-size: 1.2rem;
    @media only screen and (max-width: $breakpoint){
      flex: 0 0 100%;
      h1 {
        text-align: center;
      }
    }
  }
}
</style>