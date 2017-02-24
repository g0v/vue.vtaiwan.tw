<template lang="jade">

//- .component
//-     Description(v-if="show === 0", :article="article")
//-     Timeline(v-if="show === 1", :article="article")
//-     Discussion(v-if="show === 2", :article="article")

</template>

<script>
import Description from './Detail_Topic_Description.vue'
import Discussion from './Detail_Topic_Discussion.vue'
import Timeline from './Detail_Topic_Timeline.vue'

export default {

    props:['article','desc'],
    components:{
      Description,
      Discussion,
      Timeline
    },
    data () {
        return {
            // des:false,
            // dis:false,
            // tim:false,
            show: 0 /* default page */
        }
    },
    created:function(){
        // console.log('info')
        if(this.desc === "詳細內容"){
            this.show = 0
            // this.des = true;
        }
        else if(this.desc === "議題時間軸"){
            this.show = 1
            // this.tim = true;
        }
        else if(this.desc === "參與討論"){
            this.show = 2
            // this.dis = true;
        }
        else {
            this.show = 0
        }
    }
}
</script>

<style lang="scss" scoped>

</style>