<template lang="jade">
.component
  .ui.container.basic.segment(:id="name")

    h2.ui.center.aligned.header.m-title.thin-only
      | {{ label }}

    .desc.ui.basic.center.aligned.segment.fat-only
      sup
        i.quote.left.icon
      | {{ desc }} 
      sub
        i.quote.right.icon

    .ui.info.message(v-if="!list.length")
        i.archive.icon
        | 目前還沒有正在進行的議案…

    .ui.four.stackable.cards
      router-link.card(:to="'/topic/' + item.routeName", v-for="item in list")
        .progress_bar(v-if="name === 'discuss'")
          .progress_text(v-if="item.status === '討論中'") 還有{{Math.floor(item.total - item.progress)}}天
          .progress_text(v-else) 討論已結束
          .progress_color(:style = "progressStyle(item.progress, item.total)")
        .image
          img.ui.image(:src ="item.cover || 'http://lorempixel.com/320/240/sports'")
        .content
          h3.ui.header {{ item.title }}
        .extra.content
          p {{ item.slogan }}

    //- .ui.four.column.grid.stackable
    //-   .box.column(v-for="item in list")
    //-     router-link.box-inner.ui.segment(:to="'/topic/' + item.routeName")
    //-       img.ui.rounded.bordered.image(:src ="item.cover || 'http://lorempixel.com/320/240/sports'")
    //-       h3.ui.header {{ item.title }}
    //-       .progress_bar(v-if="name === 'discuss'")
    //-         .progress_text.ui.bottom.attached.red.large.label(v-if="item.status === '討論中'") 還有{{Math.floor(item.total - item.progress)}}天
    //-         .progress_text.ui.bottom.attached.red.large.label(v-else) 討論已結束
    //-         .progress_color(:style = "progressStyle(item.progress, item.total)")

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
  font-size: 120%;
}
.info.message {
  text-align: center;
}
.cards .card {
    margin: 0 0 1em 0;
    overflow: hidden;
    .content h3.ui.header {
      font-family: $main-font;
    }
    .progress_bar {
      background: #AAAAAA;
      // margin: 0 -1em;
      height: 2em;
      line-height: 2em;
      position: absolute;
      top: 0;
      width: 100%;
      
      .progress_text {
        color: white;
        position: absolute;
        z-index: 200;
        width: 100%;
        text-align: center;
      }

      .progress_color{
        background: $main_color;
        position: absolute;
        z-index: 100;
        height: 100%;
        box-shadow: rgba(0, 0, 0, 0.20) 0 0 3px 3px;
      }
    }
}

/********************************* mobile view */

.m-title {
  // text-align: left;
  background-color: #E6E6E6;
  // margin-right: -1rem;
  margin: 0 0 1em 0;
  padding: .5em;
}

</style>