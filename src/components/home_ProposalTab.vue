<template lang="jade">

  .component
    .ui.big.steps.top.attached.fat-only
      a.step(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        .number {{idx + 1}}
        .label {{step.label}}

    .ui.big.steps.top.attached.mobile-step.sticky.thin-only(id="mobile-step")
      a.step(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx", v-bind:href="'#'+step.dataName")
        .label {{step.label}}

    .ui.segment.attached(id="context" v-bind:class="{ 'mobile-context': onMobile }")
      Box(v-for="(step, idx) in steps", v-bind:id="step.dataName", :list = "mySort(step.dataName)", :desc = "step.description", :label = "step.label", v-show="idx == myIdx || onMobile")
    
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
            description: 'test\n寫成定案\n送交立法院\n追蹤審查進度與結果',
            dataName: 'deploy'
          },
          {
            label: '歷史案件',
            description: 'test\n寫成定案\n送交立法院\ntest',
            dataName: 'history'
          },
        ]
      }
    },
    computed:{
      onMobile:{
        cache: false,
        get: function() {
          if(typeof screen!== 'undefined')
            return screen.width<768;
          else
            return false;
        }
      }
    },
    created:function(){
    },
    mounted () {
      $("#mobile-step").sticky({context:"#context"})
      window.addEventListener('scroll', this.handleScroll);
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
      },
      handleScroll: function(){
        var mobile_steps = $(".ui.mobile-step");
        if(mobile_steps.length>0)
        {
          mobile_steps.sticky('refresh');
          mobile_steps[0].style.left="0px"
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../sass/global.scss";

  .component {
    width: 100%;
    max-width: $comp_max_width;
    margin: 0 auto;
    padding: 1em;
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

  @media only screen and (max-width: 767px) {
  .component{
      padding:0px;
      border: 0px;
      .bound{
        left:0
      }
    }
  .mobile-step{
        .step,.step.active, .step:first-child{
          width: 0 !important;
          height: 20vh;
          padding: 4vw;
          border: 0px;
        },
        .label{
          font-size: 5vw;
          line-height: 6vw;
        }
        left: 0;
        z-index: 10;
        position: absolute;
      }
  }	
  .mobile-context{
    padding-left: calc(4vw + 1em);
  }


</style>