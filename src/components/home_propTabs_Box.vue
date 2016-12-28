<template lang="jade">
  .component
    .ui.four.column.doubling.grid
      .box.column(v-for="t in list")
        .inner
        router-link.topic(:to="'/topic/' + t.routeName")
          img(:src ="t.cover || 'http://lorempixel.com/320/240/sports'")
          .null
          h3.header {{ t.title }}
            .sub.header {{ t.owner }} 
</template>

<script>
  export default {
    name: 'box',
    props: ['list'],
    data() {
      return {
        //...
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    display:flex !important;
  }

  a {
    flex: 1 1 20%;
    display: flex;
    flex-flow: column nowrap;
    img {
      flex: 1;
      max-width: 100%;
    }
    .null {
      flex: 1 1;
    }
    h3 {
      flex: 1 1;
      color: black;
      font-size: .8rem;
      margin: 0;
      margin-top: .5em;
      flex: 1;
      text-align: left;
      .sub.header {
        color: #999;
        font-size: .5em;
      }
    }
  }
</style>
