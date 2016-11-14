<style lang="scss" scoped>

@import "../sass/global.scss";

$navHeight: 55px;

.nav {
  display: flex;
  height: $navHeight;
  overflow: visible;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
}

.logo, .explore {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.logo {
  width: 90px;
  margin-left: 30px;
  margin-right: 20px;
}

.explore {
  height: $navHeight;
  min-width: 4em;
  &.router-link-active {
    background-color: white;
  }
}

form.search {
  padding: 5px;
  i.icon {
    position: relative;
    z-index: -1;
    left: 1.6em;
    color: white;
    font-size: 1.4em;
  }
  input {
    height: 2.5em;
    border: 1px solid white;
    border-radius: 1em;
    background-color: transparent;
  }
  &.active {
    i.icon {
      visibility: hidden;
    }
  }
}

.null {
  flex: 1;
}

.tab {
  display: flex;
  margin-left: auto !important;
  a.item {
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    vertical-align: middle;
    justify-content: center;
    color: #333;
    height: $navHeight;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;

    &:visited {
      color: #030;
    }
    &:hover {
  //    border-bottom: 3px solid green;
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
</style>

<template lang="jade">
nav.nav
  router-link.logo(to='/', exact='')
    img(width='30', height='30', src='../assets/logo.png', alt='logo')
    span vTaiwan
  router-link.explore(to='/', exact='')
    | 探索
  form.search(:class="{active: key}")
    i.search.icon
    input(type="search", v-model="key")
    span {{key}}
  .null
  .tab    
    router-link.item(v-for='r in routes', v-if="r.r", :to="'/'+r.r", :class='r.r', exact='')
      | {{ r.t }}
      //.sub {{r.en | uppercase}}
        
</template>

<script>
export default {
  name: 'navbar',
  props: ['routes'],
  data () {
    return {
      key: '',
      data: '...'
    }
  }
}
</script>
