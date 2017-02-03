<template lang="jade">
.info
    Description(v-if="des === true", :article="article")
    Timeline(v-if="tim === true", :article="article")
    Discussion(v-if="dis === true", :article="article")


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
            des:false,
            dis:false,
            tim:false
        }
    },
    created:function(){
        // console.log('info')
        if(this.desc === "詳細內容"){
            this.des = true;
        }
        if(this.desc === "議題時間軸"){
            this.tim = true;
        }
        if(this.desc === "參與討論"){
            this.dis = true;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>