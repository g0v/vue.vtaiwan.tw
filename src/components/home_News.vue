<template lang="jade">
.component

  //- #loader1.ui.active.inverted.dimmer
  //-   .ui.loader

  .ui.horizontal.divider
    i.eye.icon
    |  news

  .ui.container

    .swiper-container1
      .swiper-pagination
      .swiper-wrapper
        a.swiper-slide.ui.centered.card(v-for="(n,idx) in allNews", :href="n.news_link", target='_blank')
          .image(v-if="n.img_link === 'undefined'", :style='"background-image: url(/dist/vTaiwan_logo_2017.png)"')
          .image(v-else, :style='"background-image: url(" + n.img_link + ")"')
            //- img(v-if="n.img_link != 'undefined'", :src="n.img_link")
            //- img(v-else, src="../assets/vTaiwan_logo_2017.png")
          .content
            .header
              h2 {{n.title}}
            .description
              p.JQellipsis {{n.content}}
          .extra.content
              .ui.teal.label(v-for="t in n.tags")
                | {{t}}
              .right.floated.author
                | {{n.source}}

    //- .swiper-container2.thin-only
    //-   .swiper-pagination
    //-   .swiper-wrapper
    //-     a.swiper-slide.ui.link.card(v-for="(n,idx) in allNews", :href="n.news_link", target='_blank')
    //-       .image(v-if="n.img_link === 'undefined'", :style='"background-image: url(/dist/vTaiwan_logo_2017.png)"')
    //-       .image(v-else, :style='"background-image: url(" + n.img_link + ")"')
    //-         //- img(v-if="n.img_link != 'undefined'", :src="n.img_link")
    //-         //- img(v-else, src="../assets/vTaiwan_logo_2017.png")
    //-       .content
    //-         .header
    //-           h3 {{n.title}}
    //-         .description
    //-           p.JQellipsis {{n.content}}
    //-       .extra.content
    //-           .ui.teal.label(v-for="t in n.tags")
    //-             | {{t}}
    //-           .right.floated.author
    //-               a(:href="n.source_link", target='_blank')
    //-                 | {{n.source}}


</template>

<script>
export default {
  name: 'News',
  props:['allNews'],
  mounted: function () {

    this.$nextTick( () => {
      /* initialize swiper when document ready */
      var mySwiper1 = new Swiper ('.swiper-container1', {
        observer: true,
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        autoplay: 5000,
        paginationClickable: true,
        slidesPerView: 4,
        spaceBetween: 20,
        grabCursor: true,
        breakpoints: {
          767: {
            slidesPerView: 1
          }
        }
      })
      // var mySwiper2 = new Swiper ('.swiper-container2', {
      //   observer: true,
      //   autoplay: 5000,
      //   direction: 'horizontal',
      //   pagination: '.swiper-pagination',
      //   spaceBetween: 20,
      // })
      mySwiper1.on('imagesReady', this.ellipsis)
      // mySwiper2.on('imagesReady', this.ellipsis)

      // $('#loader1').removeClass('active')
    })

  },
  updated:function(){
      this.ellipsis()
  },
  methods: {
      ellipsis: function(){
        var len = 60; // exceed 60 characters
        $(".JQellipsis").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
            }
        });
      }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";
.ui.container {
  margin: 1em auto;
  padding: 5px 1px; /* to prevent overlapped border */
  overflow: hidden;

  .ui.card{
    margin: 0;
    .image{
      background-position: center;
      background-size: cover;
      height: 10em;
      // max-height: 12em;
      // overflow: hidden;
      // img{
      //   margin: auto;
      //   max-width: 100%;
      //   max-height: 100%;
      //   width: auto;
      //   height: auto;
      // }
    }
    .content {
      font-size: 1rem;
      text-align: justify;
    }
    .extra .author{
      font-size: 50%;
    }
  }

}
</style>