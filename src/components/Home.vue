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


<template lang="jade">
  .home
    Slideshow.slideshow
    StepGuide.stepguide
    .ui.divider
    HotProposal.hotproposal
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
        data: '...'
    }
  }
}
</script>
