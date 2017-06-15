<template lang="jade">

  .component
    .swiper-container
      .swiper-button-prev
      .swiper-button-next
      //- .swiper-scrollbar
      .swiper-pagination
      .swiper-wrapper
        .swiper-slide(v-for="(item, idx) in hotTopics", :style="{'background': 'url(' + item.cover + ') center / cover'}")
          .box
            .status.ui.basic.huge.label
              | {{item.status}}
            h1.slogan.ui.center.aligned.header
              | {{item.title}}
              .sub.center.aligned.header
                | {{item.slogan}}
            router-link.go-inside.ui.teal.big.button(:to="'/topic/' + item.routeName")
              p 進入議題
            button.go-to.ui.yellow.right.labeled.icon.button(@click="goAnchor('#proposaltab')")
              i.down.arrow.icon
              p 還有更多議案
            //- button.go-to.ui.yellow.vertical.animated.button(@click="goAnchor('#proposaltab')")
            //-   .hidden.content
            //-     | 還有更多議案
            //-   .visible.content
            //-     i.down.arrow.icon
</template>


<script>

export default {
  name: 'SlideShow',
  props: ['hotTopics', 'allTopics'],
  data () {
    return {
    }
  },
  methods: {
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
  mounted: function () {
    this.$nextTick(() => {
      /* initialize swiper when document ready */
      new Swiper ('.swiper-container', {
        observer: true,
        // scrollbar: '.swiper-scrollbar',
        pagination : '.swiper-pagination',
        nextButton: 'swiper-button-next',
        prevButton: 'swiper-button-prev',
        autoplay: 8000,
        direction: 'horizontal',
        keyboardControl: true,
        loop: true,
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 20,
        paginationClickable :true,
        grabCursor: true
      })
      /* disable loader */
      $('#loader').removeClass('active')
    })

    // setTimeout(function(){
    //   /* initialize swiper when document ready */
    //   new Swiper ('.swiper-container', {
    //     observer: true,
    //     // scrollbar: '.swiper-scrollbar',
    //     // pagination : '.swiper-pagination',
    //     autoplay: 8000,
    //     direction: 'horizontal',
    //     keyboardControl: true,
    //     slidesPerView: 1.2,
    //     centeredSlides: true,
    //     spaceBetween: 20,
    //     paginationClickable :true,
    //     loop: true,
    //     grabCursor: true
    //   })
    //   /* disable loader */
    //   $('#loader').removeClass('active')
    // }, 1000)

  }
}

</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

// ******************************* Swiper slide

.component {
  height: 100vh;
  @media only screen and (max-width: $breakpoint) {
    height: 100vh - $m-navHeight;
  }
  padding: 0 0 1em 0;
}

.swiper-container {
  height: 100%;
}

.swiper-slide {
  border-radius: 5px;
  overflow: hidden;
}

// ******************************* Desktop CSS

.ui.label{
  border-radius: 0;
}

.box {
  // font-size: 1rem;
  // ********************* centering
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  // *********************
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0,0,0, 0.7), rgba(0,0,0, 0.5));
  overflow: hidden;
  .status,
  .title,
  .slogan,
  .go-inside {
    z-index: 10;
  }
  .status {
    // color: white;
    // background: rgba(255,255,255,0.4);
    // border: 0px;
    font-size: 1.2rem;
    color: $step_color;
    border: 1px solid $step_color;
    background: transparent;
  }
  .title {
    color: white;
  }
  .slogan {
    margin: .5em 0;
    font-size: 3rem;
    @media only screen and (max-width: $breakpoint) {
      font-size: 2rem;
    }
    .sub.header {
      color: white;
      margin: 10px;
    }
    color: white;
  }
  .go-inside {
    margin: 0 0 1em 0;
  }
  .go-to {
    // width: 17ch;
    // position: absolute;
    // bottom: 3em;
    // font-family: $main_font;
    font-size: 100%;
  }
}

</style>
