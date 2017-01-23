<template lang="jade">
.NextStage
 ul.NextStage-Progress
  li(v-for="(s,idx) in steps", v-bind:class='{active:s.active,visited:s.visited}') 
   span {{s.title}}
</template>

<script>
import axios from 'axios'

export default {

    props:['article'],

    data(){
        return{
            steps:[],
        }
    },
    created:function(){
        axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
        .then((response=>{
            var detail_info = response.data;
            var steps = [
              {
                title:"即將開始",
                visited:false,
                active:false
              },
              {
                title:"意見徵集",
                visited:false,
                active:false
              },
              {
                title:"研擬草案",
                visited:false,
                active:false
              },
              {
                title:"送交院會",
                visited:false,
                active:false
              },
              {
                title:"歷史案件",
                visited:false,
                active:false
              }
            ];
            detail_info = detail_info['post_stream']['posts'].slice(1); // 取得簡介底下內容
            console.log(detail_info);
            var end = detail_info.length-1;

            var current = detail_info[end]['raw'].split(" ")[0]; //目前進展
            this.status = current;
            console.log(current);
            for(var i in detail_info){ //簡介底下每篇回文
                var init  = detail_info[end]['raw'].split(" ")[1]; // if init

                for (var j in steps){
                    steps[j]['visited'] = true;
                    if(steps[j]['title'] === current && init === 'init'){ //如果是"意見徵集 init",就將active啟動並取消visited
                        steps[j]['active'] = true;
                        steps[j]['visited'] = false;
                        return this.steps = steps; // 回傳五階段array
                    }
                    if(steps[j]['title'] === current){ //如果是"意見徵集",就將active啟動並取消visited
                        steps[j]['active'] = true;
                        steps[j]['visited'] = false;
                        this.steps = steps;
                        return this.steps = steps;// 回傳五階段array
                    }
                }
            }
        }))
    }


}
    
</script>

<style lang="scss" scoped>

@import "../sass/global.scss";

.ui.medium.header {
  color:#db2828;
}

@mixin gray-stripe {
background-size: 35px 35px;
background-color: #EcEcEc;
background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, .4) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .4) 50%, rgba(255, 255, 255, .4) 75%,transparent 75%, transparent);
background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, .4) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .4) 50%, rgba(255, 255, 255, .4) 75%,transparent 75%, transparent);
}

@mixin blue-stripe {
background-size: 35px 35px;
background-color: #40B3BF;
background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,transparent 75%, transparent);
background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,transparent 75%, transparent);
}

@mixin red-stripe {
background-size: 35px 35px;
background-color: #DB5252;
background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,transparent 75%, transparent);
background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,transparent 75%, transparent);
}


.NextStage {
  color: #444;
  margin: 40px auto;
  max-width: 1200px;
  position: relative;
}
ul.NextStage-Progress {
  margin: 0 20px;
  li {
    color: #ccc;
    display: block;
    font-size: 16px;
    position: relative;
    padding-left:14px;
    &:before {
      background: #ddd;
      border: 2px solid #FFF;
      border-radius: 50%;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      left: 20px;
      line-height: 37px;
      height: 35px;
      position: absolute;
      text-align: center;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
      top: 4px;
      width: 35px;
      z-index: 99999;      
    }
     &.active {
      color: #DB5252;
      font-weight: bold;
      font-size:18px;
      padding-left:14px; // span padding
      &:before {
        background: #DB5252; 
        z-index: 99999;
      }
    }
    &.visited {
      background: #ECECEC;
      color: #40B3BF;
      z-index: 99999;
      padding-left:14px; // span padding
      &:before {
       background: #40B3BF; 
        z-index: 99999;
      }
    }
    &:nth-child(1) {
      &:before {
        content: "1";
      }
    }
     &:nth-child(2) {
      &:before {
        content: "2";
      }
    }
    &:nth-child(3) {
      &:before {
        content: "3";
      }
    }
     &:nth-child(4) {
      &:before {
        content: "4";
      }
    }
    &:nth-child(5) {
      &:before {
        content: "5";
      }
    }
  }
  a {
    color: #40B3BF;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;  
  }
}

 .NextStage-Progress li.active:after {
    @include red-stripe;
    content:"";
    height: 15px;
    width: 100%;
    left: 50%;
    position: absolute;
    top: -50px;
    z-index: 0;
  }
  .NextStage {
    margin-top: 50px;
  }
  ul.NextStage-Progress {
    @include gray-stripe;
    border-radius: 15px;
    height: 15px;
    margin:auto;
    padding: 0;
    width: 60%;
    &:before {
      @include blue-stripe;
      border-radius: 15px;
      content: " ";
      height: 15px;
      left: 20%;
      position: absolute;
      width: 10%;
   }
   li {
      display: inline-block;
      margin: 50px 0 0;
      text-align: center;
      width: 19%;
      &:before {
        height: 45px;
        left: 40%;
        line-height: 45px;
        position: absolute;
        top: -65px;
        width: 45px;
        z-index: 99;
      }
      &.visited {
        background: none;
        
        &:after {
          @include blue-stripe;
          content: "";
          height: 15px;
          left: 50%;
          position: absolute;
          top: -50px;
          width: 100%;
          z-index: 99;
        }
      }
    }
  }

@media only screen and (max-width: $breakpoint) { // 小於ipad尺寸
    ul.NextStage-Progress {
      margin: 0 auto;
      width: 100%;
      margin-bottom:50px;
      &:before{
        left:0;
      }
      li {
          padding: 0;
          font-size: 14px;
          &:before {
            left: 20%;
          }
          &.visited {
            padding: 0;
          }
          &.active {
            padding: 0;
            font-size:16px;
          }
     }
   }
   .NextStage {
      margin:50px 0 50px 0;
   }
}

</style>