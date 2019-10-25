<template lang="pug">
  .component
    //- .fat-only
    div.styles.context(v-html='information')
    //- .thin-only
    //-   div.styles.context(v-html='information')
    h1.centered.ui.header
      router-link.ui.big.teal.button(:to="$route.path + '#disc'")
        i.comments.icon
        | 進入討論
</template>

<script>

  import caxios from '../js/request'

  export default {
  name: 'Detial_Topic_Description',
  props: ['articleId'],
    data() {
      return {
        information: "" // 詳細內容
      }
    },
    methods: {
      getDescription(id) {
        caxios.get('https://talk.vtaiwan.tw/t/' + id + '.json?include_raw=1')
          .then((response) => {
            var detail_info = response.data['post_stream']['posts'][0]['cooked'].split("<hr>")[1]; // 取得詳細內容(第一篇)
            this.information = detail_info.replace(/<if.*slideshare.*e>/, ""); //詳細內容slideshare拿掉
            return this.information;
          })
      }
    },
    created: function () {
      this.getDescription(this.articleId);
    },
    updated: function () {
      this.getDescription(this.articleId);
    }
  }

</script>

<style lang="scss" module="styles">

@import "../sass/global.scss";

.context {
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
  @media only screen and (max-width: $breakpoint) {
    // .context {
    // font-family: $main_font;
    font-size: 1rem;
    iframe {
      width:100%;
    }
    // h1,h2,h3,h4,h5,h6 {
      // text-align: center;
    // }
    // p,li,ol {
      // text-align: left;
    // }
    // blockquote {
      // margin:0 0 10px 0;
      // text-align: left;
      // padding: 5px;
      // border-left: 5px solid #e9e9e9;
      // background-color: #f8f8f8;
      // font-weight: 600;
    // }
  }
  // }
}
</style>
