<template lang="jade">
.checkout-wrap
 ul.checkout-bar
  li.visited.first 即將開始
  li.active(v-if = "article.id !== undefined") {{status}}
  li.next(v-if = "article.id !== undefined") {{next}}
  li 送交院會
  li 歷史案件
</template>

<script>
import axios from 'axios'
var getiframe = require('./../filters/index.js')

export default {

    props:['article'],
    components:{
        
    },
    data(){
        return{
            next:"", // 下一階段字串
            status:""
        }
    },
    created:function(){
        axios.get('https://talk.vtaiwan.tw/t/'+ this.article.id +'.json?include_raw=1')
        .then((response=>{
            var regex = /(?: (?:init )?)|\n/g;
            var detail_info = response.data;
            var steps = ['即將開始','意見徵集','研擬草案','送交院會','歷史案件'];
            detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容

            var end = detail_info.length-1;

            var current = detail_info[end]['raw'].split(" ")[0]; //目前進展
            this.status = current;
            for(var i in detail_info){ //簡介底下每篇回文
                var init  = detail_info[end]['raw'].split(" ")[1]; // if init

                for (var j in steps){
                    if(steps[j] === current && init === 'init'){ //如果是"意見徵集 init",就回傳下一階段"研擬草案"
                        var nextIdx =Number(j)+1;
                        this.next = steps[nextIdx];
                        console.log(this.next);
                    }
                    if(steps[j] === current){ //如果是"意見徵集",就回傳下一階段"研擬草案"
                        var nextIdx =Number(j)+1;
                        this.next = steps[nextIdx];
                        console.log(this.next);
                    }
                }
                if(steps[4] === current){ //如果是"歷史案件",就直接回傳
                        this.next = current;
                        console.log(this.next);
                }
            }
           
           
        }))
    }


}



    
</script>

<style lang="scss" scoped>

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
background-color: #57aed1;
background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,transparent 75%, transparent);
background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,transparent 75%, transparent);
}

@mixin green-stripe {
background-size: 35px 35px;
background-color: #8bc53f;
background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,transparent 75%, transparent);
background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,transparent 75%, transparent);
}

@mixin inner-shadow {
-webkit-box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, .2); box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, .2);
}
@-webkit-keyframes myanimation {
	from {
		left: 0%;
	}
	to {
		left: 50%;
	}
}

h1 {
 text-align:center;
  font-family: 'PT Sans Caption', sans-serif;
  font-weight: 400;
  font-size: 30px;
  padding: 20px 0;
  
  color: #777;
}

.checkout-wrap {
  color: #444;
  font-family: 'PT Sans Caption', sans-serif;
  margin: 40px auto;
  max-width: 1200px;
  position: relative;
}
ul.checkout-bar {
  margin: 0 20px;
  li {
    color: #ccc;
    display: block;
    font-size: 16px;
    font-weight: 600;
    padding: 14px 20px 14px 80px;
    position: relative;
    &:before {
      @include inner-shadow;
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
      z-index: 999;      
    }
     &.active {
      color: #8bc53f;
      font-weight: bold;
      &:before {
        background: #8bc53f; 
        z-index: 99999;
      }
    }
    &.visited {
      background: #ECECEC;
      color: #57aed1;
      z-index: 99999;
      &:before {
       background: #57aed1; 
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
    &:nth-child(6) {
      &:before {
        content: "6";
      }
    }
  }
  a {
    color: #57aed1;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;  
  }
}



@media all and (min-width: 800px) {
 .checkout-bar li.active:after {
    -webkit-animation: myanimation 3s 0;
    @include green-stripe;
    @include inner-shadow;
    content:"";
    height: 15px;
    width: 100%;
    left: 50%;
    position: absolute;
    top: -50px;
    z-index: 0;
  }
  .checkout-wrap {
    //margin: 80px auto;
    margin-bottom: 80px;
    margin-top: 40px;
  }
  ul.checkout-bar {
  @include inner-shadow;
  @include gray-stripe;
  border-radius: 15px;
  height: 15px;
 // margin: 0 auto;
  margin-left: 225px;
  padding: 0;
  position: absolute;
  width: 60%;
  &:before {
    @include blue-stripe;
    @include inner-shadow;
    border-radius: 15px;
    content: " ";
    height: 15px;
    left: 0;
    position: absolute;
    width: 10%;
  }
   li {
      display: inline-block;
      margin: 50px 0 0;
      padding: 0;
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
          @include inner-shadow;
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
}

</style>