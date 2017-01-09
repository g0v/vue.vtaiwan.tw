<template lang="jade">
 h2 {{next}}
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
            next:"" // 下一階段字串
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
    
</style>