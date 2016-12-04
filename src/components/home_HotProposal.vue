<template lang="jade">
  .component
    .subtitle {{header}}
    .container
      .item(v-for='(item, idx) in hotProposal')
        router-link(:to="'/topic/' + item.routeName")
          img.cover(:src="item.cover")
        .null
        .foot
          .title {{item.title}}
          .owner {{item.owner}}
          .progress_bar
            .progress(v-bind:style="{ width: (item.progress / item.total * 100) + '%' }")
          .progress_text 還有{{item.total - item.progress}}天
</template>

<script>
export default {
  name: 'hot',
  props: ['hotProposal', 'header'],
  data () {
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 0.8rem;
  }

  .subtitle {
    text-align: left;
    font-size: 1.2rem;
  }

  .container {
    display: flex;
    flex-flow: row wrap;
    text-align: left;
    // justify-content: space-between;
    justify-content: space-around;
    margin: 0 -10px;
    .item {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      position: relative;
      margin: 10px;
      min-width: 22vw;
      max-width: 40vw;
      @media only screen and (max-width: 420px) {
        min-width: 40vw;
      }
      a {
        flex: 0 0 6em;
        &:hover {
          opacity: 0.5;
        }
        img.cover {
          width: 100%;
          @include transition(all 0.3s);
        }
      }
      .null {
        flex: 1 1 0;
      }
      .foot {
        flex: 0 0 10em;
        display: flex;
        flex-flow: column nowrap;       
        .title {
          font-size: 2vw;
          line-height: 1.1;
          margin: .5em 0;
          // min-height: 2.2em;
        }
        .owner {
          color: #AAA;
          margin:5px;
        }
        .progress_bar {
          background-color: #CCC;
          padding: 2px 0;
          .progress {
            height: 6px;
            background-color: #000;
            border-radius: 0 5px 0 0;
          }
          margin-bottom: 4px;
        }
      }
    }    
  }
</style>
