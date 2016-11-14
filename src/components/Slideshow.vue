<style lang="scss" scoped>
  .inner {
    width: 100%;
    img {
      width: 100%;
    }
  }

</style>

<template lang="jade">
  .inner
    img(src="http://static.thousandwonders.net/Taiwan.original.3738.jpg")

  //to use vue-slide,
  //see this: https://github.com/hilongjw/vue-slide

  .container
  // pagination example
	  .timeline
	    .item(@click='turnTo (1)', :class='{"active": slide.init.currentPage == 1}') page1
	    .item(@click='turnTo (2)', :class='{"active": slide.init.currentPage == 2}') page2
	    .item(@click='turnTo (3)', :class='{"active": slide.init.currentPage == 3}') page3

	  // next and pre method
	  img.slider-left(src='./assets/images/slide-arrow.svg', @click='slidePre', :class='{"disable": !this.slide.init.canPre}')
	  img.slider-right(src='./assets/images/slide-arrow.svg', @click='slideNext', :class='{"disable": !this.slide.init.canNext}')
	  // bind init and pageList

	  slide(:pages='someList', :slide='slide')
	    // slot
	    .slider-item(v-for='item in someList', class='page{{$index}}', :style='someList[$index].style')
	      h1 {{item.title}}
	      button(@click='turnTo(($index+2))') to page{{$index+1}}


</template>

<script type="text/javascript">
import slide from 'vue-slide'
export default {
    data () {
        return {
            someList:[
                {
                    title: '1',
                    img: 'http://static.thousandwonders.net/Taiwan.original.3738.jpg',
                    //slide init
                    origin: 0,
                    current: 0,
                    style:{
                        'background-image': 'url(http://static.thousandwonders.net/Taiwan.original.3738.jpg)',
                        'background-size': 'cover',
                        //transform
                        'transform': `translateX(0%)`
                    }
                },
                {
                    title: '2',
                    img: 'http://static.thousandwonders.net/Taiwan.original.3738.jpg',
                    origin: 100,
                    current: 0,
                    style:{
                        'background-image': 'url(http://static.thousandwonders.net/Taiwan.original.3738.jpg)',
                        'background-size': 'cover',
                        'transform': `translateX(${ 100 }%)`
                    }
                },
                {
                    title: '3',
                    img: 'http://static.thousandwonders.net/Taiwan.original.3738.jpg',
                    origin: 200,
                    current: 0,
                    style:{
                        'background-image': 'url(http://static.thousandwonders.net/Taiwan.original.3738.jpg)',
                        'background-size': 'cover',
                        'transform': `translateX(${ 200 }%)`
                    }
                }
            ],
            slide: {
                init: {
                    pageNum: 3,
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
    },
    methods: {
        turnTo (num) {
            console.log(num)
            this.$broadcast('slideTo', num)
        },
        slideNext () {
            this.$broadcast('slideNext')
        },
        slidePre () {
            this.$broadcast('slidePre')
        }
    },
    components: {
        slide
    }
}
</script>