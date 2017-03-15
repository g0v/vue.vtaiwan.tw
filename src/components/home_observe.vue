<template lang="jade">
.component

  //- #loader2.ui.active.inverted.dimmer
  //-   .ui.loader

  .ui.horizontal.divider
    i.world.icon 
    |  Around the Globe
  #gosticky.ui.sticky.thin-only
      button.go-to.ui.yellow.vertical.animated.button(@click.prevent="goAnchor('#footer')")
        .visible.content
        | 點我至頁尾
        .hidden.content
        i.down.arrow.icon  
  

  .ui.segment.fat-only
      .ui.container  
        .ui.centered.card(v-for="n in allInfo", :item="allInfo")         
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
  #mobile.ui.segment.thin-only
    
    .ui.container  
        .ui.centered.card(v-for="n in limitedItems", :item="allInfo")         
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
       
      //- .ui.fluid.vertical.animated.button(@click='limitNumber += 2')      
      //-   .visible.content 
      //-     i.repeat.icon
      //-   .hidden.content 載入更多    




</template>


<script>


export default {
  name: 'observe',
  props:['allInfo'],
  data () {
    return{
      limitNumber:2,
      items:[]
    }
  },
  methods:{
    goAnchor: function(anchor){
      if(anchor == "top"){
        /* go to top */
        $('html, body').animate({
          scrollTop: 0,
        }, 1000)
      }
      else if(anchor){
        /* get the top position of anchor */
        let anchor_y = $(anchor).offset().top
        /* go to anchor (animation to do) */
        $('html, body').animate({
          scrollTop: anchor_y,
        }, 1000)
      }
    }
  },
  computed: {
    limitedItems() {
      return this.items.slice(0,this.limitNumber)
    }
  },
  mounted: function () {
    $("#gosticky.ui.sticky").sticky({
      context: "#mobile",
      pushing: true,
      observeChanges: true,
      // silent: true
    })
    this.items = this.allInfo;
  },
  created: function(){
     this.items = this.allInfo; 
  }
}
</script>

<style scoped lang="scss">
@import "../sass/global.scss";
.ui.segment{
  height: 1000px;
  width:1170px;
  // overflow: scroll;
  overflow-y: scroll; /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch;
  margin: auto;
}
.ui.segment.thin-only{
  width:auto;
}
#gosticky{
  // text-align: left;
  button{
    opacity: 0.8;
    // margin-bottom: 10px;
  }
}
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
.ui.button{
    font-family: $main_font;
    // font-size:80%;
  }
</style>
