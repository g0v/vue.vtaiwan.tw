<template lang="jade">
  .component
    .ui.container
      .ui.massive.horizontal.celled.selection.list
        .item(v-for="(c,idx) in catagories")
          router-link(:to="'/catagory/'+c.routeName") 
            img.ui.avatar.image(:src="c.cover || 'http://lorempixel.com/320/240/transport'")
            | {{c.t}}

</template>

<script>
export default {
  name: 'catagories',
  props: ['catagories'],
  data: function () {
    return {
      //...
    }
  }
}
</script>


<style lang="scss" scoped>
  @import "../sass/global.scss";
  
</style>