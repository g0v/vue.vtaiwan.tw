<template lang="jade">
  div Proposal detail
</template>

<style lang="scss" scoped>

</style>


<script>
export default {
  name: 'ProposalDetail',

  computed: {
    metadata () { return this.$store.state.activeProposalMetadata }
  },
}
</script>
