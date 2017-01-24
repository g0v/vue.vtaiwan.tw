<template lang="jade">
  .component

      pre.ui.basic.segment.fat-only
        p {{ desc }}
      
      .ui.basic.segment.thin-only
        h2.m-title {{ label }}

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
    props: ['list', 'desc', 'label'],
    data() {
      return {
        onMobile:false
      }
    },
    created:function(){
      this.handleResize();
    },
    mounted:function(){
      window.addEventListener('resize', this.handleResize);
    },
    methods:{
      handleResize: function(){
        if(typeof window !== 'undefined')
            this.onMobile = window.innerWidth < 768;
        else
            this.onMobile = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../sass/global.scss";

  .box {
    display: flex !important;
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
  
</style>

<style lang="scss" scoped>

  .m-step-title{
    background-color: #E6E6E6;
    text-align: left;
    padding:1rem;
    font-size:1.3rem;
    margin-right: -2rem;
    position: absolute;
    z-index: 1;
    width: 120%;
  }
  .thin-only{
    margin-top: -1em;
  }
  .m-context{
    padding-top: 50px;
  }
  .m-title{
    text-align: left;
    background-color: #E6E6E6;
    margin-right: -1rem;
    padding: 1rem;
  }


</style>