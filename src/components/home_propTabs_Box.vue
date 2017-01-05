<template lang="jade">
  .component
    .ui.grid.four.column.padded.doubling
      .box.column(v-for="t in list")
        // .inner
        router-link.topic(:to="'/topic/' + t.routeName")

          img(:src ="t.cover || 'http://lorempixel.com/320/240/sports'")
          // .null
          h3.header {{ t.title }}
            .sub.header {{ t.owner }} 

          .progress_bar
            .progress(v-bind:style="{ width: (t.progress / t.total * 100) + '%' }")
          .progress_text(v-if="t.status==='討論中'") 還有{{Math.floor(t.total - t.progress)}}天
          .progress_text(v-else) 討論已結束
          
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
  @import "../sass/global.scss";

  .box {
    display: flex !important;
  }

  a {
    // border: 1px solid #DDD;
    box-shadow: 0 3px 1em hsla(0,0,0%,0.1);
    // flex: 1 1 20%;
    display: flex;
    flex-flow: column nowrap;
    @include transition(all .1s ease);
    &:hover {
      margin: 3px -3px -3px 3px;
    }
    img {
      flex: 1 1;
      max-width: 100%;
      height: auto;
    }
    // .null {
    //   flex: 1 1;
    // }
    h3 {
      // flex: 1 1;
      color: black;
      font-family: $main_font;
      font-size: .8rem;
      margin: .5em;
      // margin-top: .5em;
      // flex: 1;
      text-align: left;
      .sub.header {
        color: #999;
        font-size: .5em;
      }
    }
    .progress_bar {
      // flex: 0 1;
      background-color: #CCC;
      padding: 0;
      // margin: 3px 0;
      .progress {
        height: 5px;
        background-color: #426;
        // border-radius: 0 5px 0 0;
      }
      margin-bottom: 4px;
    }
  }
  
</style>
