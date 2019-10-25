<template lang="pug">
.component
  .ui.text.container
    h1 {{locate.title}}
    .meta
      span {{locate.year}}
      span {{locate.region}}
      span {{locate.publish_date}}
    .body(v-html="locate.content")
    .ui.divider
    .ui.teal.label
      p {{locate.category}}
    p.author
      a(:href="locate.link", target='_blank') {{locate.organization}}
</template>

<script>


export default {
  name: 'fancybox',
  props:['locate']
}
</script>

<style scoped lang="scss">
@import "../sass/global.scss";
.body {
  text-align: justify;
}
.meta{
  color: dimgray;
  font-size: 80%;
  span:not(:last-child)::after {
    content: '|';
    margin: 0 1ch;
  }
}
.author{
  float: right;
}
</style>