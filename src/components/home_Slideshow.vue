<template lang="jade">
  .component
    .slide-page      
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
          .status {{t.status}}


</template>


<script type="text/javascript">

// import slide from 'vue-slide'

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
  }
}

</script>


<style lang="scss" scoped>
  @import "../sass/global.scss";

  .component {
    position: relative;
    width: 100%;
    img {
      position: relative;
      width: 100%;
      z-index: -3;
    }
  }

  .slide-page {
    display: block;
    height: 90%;
    height: 99.9vh;
  }

  .slide-item {
    position: absolute;
    top: 0;
    left: 0;
    @include transition(transform .5s ease-in-out, z-index .3s ease-in-out);
    img.full-page {
      min-height: 80vh;
      width: 100vw;
      background-color: #999;
      opacity: 0.6;
    }
    overflow: hidden;
    // height: 80%;
    height: 99.9vh;
  }

  .box {
    font-size: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    @include transform(translate(-50%, -50%));
    // width: 100%;
    // background: hsla(0,0,0%,0.1);
    display: flex;
    justify-content: center;
    flex-flow: column;
    width: 30em;
    // max-width: 100%;
    height: 30em;
    // max-height: 100%;
    border-radius: 30rem;
    border: 5px solid lightcoral;
    background: hsla(0, 0, 100%, 0.75);
    box-shadow: 2px 4px 5px hsla(0,0,0%,0.5);
    
    .slogan, .title, .status {
      // margin-left: auto;
      // margin-right: auto;
      margin: 1em auto;
      display: box;
    }
    .slogan.ui.header {
      font-family: $main_font;
      font-size: 3rem;
      // text-shadow: 0 0px 1em white;
      // text-shadow: 0 2px 2px #fff, 0 0 2px #fff;
      // width: 250px;
    }
    .title {
      width: 250px;
      border: 2px solid black;
      background-color: white;
      padding: 0.8em;
    }
    .status {
      color: white;
      background-color: black;
      width: 100px;
      padding: 0.5em;
    }
  }

  a {
    cursor: pointer;
    &:hover {
      i {
        color: white !important;
      }
    }
    &.pre, &.next {      
      position: absolute;
      z-index: 5;
      top: 44vh;
      text-shadow: 0 0 1em white;
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