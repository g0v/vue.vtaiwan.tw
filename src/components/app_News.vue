<template lang="jade">

.component

  #loader1.ui.active.inverted.dimmer
    .ui.loader

  .ui.horizontal.divider
    i.eye.icon 
    |  news
      
  .ui.container

    .swiper-container1.fat-only
      .swiper-pagination                          
      .swiper-wrapper
        a.swiper-slide.ui.link.card(v-for="(n,idx) in allNews", :href="n.news_link", target='_blank')
          .image
            img(v-if="n.img_link != 'undefined'", :src="n.img_link")
            img(v-else, src="../assets/vTaiwan_logo_2017.png")
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

    .swiper-container2.thin-only
      .swiper-pagination
      .swiper-wrapper
        a.swiper-slide.ui.link.card(v-for="(n,idx) in allNews", :href="n.news_link", target='_blank')
          .image
            img(v-if="n.img_link != 'undefined'", :src="n.img_link")
            img(v-else, src="../assets/vTaiwan_logo_2017.png")
          .content
            .header
              h2 {{n.title}}
            .description 
              p.JQellipsis {{n.content}}
          .extra.content
              .ui.teal.label(v-for="t in n.tags") 
                | {{t}}
              .right.floated.author
                  a(:href="n.source_link", target='_blank') 
                    | {{n.source}}


</template>

<script>
export default {
  name: 'News',
  props:['allNews'],
  mounted: function () {
    
    setTimeout(function(){
      /* initialize swiper when document ready */
      var mySwiper1 = new Swiper ('.swiper-container1', {
        observer: true,
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        slidesPerView: 4,
        autoplay: 5000,
        paginationClickable: true,
        spaceBetween: 20,
        grabCursor: true,
      })
      var mySwiper2 = new Swiper ('.swiper-container2', {
        observer: true,
        autoplay: 5000,
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        spaceBetween: 20,
      })
      mySwiper1.on('imagesReady', this.ellipsis)
      mySwiper2.on('imagesReady', this.ellipsis)
      
      $('#loader1').removeClass('active')
    }, 1000)
    
  },
  updated:function(){
      this.ellipsis()
  },
  methods: {
      ellipsis: function(){
        var len = 60; // 超過50個字以"..."取代
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
      max-height: 12em;
      overflow: hidden;
      img{
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
    .content {
      font-size: 60%;
    }
    .extra .author{
      font-size: 50%;
    }
  }
//   min-height: 72vh;
//   .swiper-container1{
    //   margin:4.5em 1em 0 3em;
//   }
  // .ui.card>.content>.header:not(.ui), .ui.cards>.card>.content>.header:not(.ui) {
  //   font-weight: 700;
  //   font-size: 1em;
  //   margin-top: -.21425em;
  //   line-height: 1.2em;
  // }
  // .ui.cards>.card>.content {
  //     text-align: left;
  //   >.tags{
  //       // border-bottom: 1px solid #d7d7d7;
  //       // margin-bottom: .5em;
  //       .ui.label{
  //           font-size: 0.6em;  
  //           margin-bottom:.5em;
  //           margin-right:0.8em;
  //           padding-left: 1em;
  //           padding-right: 1em; 
  //       }
  //   } 
  // }
  // .ui.cards>.card>.image {
  //   max-height: 300px;
  //   overflow: hidden;
  //   img.logo{
  //       display: block;
  //       max-width: 200px;
  //       height: auto;
  //       margin:auto;
  //   }
  // }
  // .ui.cards>.card [class*="right floated"] {
  //   float: right;
  //   font-size: 0.6em;
  // }
  // .ui.cards>.card>.extra.content{
  //     padding: 0 0.5em 0 0;
  //     border-top: none!important;
  // }
  // .description{
  //     padding:0 .5em;
      
  //     >p{
  //       font-size:0.6em;
  //       text-align: left;
  //       text-indent: 25px;
  //       border-bottom: 1px solid #d7d7d7;  
  //     }
  // }
  // .ui.cards>.card>.content{
  //   padding:.5em;  
  // }
  // .ui.cards>.card{
  //     min-height:300px;
  // }  
}
</style>