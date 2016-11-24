<style lang="scss" scoped>
  .component {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 0.8rem;

  }
</style>

<template lang="jade">
  .component
    tabs
      tab-pane(title="最新議題")
        span 最新議題
      tab-pane(title="討論階段")
        span 討論階段
      tab-pane(title="草案階段")
        span 草案階段
      tab-pane(title="即將開始")
        span 即將開始
</template>

<script>
  import Tabs from './home_prop_Tabs.vue'
  import TabPane from './home_prop_TabPane.vue'

  export default {
    components: {
      Tabs,
      TabPane,
    }
  }
</script>
