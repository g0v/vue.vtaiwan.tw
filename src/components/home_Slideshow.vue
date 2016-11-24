<template lang="jade">
  .component
    a.pre(@click="c = cycle(c,topics,-1)")
      i.huge.chevron.black.left.icon
    a.next(@click="c = cycle(c,topics,1)")
      i.huge.chevron.black.right.icon
    img.full-page(:src="topics[c].img")
    .box
      .slogen.ui.header {{topics[c].slogan}}
      .title {{topics[c].title}} {{c}}
      .status {{topics[c].status}}



    // to use vue-slide, see this: https://github.com/hilongjw/vue-slide
</template>

<script type="text/javascript">
  
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

  img.full-page {
    min-height: 80vh;
    width: 100vw;
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