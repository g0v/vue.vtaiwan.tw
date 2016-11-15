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

</template>

<script>

import Slideshow from './home_Slideshow.vue'
import StepGuide from './home_StepGuide.vue'

export default {
  name: 'Home',
  components: {
    Slideshow,
    StepGuide
  },
  data () {
    return {
        data: '...'
    }
  }
}
</script>
