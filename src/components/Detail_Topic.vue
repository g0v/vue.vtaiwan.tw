
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
  props: [],
  data () {
    return {
      steps: ['詳細內容', '議題時間軸', '參與討論', '下一階段'],
      allTopics: [
        {   slogan:'邁向世界的舞台', 
            title:'公司英文名稱登記', 
            status:'討論中',
            progress: 10,
            total: 30,
            owner: '內政部',
            catagory: '科技',
            cover:'http://static.thousandwonders.net/Taiwan.original.3738.jpg',
            likes: 6543
        },        
        {   slogan:'理想與現實',
            title:'公司法中的社會企業',
            status:'討論中',
            progress: 18,
            total: 30,
            owner: '經濟部',
            catagory: '經濟',
            cover:'http://lorempixel.com/320/240/transport',
            likes: 4543
        },        
        {   slogan:'事做不夠假放不夠',
            title:'一例一修草案', 
            status:'已送審', 
            progress: 24,
            total: 30,
            owner: '勞動部',
            catagory: '社會',
            cover:'http://lorempixel.com/320/240/sports',
            likes: 2543
        },        
        {   slogan:'測試一下',
            title:'測試一下', 
            status:'已送審', 
            progress: 24,
            total: 30,
            owner: '不管部',
            cover: 'http://lorempixel.com/320/240/sports',
            likes: 143
        }
      ]
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
