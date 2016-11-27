
<template lang="jade">
  .component
    .ui.container
      h1.ui.header {{ cata.t }}

</template>

<script>
export default {
  name: 'Detial_Catagory',
  data () {
    return {
      catagories: [
        {t: '商業'},
        {t: '經濟'},
        {t: '科技'},
        {t: '文化'},
        {t: '交通'},
        {t: '體育', 
          cover: 'http://lorempixel.com/320/240/sports'},
        {t: '社會'},
        {t: '農業'}
        ]
    }
  },
  computed: {
    cata: function () {
      return this.catagories[this.$route.params.cId]
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
