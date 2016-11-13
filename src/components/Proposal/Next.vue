<template lang="jade">
  div Next!

</template>

<style lang="scss" scoped>

</style>


<script>
export default {
  name: 'Next',

  computed: {
    discourseUrl () { return this.$store.state.activeProposalMetadata.discourse_url }
  },
}
</script>
