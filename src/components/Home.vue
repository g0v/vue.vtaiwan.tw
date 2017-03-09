<template lang="jade">

  .home
    Slideshow(:hotTopics="hotTopics", :allTopics="allTopics").slideshow
    // StepGuide.stepguide
    // .ui.divider
    // HotProposal(:hotProposal="hotTopics", header="熱門議題").hotproposal
    // .ui.divider
    ProposalTab.proposalTab(:allTopics="allTopics")
    // .ui.divider
    News(:allNews="allNews")
    Info(:allInfo="allInfo")
   // Catagories(:catagories="catagories").catagories

</template>


<script>
import Slideshow from './home_Slideshow.vue'
// import StepGuide from './home_StepGuide.vue'
// import HotProposal from './home_HotProposal.vue'
import ProposalTab from './home_ProposalTab.vue'
// import Catagories from './home_Catagories.vue'
import News from './app_News.vue'
import Info from './home_observe.vue'


export default {
  name: 'Home',
  components: {
    Slideshow,
    // StepGuide,
    // HotProposal,
    ProposalTab,
    News,
    Info
    // Catagories,


  },
  props:['allTopics', 'catagories','allNews','allInfo'],
  data () {
    return {
      n_hot: 5
    }
  },
  computed: {
      hotTopics: function () {
          return this.allTopics.sort(function(a, b){
              return (b.likes - a.likes)
          }).slice(0,this.n_hot)
      }
  }
}
</script>

<style scoped lang="scss">
@import "../sass/global.scss";
.home {
    // ****************** push back home by nav height
    @media screen and (min-width: $breakpoint){
        margin-top: calc( -1 * #{$navHeight} );
    }
    width: 100%;
    min-width: 320px;
    margin-left: auto;
    margin-right: auto;
    // padding-bottom: 5vh;
    // margin-top:-65px;
}
p {
    font-size: 1rem;
    text-align: left;
    line-height: 155%;
    padding: 5px;
}
</style>
