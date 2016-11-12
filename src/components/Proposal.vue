<template lang="jade">
  div Proposal test, metadata = {{ JSON.stringify(metadata) }}
</template>

<script>
import fetch from 'isomorphic-fetch';
export default {
  name: 'Proposal',
  data () {
    return {
      metadata: null,
    }
  },
  beforeMount () {
    const url = 'https://raw.githubusercontent.com/g0v/vue.vtaiwan.tw/feature/proposal-page/metadata.json';

    fetch(url)
    .then(res => res.json())
    .then(data => this.metadata = data);
  },
}
</script>

<style lang="scss">

</style>
