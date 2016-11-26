<template lang="jade">
  .home
    Slideshow(:hotTopics="hotTopics").slideshow
    StepGuide.stepguide
    .ui.divider
    HotProposal(:hotProposal="hotTopics").hotproposal
    .ui.divider
    ProposalTab.proposalTab
    Catagories(:catagories="catagories").catagories

</template>


<script>
import Slideshow from './home_Slideshow.vue'
import StepGuide from './home_StepGuide.vue'
import HotProposal from './home_HotProposal.vue'
import ProposalTab from './home_ProposalTab.vue'
import Catagories from './home_Catagories.vue'

export default {
  name: 'Home',
  components: {
    Slideshow,
    StepGuide,
    HotProposal,
    ProposalTab,
    Catagories
  },
  data () {
    return {
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
      ],
    catagories: [
      {t: '商業'},
      {t: '經濟'},
      {t: '科技'},
      {t: '文化'},
      {t: '交通'},
      {t: '體育', 
        cover: 'http://lorempixel.com/320/240/sports'},
      {t: '社會'},
      {t: '農業'}
      ]
    }
  },
  computed: {
      hotTopics: function () {
          return this.allTopics.sort(function(o){
              return 0 - o.likes
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
    }
    p {
        font-size: 1rem;
        text-align: left;
        line-height: 155%;
        padding: 5px;
    }
</style>
