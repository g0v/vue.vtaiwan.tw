<template lang="jade">

  .component
    // .desktop-container.fat-only
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

    .swiper-container
      .swiper-wrapper
        .swiper-slide(v-for="(t, idx) in mySlideTopics", :style="t.new_style")
          .box
            .status.ui.basic.huge.label 
              | {{t.status}}
            h1.slogan.ui.header
              | {{t.title}}
              .sub.header {{t.slogan}}
            router-link.ui.right.labeled.icon.teal.huge.button(:to="'/topic/' + t.routeName")
              i.right.arrow.icon
              p 進入議題
      .swiper-button-prev
      .swiper-button-next
      .swiper-pagination 
      .swiper-scrollbar 
      
</template>


<script type="text/javascript">

// import $ from 'jquery'

export default {
  name: 'SlideShow',
  props: ['hotTopics', 'allTopics'],
  data () {
    return {
      c: 0,
      lastC: 0,
      isBusy: false
    }
  },
  computed: {
    mySlideTopics: function () {
      var c = this.c;
      var lastC = this.lastC;
      var ts = this.hotTopics;
      return ts.map(function (o, idx) {
        //o.transform = 'translateX('+ (idx-c) * 100 +'%)';
        o.transform = 'translateX(0%)';

        if (idx == c-1 || (c == 0 && idx == ts.length-1)) {
          o.transform = 'translateX(-100%)';
        }
        if (idx == c+1 || (c == ts.length-1 && idx == 0)) {
          o.transform = 'translateX(100%)';
        }
        o.zIndex = (idx == c || idx == lastC) ? 4 : 3;
        o.opacity = (idx == c || idx == lastC) ? 1 : 0;

        // combine styles into single 
        o.style = {
          'z-index': o.zIndex, 
          'opacity': o.opacity, 
          'transform': o.transform, 
          '-ms-transform': o.transform, 
          '-webkit-transform': o.transform, 
          'background': 'url(' + o.cover + ') 100% 100% / cover'
        };

        o.new_style = {
          'background': 'url(' + o.cover + ') 100% 100% / cover'
        }
        return o
      })
    }
  },
  methods: {
    cycle: function (n) {

      let c = this.c;
      let ts = this.hotTopics;

      if (!this.isBusy) {
        this.lastC = c;
        c = c + n;

        if (c < 0) {
          c = ts.length + c;
        }
        if (c >= ts.length) {
          c = c - ts.length;
        }

        this.isBusy = true;
        setTimeout(function(){
          this.isBusy = false;
        }, 500)
      }
      return c;
    }
  },
  mounted: function () {
    //initialize swiper when document ready
    new Swiper ('.swiper-container', {
      // Optional parameters
      observer: true,
      autoplay: 5000,
      direction: 'horizontal',
      // Navigation arrows
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      // If we need pagination
      pagination: '.swiper-pagination',
      // And if we need scrollbar
      scrollbar: '.swiper-scrollbar',
    })
  }
}

</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

// .desktop-container, .mobile-container {
//   position: relative;
//   overflow: hidden;
//   img {
//     position: relative;
//     width: 100%;
//     z-index: -3;
//   }
// }

// .mobile-container {
//   overflow: scroll;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// }

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
  background: radial-gradient(circle, hsla(0, 0, 0%, 0.8), transparent);
  .status {
    color: $step_color;
    border: 2px solid $step_color;
    background: hsla(0,0,30,0.5);
    // font-size: 2rem;
    // font-weight: 700;
    // padding: 0.1em;
  }
  .title {
    color: white;
  }
  .slogan {
    margin: .5em 0 1em 0;
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
}

a {
  cursor: pointer;
  &:hover {
    i {
      color: white !important;
      transition: all .3s ease;
    }
  }
  &.pre,
  &.next {
    position: absolute;
    z-index: 5;
    text-shadow: 0 0 5px white;
    top: 44vh;
    // @media only screen and (max-width: $breakpoint) {
    //   top: 33vh;
    // }
  }
  &.pre {
    left: 5px;
  }
  &.next {
    right: 5px;
  }
  // i {
    // @include transition(all 0.3s);
  // }
}

// ******************************* Mobile CSS

.m-slide-page {
  // display: -webkit-inline-box;
  white-space: nowrap;
}

.m-slide-item {
  display: inline-block;
  width: 98vw;
  // ************** logo=10vh, nav=20vh
  height: 70vh;
  margin: 0 0.5px;
  background-size: cover;
  background-position: center;
  // overflow: hidden;
  // min-height: 70vh;
  // img {
    // width: auto;
    // min-height: 100%;
    // left: -50%;
  // }
  // .box {
  //   min-height: 100%;
  //   background: radial-gradient(circle, hsla(0, 0, 0%, 0.8), transparent);
  //   // ********************* centering
  //   display: flex;
  //   justify-content: center;
  //   flex-flow: column;
  //   align-items: center;
  //   .status {
  //     color: white;
  //     background-color: $step_color;
  //     // position: relative;
  //     // top: 105px;
  //     // width: 100%;
  //     // font-size: 1.3rem;
  //   }
  //   .title {
  //     color: white;
  //     // position: relative;
  //     // top: 170px;
  //     // width: 100%;
  //     // margin: 1em 0;
  //     // font-size: 1.3rem;
  //   }
  //   // .button {
  //     // position: relative;
  //     // top: 235px;
  //     // color: white;
  //     // font-size: 1.4rem;
  //     // padding: 14px 30px;
  //     // margin: 0 calc(50% - 75px);
  //     // background-color: $main_color;
  //     // border-radius: 8px;
  //   // }
  // }
}
</style>