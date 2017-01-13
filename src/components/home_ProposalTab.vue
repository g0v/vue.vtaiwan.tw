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
/*          {title: '最新議題', dataName: 'news'},
          {title: '討論階段', dataName: 'running'},
          {title: '草案階段', dataName: 'drafts'},
          {title: '即將開始', dataName: 'soon'}*/
          {title: '即將開始', dataName: 'soon'},
          {title: '意見徵集', dataName: 'discuss'},
          {title: '研擬草案', dataName: 'curate'},
          {title: '送交院會', dataName: 'deploy'},
          {title: '歷史案件', dataName: 'history'}
        ]
      }
    },
    computed: {
      mySort: function () { 

/*        var news = this.allTopics.slice()
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
*/
        var soon = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="即將開始"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        var discuss = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="意見徵集"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        var curate = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="研擬草案"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        var deploy = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="送交院會"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        var history = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="歷史案件"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        return {
/*          news: news,
          running: running,
          drafts: drafts,
          soon: soon*/
          soon: soon,
          discuss: discuss,
          curate: curate,
          deploy: deploy,
          history: history
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../sass/global.scss";

  .component {
    width: 100%;
    max-width: $comp_max_width;
    // min-height: 20em;
    margin: 0 auto;
    padding: 0 20px;
    // font-size: 0.8rem;
  }

  .nav-tabs {
    display: flex;
    justify-content: center;
    // cursor: pointer;
    // font-size: 0.8rem;
    border-bottom: 1px solid gray;
    a {
      color: black;
      padding: .2em 1em;
      margin: 0 1em;
      border: 1px solid gray;

      @include transition(all 0.1s ease);
      border-bottom: 0px;
      // background: white;
      &:hover, &:active, &.active {
        border-bottom: 5px lightcoral solid;
      }
    }    
  }
</style>