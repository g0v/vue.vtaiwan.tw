<template lang="jade">
.component
  .ui.container

    h2.ui.sticky.header.m-title.thin-only(:data-name="name")
      | {{ label }}

    .desc.ui.basic.center.aligned.segment
      i.quote.left.icon.thin-only
      | {{ desc }} 
      i.quote.right.icon.thin-only

    .ui.four.column.grid.stackable

      .box.column(v-for="t in list")
        router-link.ui.segment(:to="'/topic/' + t.routeName")
          
          img(:src ="t.cover || 'http://lorempixel.com/320/240/sports'")

          h3.ui.header {{ t.title }}

          .progress_bar
            .progress(v-bind:style="{ width: (t.progress / t.total * 100) + '%' }")

          .progress_text.ui.top.right.attached.teal.large.label(v-if="t.status==='討論中'") 還有{{Math.floor(t.total - t.progress)}}天
          .progress_text.ui.top.right.attached.blue.large.label(v-else) 討論已結束

</template>

<script>
  export default {
    name: 'box',
    props: ['list', 'desc', 'label', 'name'],
    data() {
      return {
        // onMobile:false
      }
    },
    created:function(){
      // this.handleResize();
    },
    mounted:function(){
      // window.addEventListener('resize', this.handleResize);

      /* make mobile's m-title sticky to its own content */
      $('.m-title.sticky').sticky({
        observeChanges: true,
        offset        : 1, // make tab change & tab click w/o conflict to each other
        onStick       : function(){
          let btn_name = $(this).data('name')
          $("#mobile-step a").removeClass('active')
          $("#mobile-step a[href='#"+btn_name+"']").addClass('active')
          // this.$emit('stick', btn_name) // this != vm
        }
      })
    },
    methods:{
      // handleResize: function(){
      //   if(typeof window !== 'undefined')
      //       this.onMobile = window.innerWidth < 768;
      //   else
      //       this.onMobile = false;
      // }
    }
  }
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.box {
  display: flex !important;
}

.desc {
  width: 100%;
  margin-top: -1em;
}

a {
  box-shadow: 0 3px 1em hsla(0,0,0%,0.1);
  display: flex;
  flex-flow: column nowrap;
  img {
    flex: 1 1;
    max-width: 100%;
    height: auto;
  }
  .progress_bar {
    background-color: #CCC;
    padding: 0;

    .progress {
      height: 5px;
      background-color: lightcoral;
    }
    margin-bottom: 4px;
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