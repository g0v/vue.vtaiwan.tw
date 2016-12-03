
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
        router-link(v-for="(s,idx) in steps", :to="'/topic/'+$route.params.tId+'/step/'+idx", exact='') {{s}}

      br
    .step(v-if="$route.params.sId == 0")
    .step(v-if="$route.params.sId == 1")
      // 時間軸
      .event-list
        .item(v-for = "(ev,idx) in (t.eventList || fooList)", :class="['dark','gloom','light'][idx % 3]")
          .big {{ ev.y }}年{{ ev.m }}月
          .small {{ ev.d }}日
            br
            | {{ ev.title }}
          .null
    .step(v-if="$route.params.sId == 2")
      //iframe from polis
      .ui.container
        .polis(:data-conversation_id=" t.polisId || fooPolisId")
        script(async='true', src='https://pol.is/embed.js')
    .step(v-if="$route.params.sId == 3")


</template>

<script>
export default {
  name: 'Detial_Topic',
  props: ['allTopics'],
  data () {
    return {
      steps: ['詳細內容', '議題時間軸', '參與討論', '下一階段'],
      // myS: '詳細內容'
      fooPolisId: '89bzf78kbn',
      fooList: [
        {y: 2016, m:10, d: 8, title: '工作組會議' },
        {y: 2016, m:10, d: 8, title: '工作組會議' },
        {y: 2016, m:10, d: 8, title: '工作組會議' },
        {y: 2016, m:9, d: 30, title: '進入草案階段' },
        {y: 2016, m:8, d: 11, title: '討論爭點出現' }
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
  display: inline-flex;
  width: 66vw;
  justify-content: center;
  a {
    flex: 1;
    padding: .5em .5em;
    color: black;
    font-size: 1.2rem;
    line-height: 1.1;
    &:hover, &:active, &.active {
      border-bottom: 2px solid black;
    }
    &.router-link-active {
      border-bottom: 2px solid black;  
    }
  }
}

@media only screen and (max-width: 767px) {
  .steps {
    flex-direction: column;  
    a {
      max-width: 50vw; 
      flex: 1 1 5vh;      
    }      
  }
} 




.event-list {
  display: flex;
  flex-flow: column nowrap;
  .item {
    display: flex;
    text-align: left;
    padding: 1em;
    font-size: 1.2rem;
    &.dark { background-color: #ccc }
    &.gloom { background-color: #ddd }
    &.light { background-color: #eee }
    .big {
      display: flex;
      align-items: center;
      flex: 1 0 6em;
    }
    .small {
      flex: 1 0 6em;
      font-size: 0.8em;
    }
    .null {
      flex: 5 2;
    }
  }
}

/*
.clickDeselectsHull {
  display: none !important;
}*/



</style>
