<template lang="pug">
.component

  //- #loader2.ui.active.inverted.dimmer
  //-   .ui.loader

  .ui.horizontal.divider
    i.world.icon
    |  Around the Globe

  .ui.container
    #popout.fancybox
      fancy(:locate="locate")
    .swiper-container3
      .swiper-pagination
      .swiper-wrapper
        a.swiper-slide.ui.link.card(v-for="(n,idx) in allInfo", data-fancybox='', data-src="#popout", href="#", @click.prevent ="myTitle = n.title")
          .content
            .header
              h2 {{n.title}}
          .content
            .meta
              span {{n.publish_date}}
            .description
              p.JQellipsis(v-html="n.content")
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
  },
  mounted: function () {
    this.ellipsis();
    setTimeout( () => {
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
    }, 1500)
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
  margin: 1em auto 2em auto;
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

  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -10px;
  }
}
.fancybox {
  display: none;
  opacity: 0;
  transform: translateY(-50px);
  transition: all .5s;
}
.fancybox-slide--complete .fancybox {
  opacity: 1;
  transform: translateY(0);
}
.fancybox-slide > * {
  padding: 24px auto;
}
</style>
