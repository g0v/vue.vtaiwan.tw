<style lang="scss" scoped>
  .component {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
  }

  .subtitle {
    text-align: center;
  }

  .container {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin: 0 -20px;
    .step {
      flex: 1;
      margin: 0 20px;
    }
    .number,
    .label,
    .description {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
    }
    .number {
      border-radius: 99px;
      border: 1px #000 solid;
      width: 26px;
      height: 26px;
    }
    .label {
      background: #000;
      color: #FFF;
      display: inline-block;
      padding: 3px 7px;
    }
  }
</style>

<template lang="jade">
  .component
    .subtitle 階段說明
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
          label: '討論中',
          description: '在草案未形成前及跳脫時間空間限制擴大搜集厲害相關人之意見',
        },
        {
          label: '寫草案',
          description: '邀請核心利害相關者參與諮詢會議加入實體見面討論一同將意見化為草案',
        },
        {
          label: '已送審',
          description: '將成熟的草案加強寫成定案送交立法院追蹤審查進度與結果',
        },
      ],
    }
  }
}
</script>
