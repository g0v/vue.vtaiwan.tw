<template lang="jade">
  .component
    // .subtitle 階段說明
    .container
      .step(v-for='(item, index) in step')
        .number {{index+1}}
        .label {{item.label}}
        .description {{item.description}}
</template>

<script>
export default {
  data () {
    return {
      step: [
        {
          label: '即將開始',
          description: '在草案未形成前\n跳脫時間空間限制\n擴大搜集\n利害相關人之意見',
        },
        {
          label: '意見徵集',
          description: '邀請核心利害相關者\n參與諮詢會議\n加入實體見面討論\n一同將意見化為草案',
        },
        {
          label: '研擬草案',
          description: '將成熟的草案加強\n寫成定案\n送交立法院\n追蹤審查進度與結果',
        },
        {
          label: '送交院會',
          description: '將成熟的草案加強\n寫成定案\n送交立法院\n追蹤審查進度與結果',
        },
        {
          label: '歷史案件',
          description: '將成熟的草案加強\n寫成定案\n送交立法院\n追蹤審查進度與結果',
        },
      ],
    }
  }
}
</script>


<style lang="scss" scoped>
  @import "../sass/global.scss";

  .component {
    width: 100%;
    max-width: $comp_max_width;
    margin: 2em auto;
    font-size: 0.8rem;
  }

  .subtitle {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    margin: 1em 0;
  }

  .container {
    // border-top: 1px solid #DDD;
    display: flex;
    justify-content: space-between;
    text-align: center;
    flex-flow: row nowrap;
    // margin: 0 -2vw;
    @media only screen and (max-width: 767px) {
      flex-flow: column wrap;        
    } 
    .step {
      flex: 1;
      margin: 0 1em;
      padding: 1em;
      // height: 10em;
      // margin: 0 -2vw;
      @media only screen and (max-width: 600px) {
        min-width: 100vw;        
      } 
    }
    .number,
    .label,
    .description {
      margin: 0 auto;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      margin-top: 15px;
    }
    .number {
      border-radius: 1em;
      color: white;
      background: lightcoral;
      // border: 1px #000 solid;
      font-size: 5rem;
      font-weight: 700;
      // font-style: oblique;
      line-height: 1.2em;
      width: 1.2em;
      height: 1.2em;
    }
    .label {
      // background: #000;
      // color: #FFF;
      display: inline-block;
      font-size: 2rem;
      font-weight: 700;
      line-height: 1em;
      border-bottom: 3px #000 solid;
      padding: 3px 7px;
    }

    .description {
      text-align: center;      
      line-height: 1.4;
      white-space: pre;
    }
  }
</style>