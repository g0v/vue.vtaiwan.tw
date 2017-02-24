<template lang="jade">

.component
    .fat-only
        .swiper-container1
            .swiper-button-prev
            .swiper-button-next                            
            .swiper-wrapper
                .swiper-slide(v-for="(n,idx) in allNews")
                    .ui.cards
                        .card
                            .image
                                img(:src="n.img_link")
                            .content
                                .tags
                                    .ui.mini.label(v-for="t in n.tags") {{t}}
                                a(:href="n.news_link", target='_blank') {{n.title}}
                            .description 
                                p.JQellipsis {{n.content}}
                            .extra.content
                                .right.floated.author
                                    a(:href="n.source_link", target='_blank') {{n.source}}
    .thin-only
       .swiper-container2
            .swiper-pagination
            //- .swiper-button-prev
            //- .swiper-button-next
            .swiper-scrollbar 
            .swiper-wrapper
                .swiper-slide(v-for="(n,idx) in allNews")
                    .ui.cards
                        .card
                            .image
                                img(:src="n.img_link")
                            .content
                                .tags
                                    .ui.mini.label(v-for="t in n.tags") {{t}}
                                a(:href="n.news_link", target='_blank') {{n.title}}
                            .description 
                                p.JQellipsis {{n.content}}
                            .extra.content
                                .right.floated.author
                                    a(:href="+n.source_link", target='_blank') {{n.source}}


</template>

<script>

export default {
  name: 'News',
  props:['allNews'],
  mounted: function () {
    /* initialize swiper when document ready */
    var mySwiper1 =new Swiper ('.swiper-container1', {
      observer: true,
      direction: 'horizontal',
    //   pagination: '.swiper-pagination',
    //   autoplay: 5000,
      slidesPerView: 5,
    //   paginationClickable: true,
      spaceBetween: 10,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev'
       
    })
    var mySwiper2 =new Swiper ('.swiper-container2', {
      observer: true,
      autoplay: 5000,
      direction: 'horizontal',
    //   nextButton: '.swiper-button-next',
    //   prevButton: '.swiper-button-prev',
      pagination: '.swiper-pagination',
      paginationType: 'fraction',
      scrollbar: '.swiper-scrollbar',
    //   spaceBetween: 40
    })
    mySwiper1.on('imagesReady', this.ellipsis)
    mySwiper2.on('imagesReady', this.ellipsis)
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

.component {
  padding: 0 0 2em 0;
//   min-height: 72vh;
//   .swiper-container1{
    //   margin:4.5em 1em 0 3em;
//   }
  .ui.card>.content>.header:not(.ui), .ui.cards>.card>.content>.header:not(.ui) {
    font-weight: 700;
    font-size: 1em;
    margin-top: -.21425em;
    line-height: 1.2em;
  }
  .ui.cards>.card>.content {
      text-align: left;
    >.tags{
        // border-bottom: 1px solid #d7d7d7;
        // margin-bottom: .5em;
        .ui.label{
            font-size: 0.6em;  
            margin-bottom:.5em;
            margin-right:0.8em;
            padding-left: 1em;
            padding-right: 1em; 
        }
    } 
  }
  .ui.cards>.card>.image:not(.ui)>img {
    height: 150px;
  }
  .ui.cards>.card [class*="right floated"] {
    float: right;
    font-size: 0.6em;
  }
  .ui.cards>.card>.extra.content{
      padding: 0 0.5em 0 0;
      border-top: none!important;
  }
  .description{
      padding:0 .5em;
      
      >p{
        font-size:0.6em;
        text-align: left;
        text-indent: 25px;
        border-bottom: 1px solid #d7d7d7;  
      }
  }
  .ui.cards>.card>.content{
    padding:.5em;  
  }
  .ui.cards>.card{
      min-height:300px;
  }  
}

.thin-only{
    .swiper-container2{
        margin:5em 3em 0 3em;
        .ui.cards{
            margin: 0;
        }
        .ui.cards>.card{
            min-height:300px;
        }
        .ui.cards>.card>.image:not(.ui)>img {
            height: 150px;
        }
        .ui.card>.content>.header:not(.ui), .ui.cards>.card>.content>.header:not(.ui) {
            font-size: 1.5em;
        }
        
    }
}
</style>