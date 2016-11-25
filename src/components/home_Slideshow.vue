<template lang="jade">
  .component
    .slide-page      
      a.pre(@click="lastC = c; c = cycle(c,hotTopics,-1)")
        i.huge.chevron.black.left.icon
      a.next(@click="lastC = c; c = cycle(c,hotTopics,1)")
        i.huge.chevron.black.right.icon
      .slide-item(v-for="(t,idx) in mySlideTopics", 
        :style="{ 'z-index': t.zIndex, opacity: t.opacity, transform: t.transform, '-ms-transform': t.transform, '-webkit-transform': t.transform  }")
        img.full-page(:src="t.img")
        .box
          .slogan.ui.header {{t.slogan}}
          .title {{t.title}}
          .status {{t.status}}


</template>


<script type="text/javascript">

// import slide from 'vue-slide'

export default {
  data () {
    return {
      c: 0,
      hotTopics: [
        {slogan:'邁向世界的舞台', title:'公司英文名稱登記', status:'討論中', img:'http://static.thousandwonders.net/Taiwan.original.3738.jpg'},        
        {slogan:'理想與現實', title:'公司法中的社會企業', status:'討論中', img:'http://lorempixel.com/320/240/cats'},        
        {slogan:'事做不夠假放不夠',title:'一例一修草案', status:'已送審', img:'http://lorempixel.com/320/240/transport'}
      ]
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
    cycle: (c,ts,n) => {
      c = c + n;
      if (c < 0) {
        c = ts.length + c;
      }
      if (c >= ts.length) {
        c = c - ts.length;
      }
      return c;
    }
  }
}

</script>


<style lang="scss" scoped>
  @import "bourbon";

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
    height: 90vh;
  }

  .slide-item {
    position: absolute;
    top: 0;
    left: 0;
    @include transition(transform .8s ease-in-out, z-index .5s ease-in-out);
    img.full-page {
      min-height: 80vh;
      width: 100vw;
    }
    overflow: hidden;
    height: 80%;
    height: 80vh;
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
      top: 33vh;
      text-shadow: 0px 2px 1px #ccc;
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

  .box {
    position: absolute;
    top: 33vh;
    width: 100%;
    font-size: 1rem;
    .slogan, .title, .status {
      margin-left: auto;
      margin-right: auto;
      display: box;
    }
    .slogan {
      text-shadow: 0 2px 2px #fff, 0 0 2px #fff;
      width: 250px;
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

  
</style>