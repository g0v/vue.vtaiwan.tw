<template lang="jade">
.component
  .ui.container

    #mobile-step.ui.sticky.mobile-step.thin-only
      // a.step(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx", v-bind:href="'#'+step.dataName")
      .ui.vertical.menu
        a.fitted.item(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx", v-bind:href="'#'+step.dataName")
          p {{step.label}}
    
    .ui.steps.top.attached.fat-only
      a.step(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        .number {{idx + 1}}
        .label {{step.label}}

    .ui.segment(id="context" v-bind:class="{ 'basic': onMobile }")
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
      onMobile: false,
      steps: [
        {
          label: '即將開始',
          description: '在草案未形成前跳脫時間空間限制，擴大搜集利害相關人之意見',
          dataName: 'soon'
        },
        {
          label: '意見徵集',
          description: '邀請核心利害相關者參與諮詢會議，加入實體見面討論，一同將意見化為草案',
          dataName: 'discuss'
        },
        {
          label: '研擬草案',
          description: '將成熟的草案加強、寫成定案',
          dataName: 'curate'
        },
        {
          label: '送交院會',
          description: '送交立法院',
          dataName: 'deploy'
        },
        {
          label: '歷史案件',
          description: '追蹤審查進度與結果',
          dataName: 'history'
        },
      ]
    }
  },
  created:function(){
    this.handleResize();
  },
  mounted () {
    $("#mobile-step").sticky({context:"#context"})
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
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
      var mobile_steps = $("#mobile-step");
      if(mobile_steps.length>0)
      {
        mobile_steps.sticky('refresh');
        // mobile_steps[0].style.left="0px"
      }
    },
    handleResize: function(){
      if(typeof window !== 'undefined')
          this.onMobile = window.innerWidth < 768;
      else
          this.onMobile = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.component {
  // width: 100%;
  // max-width: $comp_max_width;
  // margin: 0 auto;
  padding: 1em 0;
}

.number {
  border-radius: 1em;
  color: white;
  background: $step_color;
  font-size: 2em;
  font-weight: 700;
  line-height: 1.2em;
  width: 1.2em;
  height: 1.2em;
  // margin: .2em .2em .2em 0;
}
.label {
  padding: .3em 0 0 .3em;
}

.ui.steps .step {
  // make tab item flexible
  flex: 1 1 auto;
}

@media only screen and (max-width: $breakpoint) {
  .component {
    padding: 0px;
    border: 0px;
  }
  .ui.container {
    margin: 0 !important;
  }
  .mobile-step {
    position: absolute;
    // padding-left: 1vh;

    .ui.menu {
      width: 2em;
      .item {
        padding: 1em 0;
        &.active {
          color: white;
          background: $step_color;
        }
      }
    }
    
/*    a.step {
      color: white;
      background: $step_color;
      border: 1px solid white;
      border-width: 1px 0;
      display: block;
      width: 5vh !important;
      height: calc(100vh / 5);
      padding: 3px;
      opacity: 0.7;
      font-size: 2.5vh;
      line-height: 3.3vh;
      padding: 3.33vh 0px;
      border-left: solid 1px rgba(0, 0, 0, 0.2);
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
      border-top: solid 1px rgba(0, 0, 0, 0.2);
      border-right: solid 1px rgba(0, 0, 0, 0.2);
      box-shadow: inset -2px 0px 1px rgba(0, 0, 0, 0.1);
      &:hover {
        opacity: 1;
      }
      .active {
        border-right: 0px;
        box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.2);
      }
      .label {
        font-size: 2.5vh;
        line-height: 3.3vh;
      }
    }*/
  }
  // .mobile-context {
    // margin-left: 6vh !important;
    // width: auto !important;
    // padding: 0 !important;
    // border-left: 0px !important;
  // }
}
</style>