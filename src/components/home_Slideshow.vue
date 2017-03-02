<template lang="jade">

  .component
    // .ui.fluid.container
      .slide-page
        .slide-item(v-for="(t, idx) in mySlideTopics", :style="t.style")
          .box
            .status.ui.basic.huge.label 
              | {{t.status}}
            h1.slogan.ui.header
              | {{t.title}}
              .sub.header {{t.slogan}}
            router-link.ui.right.labeled.icon.teal.huge.button(:to="'/topic/' + t.routeName")
              i.right.arrow.icon
              p 進入議題
        a.fat-only.pre(@click="c = cycle(-1)")
          i.huge.black.caret.left.icon
        a.fat-only.next(@click="c = cycle(1)")
          i.huge.black.caret.right.icon

    #loader.ui.active.inverted.dimmer
      .ui.loader

    .swiper-container
      .swiper-scrollbar
      .swiper-pagination 
      .swiper-wrapper
        .swiper-slide(v-for="(item, idx) in hotTopics", :style="{'background': 'url(' + item.cover + ') 100% 100% / cover'}")
          .box
            .status.ui.basic.huge.label 
              | {{item.status}}
            h1.slogan.ui.center.aligned.header
              | {{item.title}}
              .sub.center.aligned.header
                | {{item.slogan}}
            router-link.ui.right.labeled.icon.teal.huge.button(:to="'/topic/' + item.routeName")
              i.right.arrow.icon
              p 進入議題

            i.square.icon.background
            a.go-to.ui.yellow.button(href="#proposaltab", @click.prevent="goAnchor")
              i.down.arrow.icon
              | 還有更多議案
      
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
    goAnchor: function(event){
      if(event){
        /* get the hash name */
        let anchor = event.target.hash
        /* get the top position of anchor */
        let anchor_y = $(anchor).offset().top
        /* go to anchor (animation to do) */
        // window.scrollTo(0, anchor_y)
        $('html, body').animate({
          scrollTop: anchor_y,
        }, 1000)
      }
    }
  },
  mounted: function () {

    setTimeout(function(){
      /* initialize swiper when document ready */
      new Swiper ('.swiper-container', {
        observer: true,
        scrollbar: '.swiper-scrollbar',
        autoplay: 8000,
        direction: 'horizontal',
        keyboardControl: true,
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 2,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        loop: true,
      })
      /* disable loader */
      $('#loader').removeClass('active')
    }, 1000)

  }
}

</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.component {
  border-bottom: 1px #DDD solid;
  background: linear-gradient(to right, lightgray 0%, white 10%, white 90%, lightgray 100%);
}

// ******************************* Swiper slide

.swiper-container {
  height: 100vh;
  @media only screen and (max-width: $breakpoint) {
    height: 70vh;
  }
}

// ******************************* Desktop CSS

.slide-page {
  height: 100vh;
  @media only screen and (max-width: $breakpoint) {
    height: 70vh;
  }
}

.slide-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  overflow: hidden;
  height: 100%;
  // @include transition(transform .5s ease-in-out, z-index .3s ease-in-out);
  transition: all .3s ease;
}

.box {
  // font-size: 1rem;
  // ********************* centering
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  // ********************* 
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(#ffffff, 0.3), transparent);
  overflow: hidden;
  .status,
  .title,
  .slogan,
  .ui.button {
    z-index: 10;
    font-size: 100%;
  }
  .status {
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
    color: white;
    text-shadow: 0 0 5px gray;
    .sub.header {
      color: white;
      text-shadow: 0 0 5px gray;
    }
  }
  .background {
    color: rgba(#333333, 0.9);
    text-shadow: 1px 3px 7px;
    font-size: 40rem;
    @media only screen and (max-width: $breakpoint) {
      font-size: 20rem;
    }
    position: absolute;
    height: initial;
  }
  .go-to {
    position: absolute;
    bottom: 3em;
    font-family: $main_font;
  }
}

</style>