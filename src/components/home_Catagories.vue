<template lang="jade">
  .component
    .ui.four.column.doubling.grid
      .column(v-for="(c,idx) in catagories")
        .inner
          router-link(:to="'/catagory/'+idx") 
            .txt {{c.t}}
            img(:src="c.cover || 'http://lorempixel.com/320/240/transport'")
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
  @import "bourbon";
  
  .component {
    width: 100%;
    margin-top: 4em;
    padding: 3em;
    .inner {
      border: 1px solid black;
      min-height: 6em;
      height: calc(25vw - 4em);
      @media only screen and (max-width: 767px) {
        height: calc(50vw - 5em);        
      }
      @media only screen and (max-width: 991px) and (min-width: 768px) {
        height: calc(50vw - 5em);
      }
      a {
        display : flex;
        align-items : center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        @include transition(all 0.3s);
        .txt {
          display: inline;
          position: relative;
          z-index: 1;
          color: white;
          text-shadow: 0 2px 0 black;
          font-size: 2em;
          font-weight: lighter;
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        &:hover {
          opacity: 0.5;

        }
      }
    }
  }
</style>