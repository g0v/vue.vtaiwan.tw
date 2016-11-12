<template lang="jade">
  div Proposal test, metadata = {{ JSON.stringify(metadata) }}
</template>

<script>
import fetch from 'isomorphic-fetch';

function fetchMetaData(store) {

}

export default {
  name: 'Proposal',

  computed: {
    metadata () { return this.$store.state.activeProposalMetadata }
  },

  preFetch(store) {
    return store.dispatch('FETCH_PROPOSAL_METADATA', 'proposal-name-foo');
  },

  beforeMount () {
    // do data fetching if the data is not pre-fetched by server
    //
    if(this.metadata() === null) {
      store.dispatch('FETCH_PROPOSAL_METADATA', 'proposal-name-foo');
    }
  },
}
</script>

<style lang="scss">

</style>
