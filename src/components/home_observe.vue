<template lang="jade">
.component

  //- #loader2.ui.active.inverted.dimmer
  //-   .ui.loader

  .ui.horizontal.divider
    i.world.icon 
    |  Important Observations

  .ui.container  
    .ui.centered.card(v-for="(n,idx) in allInfo", :href="n.link", target='_blank')         
      .content
        .header
          span.ui.header {{n.title}}
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
      .extra.content
        .ui.teal.label {{n.category}}
        .right.floated.author
          a(:href="n.link", target='_blank') 
           | {{n.organization}}      
           



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
  .header{
    font-family: $main_font;
  }
  .ui.teal.ribbon.label{
    bottom: 0.3rem;
  }
  .description{
    text-indent: 42px;
    font-size: 1.5rem;
  }
}
</style>
