<template lang="jade">
.component

  .ui.horizontal.divider
    i.open.envelope.outline.icon
    |  proposal

  .ui.container

    #mobile-step.mobile-step.ui.sticky.thin-only
      // a.step(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx", v-bind:href="'#'+step.dataName")
      .ui.vertical.menu
        a.fitted.item(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx", :href="'#'+step.dataName")
          p {{step.label}}

    .ui.top.attached.big.steps.fat-only
      a.step(v-for="(step, idx) in steps", :class="{'active': idx == myIdx}", @click="myIdx = idx")
        .label {{step.label}}
        .number {{idx + 1}}

    .ui.segment(id="context" v-bind:class="{ 'basic': onMobile, 'attached': !onMobile}")

      transition(name='fade', mode='out-in', v-if="!onMobile")
        Box(v-for="(step, idx) in steps", :list = "mySort(step.dataName)", :desc = "step.description", :label = "step.label", :name = "step.dataName", v-if="idx == myIdx")

      template(v-else)
        Box(v-for="(step, idx) in steps", :list = "mySort(step.dataName)", :desc = "step.description", :label = "step.label", :name = "step.dataName", @stickTo="onStickTo(idx, $event)")

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
      myIdx: 1, /* default tab */
      onMobile: false,
      steps: [
        {
          label: '即將開始專案',
          description: '在草案未形成前跳脫時間空間限制，擴大搜集利害相關人之意見',
          dataName: 'soon'
        },
        {
          label: '意見徵集專案',
          description: '邀請核心利害相關者參與諮詢會議，加入實體見面討論，一同將意見化為草案',
          dataName: 'discuss'
        },
        {
          label: '研擬草案中專案',
          description: '將成熟的草案加強、寫成定案',
          dataName: 'curate'
        },
        {
          label: '送交院會專案',
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
  mounted:function() {
    // initialize sticky element
    $("#mobile-step.sticky").sticky({
      context: "#context",
      observeChanges: true,
      silent: true
    })
    // window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
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
            })
          break;
        case "discuss":
          boxes = this.allTopics.slice()
            .filter((topic)=>{
              return topic.status==="意見徵集"
            })
            .sort(function(a,b) {
              return 1;
              // replace this by other logic...
            })
          break;
        case "curate":
          boxes = this.allTopics.slice()
            .filter((topic)=>{
              return topic.status==="研擬草案"
            })
            .sort(function(a,b) {
              return 1;
              // replace this by other logic...
            })
          break;
        case "deploy":
          boxes = this.allTopics.slice()
            .filter((topic)=>{
              return topic.status==="送交院會"
            })
            .sort(function(a,b) {
              return 1;
              // replace this by other logic...
            })
          break;
        case "history":
          boxes = this.allTopics.slice()
            .filter((topic)=>{
              return topic.status==="歷史案件"
            })
            .sort(function(a,b) {
              return 1;
              // replace this by other logic...
            })
          break;
      }
      return boxes;
    },
    onStickTo: function(idx, e){
      let el = "#mobile-step a[href='#"+e[0]+"']"
      $(el).parent().children().removeClass('active')
      $(el).addClass('active')
      this.myIdx = idx
    },
    handleResize: function(){
      if(typeof window !== 'undefined') {
          this.onMobile = window.innerWidth < 768;
          this.myIdx = (this.onMobile) ? 0 : 1 /* default tab for mobile and screen */
      }
      else
          this.onMobile = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.component {
  padding: 1em 0;
  // min-height: 72vh;
  #context {
    @media only screen and (max-width: $breakpoint){
      margin: -1.5em 0 0 0;
    }
  }
}

$tabColor: #d94f4f;
.ui.steps {
  .step {
    /*make tab item flexible*/
    flex: 1 0 0px;
    &::after {
      visibility: hidden;
    }
    &.active, &.active:hover {
      background: $tabColor;
      color: white;
      &::after {
        visibility: visible;
        background: $tabColor;
        top: 100%;
        right: 50%;
        border-width: 0 0 1px 1px;
      }
    }
    .number {
      // font-family: $logo_font;
      position: absolute;
      font-weight: 700;
      font-size: 8.5rem;
      transform: scale(1, 0.9);
      color: #eda7a7;
      // margin: 3% 0 0 25%;
      right: -0%;
      bottom: 20%;
    }
    .label {
      // padding: .3em 0 0 .3em;
      z-index: 100;
    }
  }
}

@media only screen and (max-width: $breakpoint) {
  .component {
    border: 0px;
    padding: 1em 0;
    // min-height: 72vh;
  }
  .ui.container {
    margin: 0 !important;
  }
  .ui.segment.basic {
    padding: 0;
    margin-left: 1em;
    width: 100%;
  }
  .mobile-step { /* do not use #mobile-step, otherwise sticky won't work */
    position: absolute;
    top: 1em;
    // z-index: 1000; // default sticky z-index = 800

    .ui.menu {
      width: 2em;
      .item {
        text-align: center;
        padding: 1em 0;
        &.active {
          color: white;
          background: $step_color;
        }
      }
    }
  }
}
</style>
