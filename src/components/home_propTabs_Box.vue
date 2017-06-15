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

    .ui.four.stackable.doubling.cards
      router-link.card(:to="'/topic/' + item.routeName", v-for="item in list")
        .image(:style="'background-image:url(' + item.cover + ')'")
          template(v-if="name === 'discuss'")
            .progressbar(v-if="item.status === '意見徵集'")
              | 剩
              .active-border(:data-degrees='Math.floor(item.progress / item.total * 360)', data-color='#565656', data-bgcolor='#3fadc7')
                .circle
                  span.percent
                    | {{Math.floor(item.total - item.progress)}}
              | 天
            .progressbar(v-else) 討論已結束
        .content
          h3.ui.header {{ item.title }}
        .extra.content
          p {{ item.slogan }}

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
      setTimeout( () => this.drawProgress(), 1000)
      // this.$nextTick( () => this.drawProgress())
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
      drawProgress: function () {
        $(".active-border").map( function () {
          let degrees = $(this).data("degrees")
          let color = $(this).data("color")
          let bgcolor = $(this).data("bgcolor")
          if (degrees <= 180) {
            $(this).css('background-image','linear-gradient(' + (90+degrees) + 'deg, transparent 50%, ' + color + ' 50%),linear-gradient(90deg, ' + color + ' 50%, transparent 50%)')
          }
          else {
            $(this).css('background-image','linear-gradient(' + (degrees-90) + 'deg, transparent 50%, ' + bgcolor + ' 50%),linear-gradient(90deg, ' + color + ' 50%, transparent 50%)')
          }
          $(this).css('background-color', bgcolor)
          $(this).find('.circle').css('background-color', color)
        })
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
      font-size: 150%;
    }
    .image{
      position: relative;
      height: 12em;
      background-size: cover;
      background-position: center;
      .progressbar {
        color: white;
        background: rgba(0,0,0,0.5);
        width: 100%;
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 8px 8px 8px 0;
        z-index: 100;
        .active-border{
          font-size: 1.1rem;
          margin: 0 .5ch;
          position: relative;
          text-align: center;
          width: calc( 2em + 4px );
          height: calc( 2em + 4px );
          border-radius: 50%;
          // background-color: #3fadc7;
          .circle {
            position: relative;
            top: 2px;
            left: 2px;
            width: 2em;
            height: 2em;
            border-radius: 50%;
            // background-color: #565656;
            line-height: 1;
            .percent{
              font-size: 1.1em;
              position: relative;
              top: .4em;
            }
          }
        }
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
