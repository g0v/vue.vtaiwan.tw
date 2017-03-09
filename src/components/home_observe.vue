<template lang="jade">
.component

  //- #loader2.ui.active.inverted.dimmer
  //-   .ui.loader

  .ui.horizontal.divider
    i.world.icon 
    |  Important Observations

  .ui.container   
    .ui.centered.card(v-for="(n,idx) in allInfo", :href="n.link", target='_blank')
        .ui.raised.segment   
          .content
            .header
              .ui.teal.ribbon.label {{n.category}}
              span
                h2 {{n.title}}
            .content
              .meta
                span 
                | 年度: {{n.year}}
                span 
                | 區域: {{n.region}}
                span 
                |  發佈日期: {{n.date}}
              .description 
                p(v-html="n.content")   
      



</template>


<script>


export default {
  name: 'observe',
  props:['allInfo'],
  data () {
    return {

    }
  },
  mounted: function () {
    
    
    
  },
  updated:function(){
   
  },
  methods: {
      
  }
}
</script>

<style scoped lang="scss">
@import "../sass/global.scss";

.ui.centered.card{
  width: 100%;
  .ui.raised.segment{
    border: none;
    box-shadow: none;
  }
}
</style>
