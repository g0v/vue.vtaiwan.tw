<template lang="jade">
  .component
    .nav-tabs
      a(v-for="(tab, idx) in tablist", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        | {{tab.title}}
    Box(:list = "news", v-show="myIdx == 0")
    Box(:list = "running", v-show="myIdx == 1")
    Box(:list = "drafts", v-show="myIdx == 2")
    Box(:list = "soon", v-show="myIdx == 3")
           

</template>

<script>
  // import Tabs from './home_prop_Tabs.vue'
  // import TabPane from './home_prop_TabPane.vue'
  import Box from './home_propTabs_Box.vue'

  export default {
    name: 'proposalTab',
    props: ['allTopics'],
    components: {
     // Tabs,
     // TabPane,
      Box
    },
    data () {
      return {
        myIdx: 0,
        tablist: [
          {title: '最新議題'},
          {title: '討論階段'},
          {title: '草案階段'},
          {title: '即將開始'}
        ]
      }
    },
    computed: {
      news: function () {
        return this.allTopics.sort(function(a,b){
          return a.progress - b.progress;
        }).slice(0,8)
      },
      running: function () {
        return this.allTopics.slice(1,9);
      },
      drafts: function () {
        return this.allTopics.slice(2,10);
      },
      soon: function () {
        return this.allTopics.slice(3,11);
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
    font-size: 1.2rem;
    a {
      color: black;
      padding: .1em .5em;
      margin: 0 1em;
      &.active {
        border-bottom: 4px black solid;
      }
    }    
  }
</style>