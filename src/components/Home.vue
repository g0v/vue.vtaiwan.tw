<template lang="jade">
  .home
    Slideshow(:hotTopics="hotTopics").slideshow
    StepGuide.stepguide
    .ui.divider
    HotProposal(:hotProposal="hotTopics").hotproposal
    .ui.divider
    ProposalTab.proposalTab

</template>


<script>
import Slideshow from './home_Slideshow.vue'
import StepGuide from './home_StepGuide.vue'
import HotProposal from './home_HotProposal.vue'
import ProposalTab from './home_ProposalTab.vue'

export default {
  name: 'Home',
  components: {
    Slideshow,
    StepGuide,
    HotProposal,
    ProposalTab
  },
  data () {
    return {
      hotTopics: [
        {   slogan:'邁向世界的舞台', 
            title:'公司英文名稱登記', 
            status:'討論中',
            progress: 10,
            total: 30,
            owner: '內政部',
            cover:'http://static.thousandwonders.net/Taiwan.original.3738.jpg'},        
        {   slogan:'理想與現實',
            title:'公司法中的社會企業',
            status:'討論中',
            progress: 18,
            total: 30,
            owner: '勞動部',
            cover:'http://lorempixel.com/320/240/transport'},        
        {   slogan:'事做不夠假放不夠',
            title:'一例一修草案', 
            status:'已送審', 
            progress: 24,
            total: 30,
            owner: '勞動部',
            cover:'http://lorempixel.com/320/240/sports'}
      ]
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
    }
    p {
        font-size: 1rem;
        text-align: left;
        line-height: 155%;
        padding: 5px;
    }
</style>
