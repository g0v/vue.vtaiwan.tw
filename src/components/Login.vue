<style scoped lang="scss">
  @import "../sass/global.scss";
</style>

<template lang="jade">
  .component
    h1
      i.user.icon
      | 登入
    // .ui.divider
    .ui.huge.buttons
      .ui.orange.button
        i.google.icon
        | Google
      .or
      .ui.blue.button 
        i.facebook.icon
        | Facebook

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      data: '...'
    }
  }
}
</script>
