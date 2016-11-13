<template lang="jade">
  div
    .header
      h1
        | {{ metadata.proposal_title }}
        span.status {{ metadata.status_code }}
      p.description {{ metadata.description }}
      iframe(v-bind:src="metadata.slide_embed_url")

    .tabs
      router-link(:to="`/proposals/${$route.params.code}/`") 詳細內容
      router-link(:to="`/proposals/${$route.params.code}/timeline`") 議題時間軸
      router-link(:to="`/proposals/${$route.params.code}/discuss`") 參與討論
      router-link(:to="`/proposals/${$route.params.code}/next`") 下一階段

    router-view /

    div Proposal test, metadata = {{ JSON.stringify(metadata) }}
</template>

<style lang="scss" scoped>

</style>


<script>
export default {
  name: 'Proposal',

  computed: {
    metadata () { return this.$store.state.activeProposalMetadata }
  },

  preFetch(store) {
    return store.dispatch('FETCH_PROPOSAL_METADATA', store.state.route.params.code);
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
