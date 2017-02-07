<template lang="jade">
.component
  .ui.container.basic.segment(:id="name")

    h2.ui.sticky.header.m-title.thin-only
      | {{ label }}

    .desc.ui.basic.center.aligned.segment.fat-only
      i.quote.left.icon
      | {{ desc }} 
      i.quote.right.icon

    .ui.compact.message(v-if="!list.length")
        p 目前還沒有正在進行的議案…

    .ui.four.column.grid.stackable

      .box.column(v-for="t in list")
        router-link.box-inner.ui.segment(:to="'/topic/' + t.routeName")
          
          img.ui.rounded.bordered.image(:src ="t.cover || 'http://lorempixel.com/320/240/sports'")

          h3.ui.header {{ t.title }}

          .progress_bar(v-if="name == 'discuss'", :style="progressStyle(t)")
            .progress_text.ui.bottom.attached.red.large.label(v-if="t.status==='討論中'") 還有{{Math.floor(t.total - t.progress)}}天
            .progress_text.ui.bottom.attached.red.large.label(v-else) 討論已結束

          // .progress(v-if="t.total - t.progress", :style="{ width: (t.progress / t.total * 100) + '%' }")

</template>

<script>
  export default {
    name: 'box',
    props: ['list', 'desc', 'label', 'name'],
    data() {
      return {
        mTop: 0 /* top offset of m-title */
        // onMobile:false
      }
    },
    updated:function(){
      this.mTop = $("#"+this.name).offset().top /* m-title position */
      
      // this.handleResize();
    },
    mounted:function(){
      // window.addEventListener('resize', this.handleResize);

      /* make mobile's m-title sticky to its own content */
      // let self = this /* save vm for later use */
      // let btn_name = this.name
      // $('.m-title.sticky[data-name="'+btn_name+'"]').sticky({
      //   observeChanges: true,
      //   onStick       : function(){
      //     self.$emit('stickTo', btn_name)
      //   }
      // })

      /* bind event scroll to window */
      window.addEventListener('scroll', this.mTitleHitEvent);
      // $(window).scroll(this.mTitleHitEvent)

    },
    methods:{
      // handleResize: function(){
      //   if(typeof window !== 'undefined')
      //       this.onMobile = window.innerWidth < 768;
      //   else
      //       this.onMobile = false;
      // }

      mTitleHitEvent: function() {
        let btn_name = this.name
        let el = "#mobile-step a[href='#"+btn_name+"']"
        let mTop = this.mTop
        let wScroll = $(window).scrollTop() /* length window has scrolled */
        if ( wScroll > (mTop-1) ){ /* -1 in order to compromise with menu click */
          this.$emit('stickTo', btn_name) /* sent event trigger to parent comp */
        }
      },

      progressStyle: function(t) {
        let color = $('.progress_bar').css('color')
        let percent = t.progress / t.total * 100
        return {"background": "linear-gradient(to right, "+color+" 0%, "+color+" "+percent+"%, #AAA "+percent+".1%, #AAA 100%)"}
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
      margin: 0 -1em -1em -1em;
      width: calc(2em+100%);
      height: 2em;
      color: $main_color;
      position: relative;
      
      .progress_text {
        padding: 0 0 .5em 0;
        background: transparent !important;
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