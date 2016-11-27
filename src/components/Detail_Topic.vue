
<template lang="jade">
  .component
    .ui.container
      h2.ui.header {{t.title}}
        .sub.header {{t.status}}
      br
      video(controls, :style="{'background-image': 'url('+t.cover+')'}")
        source(:src = "t.video || 'https://github.com/g0v/vue.vtaiwan.tw/blob/master/vTaiwan%20v4%20record.mov'", type="video/mov")
      br
      .steps
        a(v-for="s in steps") {{s}}

</template>

<script>
export default {
  name: 'Detial_Topic',
  props: ['allTopics'],
  data () {
    return {
      steps: ['詳細內容', '議題時間軸', '參與討論', '下一階段']
    }
  },
  computed: {
    t: function () {
      return this.allTopics[this.$route.params.tId]
    }
  }
}
</script>

<style scoped lang="scss">
.component {
  position: relative;
  top: 66px;
}

p {
  text-align: left;
}

video {
  min-width: 80%;
  min-height: 50vh;
  background-color: #ccc;
  background-size: cover;
}

.steps {
  a {
    padding: 0 2em;
    color: black;
    &:hover, &:active, &.active {
      border-bottom: 2px solid black;
    }
  }
}
</style>
