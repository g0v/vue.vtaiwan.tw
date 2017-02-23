<template lang="jade">

.component
    .fat-only
        .swiper-container1
            .swiper-wrapper
                .swiper-slide(v-for="(n,idx) in allNews")
                        .ui.cards
                            .card
                                .image
                                    img(:src="n.img_link")
                                .content
                                    p {{n.tags}}
                                    a.header(:href="n.news_link", target='_blank') {{n.title}}
                                    //- .meta
                                    //-     span.right.floated.time 
                                    //-     //- span.category {{n.source}}
                                .description 
                                    p.JQellipsis {{n.content}}
                                .extra.content
                                    .right.floated.author
                                        a(:href="'http://'+n.source_link", target='_blank'){{n.source}}
            .swiper-button-prev
            .swiper-button-next                            
            //- .swiper-pagination
    .thin-only
       .swiper-container2
            .swiper-wrapper
                .swiper-slide(v-for="(n,idx) in allNews")
                    .ui.cards
                            .card
                                .image
                                    img(:src="n.img_link")
                                .content
                                    p {{n.tags}}
                                    a.header(:href="n.news_link", target='_blank') {{n.title}}
                                    //- .meta
                                    //-     span.right.floated.time 
                                    //-     //- span.category {{n.source}}
                                .description 
                                    p.JQellipsis {{n.content}}
                                .extra.content
                                    .right.floated.author
                                        a(:href="'http://'+n.source_link", target='_blank'){{n.source}}
            .swiper-button-prev
            .swiper-button-next
            .swiper-pagination 
            .swiper-scrollbar 


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
      pagination: '.swiper-pagination',
    //   autoplay: 4000,
      slidesPerView: 5,
      paginationClickable: true,
      spaceBetween: 50,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    //   freeMode: true
       
    })
    var mySwiper2 =new Swiper ('.swiper-container2', {
      observer: true,
    //   autoplay: 5000,
      direction: 'horizontal',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination: '.swiper-pagination',
      scrollbar: '.swiper-scrollbar',
      spaceBetween: 40,
    //   keyboardControl: true
    })
    mySwiper1.on('imagesReady', function(){
        var len = 60; // 超過50個字以"..."取代
        $(".JQellipsis").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
            }
        });
    })
    mySwiper2.on('imagesReady', function(){
        var len = 60; // 超過50個字以"..."取代
        $(".JQellipsis").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
            }
        });
    })
  },
  updated:function(){
    var len = 50; // 超過50個字以"..."取代
        $(".JQellipsis").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
            }
        });
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.component {
  padding: 1em 0;
  min-height: 72vh;
  .swiper-container1{
      margin:4.5em 1em 0 3em;
  }
  .ui.card>.content>.header:not(.ui), .ui.cards>.card>.content>.header:not(.ui) {
    font-weight: 700;
    text-align: left;
    font-size: 1em;
    margin-top: -.21425em;
    line-height: 1.2em;
  }
  .ui.cards>.card>.content>p {
    font-size: 0.6em;  
    text-align: left;
    color: red;
    background-color: #e8e8e8;
    margin-bottom:1em;
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
  }
  .description>p{
    font-size:0.6em;
    text-align: left;
    text-indent: 25px;  
  }
  .ui.cards>.card>.content{
    padding:1em 0 1em 0;  
  }
  .ui.cards>.card{
      min-height:350px;
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
    }
}
</style>