<style lang="scss" scoped>

@import "../sass/global.scss";

.nav {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90px;
  margin-left: 30px;
  margin-right: 20px;
}

.main {
  flex: 1;
}

.tab {
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
      }
    }
  }
}
</style>

<template lang="jade">
nav.nav
  router-link(to='/', exact='').logo
    img(width='30', height='30', src='../assets/logo.png', alt='logo')
    span vTaiwan
  .main
  .tab
    ul
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
