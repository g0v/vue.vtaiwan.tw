<template lang="jade">
  .component
    .nav-tabs
      a(v-for="(tab, idx) in tablist", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        | {{tab.title}}

    Box(v-for="(tab, idx) in tablist", :list = "mySort[tab.dataName]", v-show="idx == myIdx")

</template>

<script>
  import Box from './home_propTabs_Box.vue'

  export default {
    name: 'proposalTab',
    props: ['allTopics'],
    components: {
      Box
    },
    data () {
      return {
        myIdx: 0,
        // myTab: {dataName: 'news'},
        tablist: [
          {title: '最新議題', dataName: 'news'},
          {title: '討論階段', dataName: 'running'},
          {title: '草案階段', dataName: 'drafts'},
          {title: '即將開始', dataName: 'soon'}
        ]
      }
    },
    computed: {
      mySort: function () { 
        var news = this.allTopics.slice()
          .sort(function(a,b) {
            return a.progress - b.progress;
          }).slice(0,8);
        var running = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="討論中"
          })
          .sort(function(a,b) {
            return a.progress - b.progress;
          }).slice(0,8);
        var drafts = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="寫草案"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);
        var soon = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="即將開始"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        return {
          news: news,
          running: running,
          drafts: drafts,
          soon: soon
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .component {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 0.8rem;
  }

  .nav-tabs {
    display: flex;
    cursor: pointer;
    font-size: 0.8rem;
    a {
      color: black;
      padding: .2em .5em;
      margin: 0 1em;
      &:hover, &:active, &.active {
        border-bottom: 4px black solid;
      }
    }    
  }
</style>