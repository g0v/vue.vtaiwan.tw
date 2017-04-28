<template lang="jade">
.component

  .ui.horizontal.divider
    i.world.icon 
    |  Around the Globe
    
  .ui.container
    
    .swiper-container3.fat-only
      .swiper-pagination
      .swiper-wrapper
        a.swiper-slide.ui.link.card(v-for="(n,idx) in allInfo", data-fancybox='', data-src="#hidden-content", href="javascript:;", v-on:click ="myTitle = n.title")
          .content
            .header
              h2 {{n.title}}
          .content
            .meta
              span {{n.publish_date}}     
            .description 
              p.JQellipsis(v-html="n.content")       
          #hidden-content(style='display: none;')    
            fancy(:locate="locate") 
    #mobile.swiper-container4.thin-only
      .swiper-pagination
      .swiper-wrapper
        a.swiper-slide.ui.link.card(v-for="(n,idx) in allInfo", data-fancybox='', data-src="#hidden-content-2", href="javascript:;", v-on:click ="myTitle = n.title")
          .content
            .header
              h3 {{n.title}}
          .content
            .meta
              span {{n.publish_date}}     
            .description 
              p.JQellipsis(v-html="n.content")       
          #hidden-content-2(style='display: none;')    
            fancy(:locate="locate")
      #goTop.button.ui.icon.yellow.button(@click.prevent="goAnchor('top')")
          i.long.arrow.up.icon     
</template>


<script>
import fancy from "./home_observe_fancybox.vue"

export default {
  name: 'observe',
  props:['allInfo'],
  components:{
    fancy
  },
  data () {
    return{
      myTitle:""
    }
  },
  methods:{
    ellipsis: function(){
        var len = 80; // 超過50個字以"..."取代
        $(".JQellipsis").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
            }
        });
    },
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
  updated:function() {
    this.ellipsis();
  },
  mounted: function () {
    setTimeout(function(){
      /* initialize swiper when document ready */
      var mySwiper3 = new Swiper ('.swiper-container3', {
        observer: true,
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        autoplay: 5000,
        paginationClickable: true,
        spaceBetween: 20,
        grabCursor: true,
      })
      var mySwiper4 = new Swiper ('.swiper-container4', {
        observer: true,
        autoplay: 5000,
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        paginationClickable: true,
        spaceBetween: 20,
      })
      mySwiper3.on('Init', this.ellipsis)
      mySwiper4.on('Init', this.ellipsis)
    }, 1000)
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 600){
            $('#mobile').fadeIn("slow");
        } 
        else {
            $('#mobile').stop().fadeOut("slow");
        }
    });
  },
  computed: {
    locate: function(){
        var t = this.allInfo.filter( (o)=> {
          return o.title == this.myTitle;
        })[0];
        if(t===undefined){return new Object()}
        else{return t};
    }
  }
}
</script>

<style scoped lang="scss">
@import "../sass/global.scss";
.ui.container {
  margin: 1em auto;
  padding: 5px 1px; /* to prevent overlapped border */
  overflow: hidden;
  .swiper-pagination{
    bottom:-6px;
  }
  .ui.card{
    margin: 0;
    .content {
      font-size: 1rem;
      text-align: justify; 
    }
    .extra .author{
      font-size: 50%;
    }
  }
}
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
#hidden-content {

    width:70%;
		padding: 15px 40px 15px 32px;
		border-radius: 4px;
  
    /* Custom transition - fade from top*/
		opacity: 0;
    transform: translateY(-50px);
    transition: all .5s;
	}
  .ui.centered.card{
    margin: auto;
    width: auto;
    height: auto;
  }
	.fancybox-slide--complete #hidden-content {
		opacity: 1;
		transform: translateY(0);
}
#hidden-content-2 {

    width:98%;
		padding: 15px 40px 15px 32px;
		border-radius: 4px;
  
    /* Custom transition - fade from top*/
		opacity: 0;
    transform: translateY(-50px);
    transition: all .5s;
	}
	.fancybox-slide--complete #hidden-content-2 {
		opacity: 1;
		transform: translateY(0);
}

</style>
