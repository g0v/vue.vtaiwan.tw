
<template lang="jade">
  .component
    .ui.container
      h1.ui.header {{ cata.t }}

</template>

<script>
export default {
  name: 'Detial_Catagory',
  props: ['catagories'],
  data () {
    return {
      //...
    }
  },
  computed: {
    cata: function () {
      var rtName = this.$route.params.cRouteName;
      return this.catagories.filter(function (o) {
        return o.routeName == rtName;
      })[0]
      // return this.catagories[this.$route.params.cId]
    }
  }
}
</script>

<style scoped lang="scss">
.component {
  position: relative;
  top: 66px;
}

p {
  text-align: left;
}

</style>
