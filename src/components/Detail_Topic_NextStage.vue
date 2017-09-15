<template lang="jade">
  .component
    .step-progress-bar
      ul.progress-bar
        li(v-for="(s,idx) in steps.stage", v-bind:class='{active:s.active, current:s.current}') {{s.title}}

</template>

<script>
import caxios from '../js/request'

export default {

    props:['article'],

    data(){
        return{
            steps:{}
        }
    },
    methods:{
      getProgress(val){
        let id = val.id
        this.steps = { // initialize dType
         'stage': []
        }
        let step = this.steps // just for alias
        caxios.get('https://talk.vtaiwan.tw/t/'+ id +'.json?include_raw=1')
        .then((response=>{
            var detail_info = response.data;
            var steps = [
              {
                title:"即將開始",
                active:false,
                current:false
              },
              {
                title:"意見徵集",
                active:false,
                current:false
              },
              {
                title:"研擬草案",
                active:false,
                current:false
              },
              {
                title:"送交院會",
                active:false,
                current:false
              },
              {
                title:"歷史案件",
                active:false,
                current:false
              }
            ];

            detail_info = detail_info['post_stream']['posts'].slice(1); // 取得簡介底下內容
            if (detail_info.length > 0) {
              var end = detail_info.length - 1
              var current = detail_info[end]['raw'].split(" ")[0]; //目前進展
              for(var i in detail_info){ //簡介底下每篇回文
                var init  = detail_info[end]['raw'].split(" ")[1]; // if init
                for (var j in steps){
                  steps[j]['active'] = true;
                  if(steps[j]['title'] === current){ //如果是"意見徵集",就將active啟動並取消visited
                    steps[j]['current'] = true;
                    steps[j]['active'] = false;
                    step.stage = steps; // 回傳五階段array
                  }
                }
              }
            }
            else {
              steps[0]['current'] = true
              step.stage = steps
            }
        }))
      }
    },
    created:function(){
      this.getProgress(this.article);
    },
    watch:{
      article: function(val){
          this.getProgress(val);
        }
    }


}

</script>

<style lang="scss" scoped>

@import "../sass/global.scss";

.step-progress-bar {
  margin: 0 auto;
  display: block;
  padding: 10px 0;
  height: 100px;
  width: 600px;
  li {
    font-size:1.2rem;
  }
  @media only screen and (max-width: $breakpoint) {
    width:100%;
    li {
      font-size:1rem;
    }
  }
}
ul.progress-bar {
  counter-reset: step;
  padding:0;
}
.step-progress-bar li {
  list-style-type: none;
  float: left;
  color: $main_color;
  width: 20%;
  position: relative;
  text-align: center;
  // font-weight: 600;
  // font-size:1.2rem;
}
.step-progress-bar li:before {
  content: counter(step);
  counter-increment: step;
  width: 32px;
  height: 32px;
  border: 1px solid $main_color;
  border-radius: 50%;
  display: block;
  text-align: center;
  line-height: 31px;
  margin: 0 auto 10px auto;
  z-index: 9;
  background-color: white;
  // font-weight: 600;
}
.step-progress-bar li:after {
  content: "";
  width: 100%;
  position: absolute;
  height: 1px;
  background-color: $main_color;
  top: 16px;
  left: 50%;
  z-index: -1;
}
.step-progress-bar li:last-child:after {
  content: none;
}
.step-progress-bar li.active {
  color: gray;
}
.step-progress-bar li.current {
  color: $step_color;
}
.step-progress-bar li.active:before{
  border-color: gray;
}
.step-progress-bar li.current:before{
  border-color: $step_color;
}
.step-progress-bar li.active:after{
  background-color: gray;
}
.step-progress-bar li.current:after{
  background-color: $main_color;
}


</style>
