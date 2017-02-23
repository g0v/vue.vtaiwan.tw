<template lang="jade">
.component
  .ui.container.basic.segment(:id="name")

    h2.ui.sticky.header.m-title.thin-only
      | {{ label }}

    .desc.ui.basic.center.aligned.segment.fat-only
      sup
        i.quote.left.icon
      | {{ desc }} 
      sub
        i.quote.right.icon

    .ui.compact.info.message(v-if="!list.length")
        | 目前還沒有正在進行的議案…

    .ui.four.column.grid.stackable

      .box.column(v-for="item in list")
        router-link.box-inner.ui.segment(:to="'/topic/' + item.routeName")
          
          img.ui.rounded.bordered.image(:src ="item.cover || 'http://lorempixel.com/320/240/sports'")

          h3.ui.header {{ item.title }}

          //- .progress_bar(v-if="name === 'discuss'", :style="progressStyle(item.progress, item.total)")
          .progress_bar(v-if="name === 'discuss'")
            .progress_text.ui.bottom.attached.red.large.label(v-if="item.status === '討論中'") 還有{{Math.floor(t.total - t.progress)}}天
            .progress_text.ui.bottom.attached.red.large.label(v-else) 討論已結束
            .progress_color(:style = "progressStyle(item.progress, item.total)")

</template>

<script>
  export default {
    name: 'box',
    props: ['list', 'desc', 'label', 'name'],
    data() {
      return {
        isSent: false
      }
    },
    mounted:function(){
      /* bind event scroll to window */
      window.addEventListener('scroll', this.mTitleHitEvent)
      // $(window).scroll(this.mTitleHitEvent)
    },
    beforeDestroy: function(){
      window.removeEventListener('scroll', this.mTitleHitEvent)
    },
    methods:{
      mTitleHitEvent: function() {
        let btn_name = this.name
        let el = $("#"+btn_name)
        if (!el.length) /* check if m-title exist */
          return 0
        let mTop = el.offset().top /* m-title's position */
        let mHeight = el.height() /* m-title's height */
        let wScroll = $(window).scrollTop() /* length window has scrolled */
        let isSent = this.isSent
        /* minus 1 to be safer */
        let isScollingOn = (wScroll > (mTop-1)) && (wScroll < (mTop+mHeight))
        if ( isScollingOn && !isSent ){ /* do not double sent */
          this.$emit('stickTo', btn_name) /* sent event trigger to parent comp */
          this.isSent = true
        }
        else if ( !isScollingOn ) {
          this.isSent = false
        }
      },
      progressStyle: function(progress, total) {
        console.log(progress+' '+total)
        let color = '#3fadc7' /* $main_color */
        let percent = progress / total * 100
        // let style = {"background": "linear-gradient(to right, "+color+" 0%, "+color+" "+percent+"%, #AAA "+percent+".1%, #AAA 100%)"}
        let style = {"width": percent + "%"}
        return style
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.desc {
  width: 100%;
  margin-top: -1em;
}

.box {
  display: flex !important;

  .box-inner {
    box-shadow: 0 3px 1em hsla(0,0,0%,0.1);
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;

    img.ui {
      flex: 1 1;
    }
    h3.ui {
      margin-top: 1em;
    }
    .progress_bar {
      background: #AAAAAA;
      margin: 0 -1em -1em -1em;
      height: 2em;
      width: calc(2em + 100%);
      position: relative;
      
      .progress_text {
        z-index: 200;
        padding: 0 0 .5em 0;
        background: transparent !important;
      }

      .progress_color{
        background: $main_color;
        position: absolute;
        z-index: 100;
        left: 0;
        // width: 100%;
        height: 100%;
      }
    }
  }
}


/********************************* mobile view */
// .m-step-title {
//   background-color: #E6E6E6;
//   text-align: left;
//   padding: 1rem;
//   font-size: 1.3rem;
//   margin-right: -2rem;
//   position: absolute;
//   z-index: 1;
//   width: 120%;
// }

// .thin-only {
//   margin-top: -1em;
// }

// .m-context {
//   padding-top: 50px;
// }

.m-title {
  // text-align: left;
  background-color: #E6E6E6;
  // margin-right: -1rem;
  padding: .5em;
}


</style>