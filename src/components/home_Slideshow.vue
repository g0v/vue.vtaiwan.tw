<template lang="jade">
  .component
    .desktop-container
      .slide-page.fat-only
        a.pre(@click="c = cycle(-1)")
          i.huge.caret.black.left.icon
        a.next(@click="c = cycle(1)")
          i.huge.caret.black.right.icon
        router-link.slide-item(v-for="(t,idx) in mySlideTopics",
          :to="'/topic/'+t.routeName",
          :style="{ 'z-index': t.zIndex, opacity: t.opacity, transform: t.transform, '-ms-transform': t.transform, '-webkit-transform': t.transform  }")
          img.full-page(:src="t.cover")
          .box
            .slogan.ui.header {{t.slogan}}
            .title {{t.title}}
              span#test1 jQuery Test
            .status {{t.status}}
    .mobile-container
      .m-slide-page.thin-only
        router-link.m-slide-item(v-for="(t,idx) in allTopics",:to="'/topic/'+t.routeName",:style="{'background-image':'url('+t.cover+')'}")
          .box
            // .slogan.ui.header {{t.slogan}}
            .title {{t.title}}
            .status {{t.status}}
            .button 進入議題

</template>


<script type="text/javascript">

import $ from 'jquery'
import jQuery from 'jquery'

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
        return o
      })
    }
  },
  methods: {
    relax: function () {
      this.isBusy = false;
    },
    cycle: function (n) {

      $('#test1').toggle();

      var c = this.c;
      var ts = this.hotTopics;

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
        setTimeout(this.relax, 500)
      }
      return c;
    }
  },
  mounted: function () {
    $('#test1').hide();
  }
}

</script>

<style lang="scss" scoped>

  .component {
    padding-bottom: -66px;
  }
  .mobile-container {
    position: relative;
    overflow: scroll;
    img {
      position: relative;
      width: 100%;
      z-index: -3;
    }
  }

  .desktop-container {
    position: relative;
    overflow: hidden;
    img {
      position: relative;
      width: 100%;
      z-index: -3;
    }
  }

  .mobile-container::-webkit-scrollbar {
    height:0px;
    width:0px;
  }

</style>

<style lang="scss" scoped>
// Desktop CSS
@import "../sass/global.scss";

.slide-page {
  display: block;
  // height: 90%;
  height: 100vh;
}

.slide-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  @include transition(transform .5s ease-in-out, z-index .3s ease-in-out);
  img.full-page {
    // **************** to keep image ratio
    min-height: 100%;
    min-width: 100%;
    width: auto;
    // **************** to let image center
    display: absolute;
    left: 50%;
    @include transform(translate(-50%, 0));
    // background-color: gray;
    // opacity: 0.6;
  }
  overflow: hidden;
  // height: 80%;
  height: 100%;
  .box {
    // font-size: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    @include transform(translate(-50%, -50%));
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    width: 100%;
    // max-width: 100%;
    height: 100%;
    // box-shadow: 2px 4px 5px hsla(0,0,0%,0.5);
    // border-radius: 30rem;
    // background: linear-gradient(to bottom, transparent, hsla(0, 0, 0%, 0.8), transparent);
    background: radial-gradient(circle, hsla(0, 0, 0%, 0.8), transparent);
    .slogan,
    .title,
    .status {
      // margin: 1em auto;
    }
    .slogan.ui.header {
      font-family: $main_font;
      font-size: 3rem;
      color: white;
      letter-spacing: .3em;
      text-shadow: 0 0 5px gray;
    }
    .title {
      font-size: 1.2rem;
      width: 15em;
      background-color: white;
      letter-spacing: .3em;
      padding: 1em;
      margin: 1em;
    }
    .status {
      font-size: 2rem;
      font-weight: 700;
      color: lightcoral;
      border-bottom: 6px double lightcoral;
      padding: 0.1em;
    }
  }
}

a {
  cursor: pointer;
  &:hover {
    i {
      color: white !important;
    }
  }
  &.pre,
  &.next {
    position: absolute;
    z-index: 5;
    top: 44vh;
    text-shadow: 0 0 5px lightgray;
  }
  &.pre {
    left: 5px;
  }
  &.next {
    right: 5px;
  }
  i {
    @include transition(all 0.3s);
  }
}
</style>

<style lang="scss" scoped>
// Mobile CSS
@import "../sass/global.scss";

.m-slide-page {
  display: -webkit-inline-box;
}

.m-slide-item {
  display: block;
  width: 98vw;
  // logo:10vh, nav:20vh
  height: 70vh;
  margin: 0 0.5px;
  overflow: hidden;
  background-size: auto 100%;
  background-position: center;
  img {
    width: auto;
    height: 100%;
    left: -50%;
  }
  .box {
    height: 100%;
    background: radial-gradient(circle, hsla(0, 0, 0%, 0.8), transparent);
    .status {
      position: relative;
      top: 105px;
      width: 100%;
      color: $join_color;
      font-size: 1.3rem;
    }
    .title {
      position: relative;
      top: 170px;
      width: 100%;
      color: white;
      font-size: 1.3rem;
    }
    .button {
      position: relative;
      top: 235px;
      color: white;
      font-size: 1.4rem;
      padding: 14px 30px;
      margin: 0 calc(50% - 75px);
      background-color: $main_color;
      border-radius: 8px;
    }
  }
}
</style>