<template lang="jade">
div
  .component.fat-only
    .nav-tabs
      a(v-for="(tab, idx) in tablist", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        | {{tab.title}}
    Box(v-for="(tab, idx) in tablist", :list = "mySort[tab.dataName]", v-show="idx == myIdx")
    
  .thin-only(style="position: relative;")
    .m-nav-tabs.ui.left.rail
      .ui.sticky
        a(v-for="(tab, idx) in tablist", :class="{'active': idx == myIdx}", @click="myIdx = idx")
          p {{tab.title}}
    .m-context(id="context")
      Box(v-for="(tab, idx) in tablist", :list = "mySort[tab.dataName]")
    div(v-if="allTopics!==undefined && allTopics.length>0")
      script $('.ui.sticky').sticky({context:"#context"});
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

<style lang="scss" scoped>
.m-nav-tabs{
  left: 0px !important;
  width: 0px;
  a{
    cursor: pointer !important;
    height: 20vh;
    display: table-row;
      p{
        width: 1rem;
        display: table-cell;
        vertical-align: middle;
        font-size: 1.3rem;
        color: #3EACC6;
    }
  }
}
.m-context{
  margin-left:2rem;
}
</style>