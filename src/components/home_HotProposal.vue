<style lang="scss" scoped>
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
      margin: 0 10px;
    }
    .cover {
      width: 100%;
    }
    .title {
      font-size: 1.2rem;
    }
    .owner {
      color: #AAA;
    }
    .progress_bar {
      background-color: #CCC;
      padding: 2px 0;
    }
    .progress {
      height: 4px;
      background-color: #000;
    }
  }
</style>

<template lang="jade">
  .component
    .subtitle 熱門議題
    .container
      .item(v-for='(item, index) in hotProposal')
        img.cover(:src="item.cover")
        .title {{item.title}}
        .owner {{item.owner}}
        .progress_bar
          .progress(v-bind:style="{ width: (item.progress / item.total * 100) + '%' }")
        .progress_text 還有{{item.total - item.progress}}天
</template>

<script>
export default {
  data () {
    return {
      hotProposal: [
        {
          title: '公司英文名稱登記',
          owner: '內政部',
          cover: 'http://lorempixel.com/320/240/city',
          progress: 10,
          total: 30,
        },
        {
          title: '公司法中的社會企業',
          owner: '勞動部',
          cover: 'http://lorempixel.com/320/240/cats',
          progress: 18,
          total: 30,
        },
        {
          title: '事做不夠假放不夠',
          owner: '交通部',
          cover: 'http://lorempixel.com/320/240/transport',
          progress: 24,
          total: 30,
        },
      ],
    }
  }
}
</script>
