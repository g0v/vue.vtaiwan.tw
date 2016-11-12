<template lang="jade">
  div Proposal test, metadata = {{ JSON.stringify(metadata) }}
</template>

<script>
import fetch from 'isomorphic-fetch';
export default {
  name: 'Proposal',
  data () {
    return {
      metadata: 'FOO'
    }
  },
  beforeMount () {
    const url = 'https://raw.githubusercontent.com/g0v/vue.vtaiwan.tw/master/metadata.json';

    fetch('https://raw.githubusercontent.com/g0v/vue.vtaiwan.tw/master/metadata.json')
    .then(res => res.json())
    .then(data => console.log(data));
  },
}
</script>

<style lang="scss">

</style>
