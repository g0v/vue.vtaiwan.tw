<template lang="jade">
  .component
    .subtitle 熱門議題
    .container
      .item(v-for='(item, idx) in hotProposal')
        router-link(:to="'/topic/' + idx")
          img.cover(:src="item.cover")
        .title {{item.title}}
        .owner {{item.owner}}
        .progress_bar
          .progress(v-bind:style="{ width: (item.progress / item.total * 100) + '%' }")
        .progress_text 還有{{item.total - item.progress}}天
</template>

<script>
export default {
  name: 'hot',
  props: ['hotProposal'],
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
    text-align: left;
    justify-content: space-between;
    margin: 0 -10px;
    .item {
      flex: 1;
      margin: 10px;
      a {
        display: block;
        height: 25vw;
        max-height: 300px;
        &:hover {
          opacity: 0.5;
        }
        img.cover {
          width: 100%;
          @include transition(all 0.3s);
        }
      }
      .title {
        font-size: 1.2rem;
        margin:5px;
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
</style>
