<template lang="jade">
  .comment
    .ui.container
      h1
        i.comments.outline.icon 
        | 留言不忘返
      h4 選擇您有興趣的議題留言，提供您寶貴的想法
      h4 參與政策的決議過程，也可以追蹤進度喔!
      p.title
        | Cumment Issues
        br
        | 討論中議題
      .ui.four.column.doubling.relaxed.grid
        .column(v-for="t in tests")
          .inner.ui.segment {{t.a}}
            .ui.top.left.attached.black.label {{t.name}}
          .ui.bottom.right.attached.label @行政院
</template>

<script>
export default {
  name: 'Comment',
  data () {
    return {
        tests: [
          {a:'test',b:'test',name:'金'},
          {a:'test',b:'test',name:'木'},
          {a:'test',b:'test',name:'水'},
          {a:'test',b:'test',name:'火火'},
          {a:'test',b:'test',name:'土土土'},
          {a:'test',b:'test',name:'金'},
          {a:'test',b:'test',name:'金'},
          {a:'test',b:'test',name:'金'},
          {a:'test',b:'test',name:'金'},
          {a:'test',b:'test',name:'金'},
          {a:'test',b:'test',name:'金'}
        ]
    }
  }
}
</script>

<style lang="scss">
.column {
  .inner {
    border: 3px solid black;
    min-height: 20vh;
    .ui.top.left.attached.label {
      min-width: 6em;
      font-size: 0.6em;
    }
  }
  .ui.bottom.right.attached.label {
    background-color: transparent !important;
  }
}
.container {
  padding-bottom: 10vh;
}
</style>
