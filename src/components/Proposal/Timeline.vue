<template lang="jade">
  div
    | Timeline
    pre {{ JSON.stringify(stages) }}

</template>

<style lang="scss" scoped>

</style>


<script>
export default {
  name: 'Timeline',

  computed: {
    stages () { return this.$store.state.activeProposalMetadata.stage }
  },
}
</script>
