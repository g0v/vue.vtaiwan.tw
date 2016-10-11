<template lang="jade">
nav.ui.menu(v-cloak='')
  ul
    li
      router-link(to='/', exact='')
        .main
          img.logo(width='40', height='40', src='../assets/logo.png', alt='logo')
          |             vTaiwan
    li(v-for='r in routes')
      router-link(:to="'/'+r.r", :class='r.r', exact='')
        .sub {{r.en | uppercase}}
        .main {{r.t}}
</template>

<script>
export default {
  name: 'navbar',
  props: ['routes'],
  data () {
    return {
      data: '...'
    }
  }
}
</script>

<style lang="sass">

@import "../sass/global.scss";

nav {
  ul {
    width: 100%;
    text-align: center;
    padding-left: 0;
    list-style: none;
    font-size:0;
    li {
      display: inline-block;
      float: none;
      font-size: 1rem;
      a {
        color: #333;
        cursor: pointer;
        display: block;
        font-size: 0.6rem;
        text-decoration: none;
        &:visited {
           color: #030;
        }
        &:hover {
          border-bottom: 3px solid green;
        }
        &.active, &.router-link-active {
          background-color: #ccf;
          &.join { background-color: lighten($join,20) }
          &.comment { background-color: lighten($comment,20) }
          &.live { background-color: lighten($live,20) }
          &.track { background-color: lighten($track,20) }
        }
        transition: background-color 0.5s ease;
        -webkit-transition: background-color 0.5s ease;
        -moz-transition: background-color 0.5s ease;
        -o-transition: background-color 0.5s ease;  
        padding: 10px;
        border: 1px solid gray;
        .sub {

        }
        .main {
          font-size: 1rem;
        }
      }
    }
  }
  .logo {
    width: 40px;
    height: 40px;
  }
}

</style>
