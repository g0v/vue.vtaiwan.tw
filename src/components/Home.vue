<template lang="jade">
  .home

    Slideshow(:hotTopics="hotTopics", :allTopics="allTopics").slideshow

    // StepGuide.stepguide

    // .ui.divider

    // HotProposal(:hotProposal="hotTopics", header="熱門議題").hotproposal

    // .ui.divider

    ProposalTab.proposalTab(:allTopics="allTopics")

    .ui.divider

    Catagories(:catagories="catagories").catagories


</template>


<script>
import Slideshow from './home_Slideshow.vue'
import StepGuide from './home_StepGuide.vue'
// import HotProposal from './home_HotProposal.vue'
import ProposalTab from './home_ProposalTab.vue'
import Catagories from './home_Catagories.vue'



export default {
  name: 'Home',
  components: {
    Slideshow,
    StepGuide,
    // HotProposal,
    ProposalTab,
    Catagories,


  },
  props:['allTopics', 'catagories'],
  data () {
    return {
      //...
    }
  },
  computed: {
      hotTopics: function () {
          return this.allTopics.sort(function(a, b){
              return (b.likes - a.likes)
          }).slice(0,3)
      }
  }
}
</script>

<style scoped lang="scss">
    .home {
        width: 100%;
        min-width: 320px;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 5vh;
        margin-top:-65px;
    }
    p {
        font-size: 1rem;
        text-align: left;
        line-height: 155%;
        padding: 5px;
    }
</style>
