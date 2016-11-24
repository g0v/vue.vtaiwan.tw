<template lang="jade">
  .component
    .slide-page      
      a.pre(@click="c = cycle(c,topics,-1)")
        i.huge.chevron.black.left.icon
      a.next(@click="c = cycle(c,topics,1)")
        i.huge.chevron.black.right.icon
      .slide-item(v-for="(t,idx) in topics", 
        :style="{ transform: 'translateX('+ (idx-c) * 100 +'%)', '-ms-transform': 'translateX('+ (idx-c) * 100 +'%)', '-webkit-transform': 'translateX('+ (idx-c) * 100 +'%)'  }")
        img.full-page(:src="t.img")
        .box
          .slogan.ui.header {{t.slogan}}
          .title {{t.title}}
          .status {{t.status}}


    // to use vue-slide, see this: https://github.com/hilongjw/vue-slide
      slide(:pages='slideList', :slide='slideParam')
        .slider-item(v-for='item in slideList', :style='slideList[$index].style')
          
          .box
            .slogen.ui.header {{item.slogan}}
            .title {{item.title}}
            .status {{item.status}}

</template>


<script type="text/javascript">

// import slide from 'vue-slide'

export default {
  data () {
    return {
      c: 0,
      topics: [
        {slogan:'邁向世界的舞台',title:'公司英文名稱登記',status:'討論中', img:'http://static.thousandwonders.net/Taiwan.original.3738.jpg'},        
        {slogan:'理想與現實',title:'公司法中的社會企業',status:'討論中', img:'http://lorempixel.com/320/240/cats'},        
        {slogan:'事做不夠假放不夠',title:'一例一修草案',status:'已送審', img:'http://lorempixel.com/320/240/transport'}
      ]
    }
  },
/*  computed: {
    // a computed getter
    slideList: function () {
      return this.topics.map(function(o, idx) {
        ans = o;
        ans.origin = idx * 100;
        ans.current = 0;
        ans.style = {
          'background-image': ans.img,
          'background-size': 'cover',
          'transform': `translateX(${ 100 }%)`
        }
        return ans;
      })
    },
    slideParam: function (argument) {
      return {
        init: {
              pageNum: this.topics.length,
              currentPage: 1,
              canPre : false,
              canNext: true,
              start: {},
              end: {},
              tracking: false,
              thresholdTime: 500,
              thresholdDistance: 100
        }
      }
    }
  }, */
  methods: {
    cycle: (c, ts, n) => {
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
    @include transition(all 0.3s ease-in-out);
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
    &.pre {
      position: absolute;
      z-index: 5;
      top: 33vh;
      left: 5px;
    }
    &.next {
      position: absolute;
      z-index: 5;
      top: 33vh;
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