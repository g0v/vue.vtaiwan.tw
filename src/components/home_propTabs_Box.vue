<template lang="jade">
  .component

      pre.ui.basic.segment(v-if="!onMobile")
        p {{ desc }}
      
      .m-title(v-if="onMobile") {{ label }}

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

  // @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
  // .emptyable:empty::after {
  //   margin: 1em auto;
  //   content: "";
  //   width: 50px;
  //   height: 50px;
  //   color: lightcoral;
  //   animation:spin 3s linear infinite;
  //   background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAABfVBMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3leqQ3AAAAfnRSTlMAAQIDBAUGBwgJCgsMDQ8QERQVFxkaHB4fISIjJCYnKywtLzAxMzc4OTs/QEFCQ0dJSktMTU5PUFFSVFVWW1xeX2FiY2RnaGlscXN3eYWGiIuOj5GSmpueoKKlpqiqq62vsLK1t7rAwcPIzNHX2d7g4uTm6evt7/Hz9ff5+/0C5wS+AAAByklEQVQYGe3BaVsSUQAG0PeOkywSGhK2r6YhlZRtlmWGLRaVJqZl0p6ZlSgKYsz7270wk15mrug8ffUc7HOLXMx+WqoUFqYfnW3FHhipBSrmzmE3yVW6/O5GM8HP1MgHIF07AI3DJdpWcplbN0cm/tC21gUxxavwOmmxpnQ/Ckfb4ArrknlyBh5dFmtGDSjEHYuOqoBLuEyp0AmX9l90dMLlO6XFADzMH7TdQKPrlIphaLygbRYNzApJKwaNV3RYAqohSiPQyHJLHKplkssGNPpmK3QMQhGnNIAdtJ1+MLdB8gkU9yiF0UzkTNqE4h3JefhSJvkcfghKA/CjhdIx+NIaCgXQlAiFQgK+zJB8DF/KJIfhRwulS/AjRikBRbz3kEAzDymZ2GZYJOfHejoEdrBE8gtU63R8exqExnlKl6HKcUsMXkaBZNWEKkWHdQoaY5QyaNBOm3UUGv2UVk00KtGWgtcF1nTDZZyODNzusiYLtyT/+doBVfQDa94LuB0keTvPutwRAUdinHUfDXgV2QsxQdvG9Gi6rz/zpkLbpIBGzwlIV/5SI41mgq/p9jaCXUSfrXNb9WUMeyASQ5M/i9ba4tTwcQP7/tsmD17vR2+KlQEAAAAASUVORK5CYII=) no-repeat;
  // }

  .box {
    display: flex !important;
  }

  a {
    // border: 1px solid #DDD;
    box-shadow: 0 3px 1em hsla(0,0,0%,0.1);
    // flex: 1 1 20%;
    display: flex;
    flex-flow: column nowrap;
    // @include transition(all .1s ease);
    // &:hover {
    //   margin: 1px -1px -1px 1px;
    // }
    img {
      flex: 1 1;
      max-width: 100%;
      height: auto;
    }
    // .null {
    //   flex: 1 1;
    // }
    h3 {
      // flex: 1 1;
      // color: black;
      // font-family: $main_font;
      // font-size: .8rem;
      // margin: .5em;
      // margin-top: .5em;
      // flex: 1;
      // text-align: left;
      // .sub.header {
        // color: #999;
        // font-size: .5em;
      // }
    }
    .progress_bar {
      // flex: 0 1;
      background-color: #CCC;
      padding: 0;

      .progress {
        height: 5px;
        background-color: lightcoral;
        // border-radius: 0 5px 0 0;
      }
      margin-bottom: 4px;
    }
    .progress_text {
      // font-size: .8rem;
      // text-align: left;
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
    margin: 1.5rem -2rem 1.5rem 1rem;
    font-size: 2rem;
    padding: 20px;
    background-color: #E6E6E6;
  }
</style>