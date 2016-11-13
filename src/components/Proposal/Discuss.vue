<template lang="jade">
  div Discourse url = {{ discourseUrl }}

</template>

<style lang="scss" scoped>

</style>


<script>
export default {
  name: 'Timeline',

  computed: {
    discourseUrl () { return this.$store.state.activeProposalMetadata.discourse_url }
  },
}
</script>
