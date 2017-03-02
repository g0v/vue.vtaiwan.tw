<template lang="jade">

#proposaltab.component

  h1.ui.horizontal.divider Proposals

  .ui.container
    
    #mobile-step.ui.sticky.mobile-step.thin-only
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
    onStickTo: function(idx, e){
      let el = "#mobile-step a[href='#"+e[0]+"']"
      $(el).parent().children().removeClass('active') 
      $(el).addClass('active')
      this.myIdx = idx
    },
    // handleScroll: function(){
    //   var mobile_steps = $("#mobile-step");
    //   if(mobile_steps.length>0)
    //   {
    //     mobile_steps.sticky('refresh');
    //     // mobile_steps[0].style.left="0px"
    //   }
    // },
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
  h1 {
      font-size: 4rem;
      font-family: $logo_font;
      font-weight: normal;
      text-transform: initial;
      margin: .5em;
  }
}

.ui.steps {

  .step {
    // make tab item flexible
    flex: 1 1 auto;
    overflow: hidden;
  }

  .number {
    // border-radius: 1em;
    // color: white;
    // background: $step_color;
    // font-size: 2em;
    font-family: $logo_font;
    font-weight: 700;
    // line-height: 1.2em;
    // width: 1.2em;
    // height: 1.2em;
    // margin: .2em .2em .2em 0;
    position: absolute;
    font-size: 10rem;
    color: fade_out($step_color, 0.5);
    margin: 0 0 0 30%;
  }

  .label {
    padding: .3em 0 0 .3em;
    z-index: 100;
  }

}

@media only screen and (max-width: $breakpoint) {
  .component {
    border: 0px;
    padding: 1em 0;
    min-height: 72vh;
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