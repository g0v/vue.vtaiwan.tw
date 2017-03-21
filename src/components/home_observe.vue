<template lang="jade">
.component

  .ui.horizontal.divider
    i.world.icon 
    |  Around the Globe

  #gosticky.ui.sticky.thin-only
      #godown.button.ui.yellow.vertical.button(@click.prevent="goAnchor('#footer')")
        p 點我至頁尾
          i.down.arrow.icon  
  
  #desktop.ui.segment.fat-only
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
              |  發佈日期: {{n.publish_date}}      
            .description 
              p(v-html="n.content")       
          .extra.content
            .ui.teal.label {{n.category}}
            .right.floated.author
              a(:href="n.link", target='_blank') 
              | {{n.organization}}

  #mobile.ui.segment.thin-only
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
              |  發佈日期: {{n.publish_date}}      
            .description 
              p(v-html="n.content")       
          .extra.content
            .ui.teal.label {{n.category}}
            .right.floated.author
              a(:href="n.link", target='_blank') 
              | {{n.organization}}
      #goTop.button.ui.icon.yellow.button(@click.prevent="goAnchor('top')")
          i.long.arrow.up.icon        

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
      silent:true
    });
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 600){
            $('#mobile').fadeIn("fast");
        } 
        else {
            $('#mobile').stop().fadeOut("fast");
        }
        /* when press the godown button to the bottom of the page, hide the button */
        if($(window).scrollTop() + $(window).height() == $(document).height()) { 
          $('#godown').stop().fadeOut("fast");
        }
        /* scroll top again, then the button reveals itself again */
        else{
          $('#godown').fadeIn("fast");
        }
    });
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
  overflow-y: scroll; 
  margin: auto;
}

#mobile.thin-only{
  width:auto;
  overflow-y: scroll; 
  -webkit-overflow-scrolling: touch;
  #goTop{
    position: fixed;
    right: 30px;
    bottom: 30px;
    width: 40px;
    height:40px;
    padding: 10px 15px;    
    font-size: 20px;
    border-radius: 50px;
    cursor: pointer;
    opacity: 0.8;
    z-index: 20;
    i.long.arrow.up.icon{
      width: auto;
    }
  }
}

#gosticky{
  margin-bottom: 5px;
  #godown.button{
    opacity: 0.8;
    font-family: $main_font;
    padding: 10px;
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

</style>
