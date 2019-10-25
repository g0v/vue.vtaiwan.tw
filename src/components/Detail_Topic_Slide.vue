<template lang="pug">
  .component
    h3.ui.header.centered
      i.icon.info.circle
      | 簡介

    .wrapper.ui.container
      .iframe
        div(v-html = "slide.iframe")
      .info
        .crop(v-html = 'slide.info')

    h3.ui.header.centered(v-if='link')
      router-link.ui.big.teal.button(:to="link")
        p
          i.comments.icon
          | 進入討論
</template>

<script>

import caxios from '../js/request'

export default {
  props: ['articleId', 'link'],
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
          try {
              let iframe = xmlDoc.getElementsByTagName("iframe")[0].outerHTML
              slide.iframe = iframe
          } catch (e) {};
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
  padding: 1rem 0;
  .wrapper {
    display: flex;
    flex-flow: row wrap;
    .iframe {
      margin: 1rem auto;
      @media only screen and (max-width: $breakpoint){
        margin: 0 auto;
        text-indent: -1em;
      }
    }
    .info {
      flex: 1 0 50%;
      padding: 1rem 0 1rem 1em;
      font-size: 1.2rem;
      line-height: 1.5;
      @media only screen and (max-width: $breakpoint){
        flex: 0 0 100%;
      }
      .crop {
        max-height: 22em; /* align with iframe height */
        overflow: auto;
      }
    }
  }
}
</style>
