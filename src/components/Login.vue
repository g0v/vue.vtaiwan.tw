<style scoped lang="scss">
.component {
  position: relative;
  top: 66px;
}
</style>

<template lang="jade">
.component    
    h1
      i.login.icon
      | 登入
    .ui.divider
    .ui.buttons
      .ui.orange.button
        i.google.icon
        | Google
      .or
      .ui.blue.button 
        i.facebook.icon
        | Facebook
</div>

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
