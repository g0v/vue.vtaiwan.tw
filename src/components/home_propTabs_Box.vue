<template lang="jade">
  .component
    .ui.grid.four.column.padded.doubling.emptyable
      .box.column(v-for="t in list")
        // .inner
        router-link.topic(:to="'/topic/' + t.routeName")

          img(:src ="t.cover || 'http://lorempixel.com/320/240/sports'")
          // .null
          h3.header {{ t.title }}
            // .sub.header {{ t.owner }} 

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

  // @keyframes spin {
  //     from { transform: rotate(0deg); }
  //     to { transform: rotate(360deg); }
  // }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
  .emptyable:empty::after {
    margin: 1em auto;
    content: "*";
    width: 25px;
    height: 25px;
    color: lightcoral;
    
    animation:spin 3s linear infinite;
    // background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAA8FBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmRfStAAAAT3RSTlMAAQIDBAUGBwkLDA0PEBEUFhkaHiAjJikqKy4vMDE4PD9BRUZHS01QV1ldZ2t3eHuOmp2mqqutr7K1usHHyMrM0dXX2dzk5ujt8fP19/n90SbjHAAAAOVJREFUGBmFwYlSgmAAhdH7I2lWomVZmZqV7ftuqxJpC9D3/m8TOTgC40zn6F/W2vmzT/h04ijF7H8SW1JSqc/YhSJGseUQeGzPGVnzOUnGrWukHMJgQxN7/FQUsTzoF5RwDe9G0gEM8kqyPTiU7ABqSluBb0vbcKOsLjR0B3VlteFMq82GUVYRXjWVBV+aDtBUFgzVaLWMshy41y00lbULR+pAV1kuLGoGqCltC3qSjuGjqKRSAOuSch68zSrhAa70pxyAv6mJGq6tkaoP9HacnLEreUVOC4otvDB2qTTTGRKrKvYL2GMwO8IkLjAAAAAASUVORK5CYII=);
  }

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
      // font-size: .8rem;
      margin: .5em;
      // margin-top: .5em;
      // flex: 1;
      // text-align: left;
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
        background-color: lightcoral;
        // border-radius: 0 5px 0 0;
      }
      margin-bottom: 4px;
    }
    .progress_text {
      font-size: .8rem;
      text-align: right;
    }
  }
  
</style>
