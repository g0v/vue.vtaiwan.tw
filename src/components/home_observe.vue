<template lang="jade">
.component

  //- #loader2.ui.active.inverted.dimmer
  //-   .ui.loader

  .ui.horizontal.divider
    i.world.icon
    |  Around the Globe

  .ui.container

    #fancybox
      fancy(:locate="locate")

    .swiper-container3
      .swiper-pagination
      .swiper-wrapper
        a.swiper-slide.ui.link.card(v-for="(n,idx) in allInfo", data-fancybox, data-src="#fancybox", href="#", @click.prevent ="myTitle = n.title")
          .content
            .header
              h2 {{n.title}}
          .content
            .meta
              span {{n.publish_date}}
            .description
              p.JQellipsis(v-html="n.content")

    //- #mobile.swiper-container4.thin-only
    //-   .swiper-pagination
    //-   .swiper-wrapper
    //-     a.swiper-slide.ui.link.card(v-for="(n,idx) in allInfo", data-fancybox='', data-src="#fancybox-2", href="javascript:;", v-on:click ="myTitle = n.title")
    //-       .content
    //-         .header
    //-           h3 {{n.title}}
    //-       .content
    //-         .meta
    //-           span {{n.publish_date}}
    //-         .description
    //-           p.JQellipsis(v-html="n.content")
    //-       #fancybox-2(style='display: none;')
    //-         fancy(:locate="locate")

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
        var len = 80; // exceed 80 characters
        $(".JQellipsis").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
            }
        });
    },
    // goAnchor: function(anchor){
    //   if(anchor == "top"){
    //     /* go to top */
    //     $('html, body').animate({
    //       scrollTop: 0,
    //     }, 1000)
    //   }
    //   else if(anchor){
    //     /* get the top position of anchor */
    //     let anchor_y = $(anchor).offset().top
    //     /* go to anchor (animation to do) */
    //     $('html, body').animate({
    //       scrollTop: anchor_y,
    //     }, 1000)
    //   }
    // }
  },
  mounted: function () {
    this.ellipsis();
    this.$nextTick( () => {
      /* initialize swiper when document ready */
      var mySwiper3 = new Swiper ('.swiper-container3', {
        observer: true,
        autoplay: 5000,
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 20,
        slidesPerView: 4,
        grabCursor: true,
        breakpoints: {
          767: {
            slidesPerView: 1
          }
        }
      })
      // var mySwiper4 = new Swiper ('.swiper-container4', {
      //   observer: true,
      //   autoplay: 5000,
      //   direction: 'horizontal',
      //   pagination: '.swiper-pagination',
      //   paginationType: 'fraction',
      //   paginationClickable: true,
      //   spaceBetween: 20,
      // })
      // mySwiper3.on('Init', this.ellipsis)
      // mySwiper4.on('Init', this.ellipsis)

      // $('#loader2').removeClass('active')
    })
  },
  updated:function() {
    this.ellipsis();
  },
  computed: {
    locate: function(){
      var t = this.allInfo.filter(o => o.title == this.myTitle)[0];
      return (t) ? t : new Object()
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
// #goTop{
//     position: fixed;
//     right: 30px;
//     bottom: 30px;
//     width: 40px;
//     height:40px;
//     padding: 10px 15px;
//     font-size: 20px;
//     border-radius: 50px;
//     cursor: pointer;
//     opacity: 0.8;
//     z-index: 20;
//     i.long.arrow.up.icon{
//       width: auto;
//     }
// }
#fancybox {
  display: none;
  // width:70%;
  // padding: 15px 40px 15px 32px;
  // border-radius: 4px;
  /* Custom transition - fade from top*/
  opacity: 0;
  transform: translateY(-50px);
  transition: all .5s;
  // .ui.centered.card{
  //   margin: auto;
  //   width: auto;
  //   height: auto;
  // }
}
.fancybox-slide--complete #fancybox {
  opacity: 1;
  transform: translateY(0);
}
// #fancybox-2 {

//     width:98%;
// 		padding: 15px 40px 15px 32px;
// 		border-radius: 4px;

//     /* Custom transition - fade from top*/
// 		opacity: 0;
//     transform: translateY(-50px);
//     transition: all .5s;
// 	}
// 	.fancybox-slide--complete #fancybox-2 {
// 		opacity: 1;
// 		transform: translateY(0);
// }

</style>
