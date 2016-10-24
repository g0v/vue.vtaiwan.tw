<template lang="jade">
nav
  .bg
  ul
    li
      router-link(to='/', exact='')
        .sub &nbsp;          
        .main
          img.logo(width='40', height='40', src='../assets/logo.png', alt='logo')
          | vTaiwan
    li(v-for='r in routes', v-if="r.r")
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

<style lang="scss">

@import "../sass/global.scss";

.bg {
  position: absolute;
  z-index: -1;
  background-color: #ccc;
  height: 100px;
  width: 100%;
}

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
        background-color: white;
        cursor: pointer;
        display: inline-block;
        height: 70px;
        font-size: 0.6rem;
        text-decoration: none;
        &:visited {
           color: #030;
        }
        &:hover {
          border-bottom: 3px solid green;
        }
        &.active, &.router-link-active {
          background-color: $main;
          color: white;
          &.join { background-color: $join }
          &.comment { background-color: $comment }
          &.live { background-color: $live }
          &.track { background-color: $track }
        }
        @include transition(background-color 0.5s ease);
        padding: 10px;

        border-left: 1px solid #ccc;

        .sub {
          font-size: 0.7rem;
          line-height: 1rem;
        }
        .main {
          font-size: 1rem;
        }
      }
    }
  }
  .logo {
    position: relative;
    top: -10px;
    left: -5px;
    float: left;
    width: 40px;
    height: 40px;
  }
}

</style>
