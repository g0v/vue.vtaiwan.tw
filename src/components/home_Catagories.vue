<template lang="jade">
  .component
    .ui.four.column.doubling.grid
      .column(v-for="(c,idx) in catagories")

        .thin-only.inner
          router-link(:to="'/catagory/'+c.routeName") 
            .txt {{c.t}}
            img(:src="c.cover || 'http://lorempixel.com/320/240/transport'")

        .fat-only
          router-link.ui.image.massive.label(:to="'/catagory/'+c.routeName") 
            img(:src="c.cover || 'http://lorempixel.com/320/240/transport'")
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
  
  .component {
    width: 100%;
    max-width: 1200px;
    margin: 2em auto 0 auto;
    padding: 0 3em;

    .inner {
      // border: 1px solid black;
/*      min-height: 6em;
      height: calc(25vw - 4em);
      @media only screen and (max-width: 767px) {
        height: calc(50vw - 5em);        
      }
      @media only screen and (max-width: 991px) and (min-width: 768px) {
        height: calc(50vw - 5em);
      }*/
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: 0 3px 1em rgba(0, 0, 0, 0.2);
        // width: 100%;
        // height: 100%;
        overflow: hidden;
        .txt {
          position: relative;
          z-index: 1;
          display: inline;
          font-size: 3rem;
          line-height: 3em;
          @include transition(all 0.3s);
          text-shadow: 1px 1px 1em white;
          color: black;
          font-weight: 700;
        }
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          @include transform(translate(-50%,-50%));
          max-width: 100%;
          height: auto;
          @include transition(all 0.3s);
          opacity: 0.5;
        }

        &:hover {
          .txt {
            text-shadow: 1px 1px 1em black;
            color: white;
          }
          img {
            opacity: 1;
          }
        }
      }
    }
  }
</style>