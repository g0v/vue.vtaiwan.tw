
<template lang="jade">
  .component
    .ui.container
      h1.ui.header {{ myC.t }}
    HotProposal(:hotProposal="cataTopics", :header="myC.t").hotproposal


</template>

<script>

import HotProposal from './home_HotProposal.vue'

export default {
  name: 'Detail_Catagory',
  components: {
    HotProposal
  },
  props: ['catagories', 'allTopics'],
  data () {
    return {
      //...
    }
  },
  computed: {
    myC: function () {
      var rtName = this.$route.params.cRouteName;
      return this.catagories.filter(function (o) {
        return o.routeName == rtName;
      })[0]
      // return this.catagories[this.$route.params.cId]
    },
    cataTopics: function () {
      var myCT = this.myC.t;
      return this.allTopics.filter(function(o) {
        return o.catas.indexOf(myCT) > -1
      })
    }
  }
}
</script>

<style scoped lang="scss">
.component {
  position: relative;
  top: 66px;
}

p {
  text-align: left;
}

</style>
