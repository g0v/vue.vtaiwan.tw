<template lang="jade">
  .component

    .thin-only.nav-tabs
      a.step(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        .number {{idx + 1}}
        .label {{step.label}}

    .fat-only.ui.big.steps.top.attached
      a.step(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        .number {{idx + 1}}
        .label {{step.label}}

    .ui.segment.attached
      Box(v-for="(step, idx) in steps", :list = "mySort(step.dataName)", :desc = "step.description", v-show="idx == myIdx")

</template>

<script>
  import Box from './home_propTabs_Box.vue'

  export default {
    name: 'proposalTab',
    props: ['allTopics'],
    components: {
      Box
    },
    data () {
      return {
        myIdx: 0,
        // myTab: {dataName: 'news'},
/*       tablist: [
          {title: '即將開始', dataName: 'soon'},
          {title: '意見徵集', dataName: 'discuss'},
          {title: '研擬草案', dataName: 'curate'},
          {title: '送交院會', dataName: 'deploy'},
          {title: '歷史案件', dataName: 'history'}
        ],
*/
        steps: [
          {
            label: '即將開始',
            description: '在草案未形成前\n跳脫時間空間限制\n擴大搜集\n利害相關人之意見',
            dataName: 'soon'
          },
          {
            label: '意見徵集',
            description: '邀請核心利害相關者\n參與諮詢會議\n加入實體見面討論\n一同將意見化為草案',
            dataName: 'discuss'
          },
          {
            label: '研擬草案',
            description: '將成熟的草案加強\n寫成定案\n送交立法院\n追蹤審查進度與結果',
            dataName: 'curate'
          },
          {
            label: '送交院會',
            description: '將成熟的草案加強\n寫成定案\n送交立法院\n追蹤審查進度與結果',
            dataName: 'deploy'
          },
          {
            label: '歷史案件',
            description: '將成熟的草案加強\n寫成定案\n送交立法院\n追蹤審查進度與結果',
            dataName: 'history'
          },
        ]
      }
    },
    methods: {
      mySort: function (dataName) { 
        let boxes;

        switch (dataName) {
          case "soon":
            boxes = this.allTopics.slice()
              .filter((topic)=>{
                return topic.status==="即將開始"
              })
              .sort(function(a,b) {
                return 1; 
                // replace this by other logic...
              }).slice(0,8);
            break;
            
          case "discuss":
            boxes = this.allTopics.slice()
              .filter((topic)=>{
                return topic.status==="意見徵集"
              })
              .sort(function(a,b) {
                return 1; 
                // replace this by other logic...
              }).slice(0,8);
            break;

          case "curate":
            boxes = this.allTopics.slice()
              .filter((topic)=>{
                return topic.status==="研擬草案"
              })
              .sort(function(a,b) {
                return 1; 
                // replace this by other logic...
              }).slice(0,8);
            break;

          case "deploy":
            boxes = this.allTopics.slice()
              .filter((topic)=>{
                return topic.status==="送交院會"
              })
              .sort(function(a,b) {
                return 1; 
                // replace this by other logic...
              }).slice(0,8);
            break;

          case "history":
            boxes = this.allTopics.slice()
              .filter((topic)=>{
                return topic.status==="歷史案件"
              })
              .sort(function(a,b) {
                return 1; 
                // replace this by other logic...
              }).slice(0,8);
            break;
        }

        return boxes;

/*        var soon = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="即將開始"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        var discuss = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="意見徵集"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        var curate = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="研擬草案"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        var deploy = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="送交院會"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        var history = this.allTopics.slice()
          .filter((topic)=>{
            return topic.status==="歷史案件"
          })
          .sort(function(a,b) {
            return 1; // replace this by other logic...
          }).slice(0,8);

        return {
          soon: soon,
          discuss: discuss,
          curate: curate,
          deploy: deploy,
          history: history
        }*/
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../sass/global.scss";

  .component {
    width: 100%;
    max-width: $comp_max_width;
    // min-height: 20em;
    margin: 0 auto;
    padding: 1em;
    // font-size: 0.8rem;
  }

  .nav-tabs {
    display: flex;
    justify-content: center;
    // cursor: pointer;
    // font-size: 0.8rem;
    border-bottom: 1px solid gray;
    a {
      color: black;
      padding: .2em 1em;
      margin: 0 1em;
      border: 1px solid gray;

      @include transition(all 0.1s ease);
      border-bottom: 0px;
      // background: white;
      &:hover, &:active, &.active {
        border-bottom: 5px lightcoral solid;
      }
    }    
  }

  .number {
    border-radius: 1em;
    color: white;
    background: lightcoral;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2em;
    width: 1.2em;
    height: 1.2em;
    margin: 0 .2em 0 0;
  }
</style>