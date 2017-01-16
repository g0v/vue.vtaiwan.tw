<template lang="jade">
  .component

    nav.fat-only.navbar
      // router-link.explore.fat-only(to='/', exact='')
        // | 探索

      form.search(:class="{active: myKey}", @keyup.down="onKeyDown()")
        i.search.icon
        input(type="search", v-model="myKey", placeholder="探索")
        SearchResult(v-show="myKey", :allTopics="allTopics", :myKey = "myKey", :myIdx="myIdx")

      router-link.logo(to='/', exact='')
        img(width='30', height='30', src='../assets/logo.png', alt='logo')
        span.fat-only vTaiwan

      // .null

      // .more.thin-only
      //   a(@click="showDropDown = !showDropDown")
      //     | 更多
      //     i.caret.down.icon(v-if="!showDropDown")
      //     i.caret.up.icon(v-else)
      //   .dropdown.menu(v-if="showDropDown")
      //     router-link.item(v-for='r in routes', v-if="r.r", :to="'/'+r.r", :class='r.r', exact='')
      //       | {{ r.t }}

      .tab
        router-link.item(v-for='r in routes', v-if="r.r", :to="'/'+r.r", :class='r.r', exact='')
          | {{ r.t }}
          //.sub {{r.en | uppercase}}

    nav.thin-only
      .m-logo
        img(width='30', height='30', src='../assets/logo.png', alt='logo')
        span vTaiwan
      .menu
        router-link.m-item(:to="'/how-to-use'") 使用手冊
        router-link.m-item(:to="'/'") 探索議題
        router-link.m-item(:to="'/'") 搜尋議題
        
</template>

<script>

import SearchResult from "./app_nav_SearchResult.vue";

export default {
  name: 'navbar',
  props: ['routes', 'allTopics'],
  components: {
    SearchResult
  },
  data () {
    return {
      myKey: '',
      myIdx: 0,
      showDropDown: false
    }
  },
  methods: {
    onKeyDown: function () {
      this.myIdx++;
      this.showDropDown = true;
      // body...
    }
  }
}
</script>


<style lang="scss" scoped>

  @import "../sass/global.scss";

  $navHeight: 55px;
  $navBgColor: hsla(0, 0%, 100%, 0.95);
  .component{
    @media screen and (min-width:$breakpoint){
      padding-bottom: 5%;
    }
    
  }
  .navbar {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    height: $navHeight;
    overflow: visible;
    align-items: center;
    background: $navBgColor;
    border-bottom: 1px solid lightgray;
  }
  
  form.search {
    flex: 0 1 auto;

    position: relative;
    padding: .5em;

    i.search.icon {
      position: absolute;
      z-index: -1;
      right: .75em;
      line-height: 1.75em;
      color: gray;
    }

    input {
      color: black;
      height: 1.75em;
      border: 1px solid gray;
      border-radius: 1em;
      padding: 0 .6em;
      background-color: transparent;
      &:focus {
        outline: none;
      }
    }

    &.active {
      i.icon {
        visibility: hidden;
      }
    }

  }

  .logo {
    flex: 0 1 auto;

    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-left: 1em;
    padding-right: 1em;
    span {
      margin-left: 0.5em;
    }
  }

  // .explore {
  // display: flex;
  // align-items: center;
  // justify-content: space-around;
  //   height: $navHeight;
  //   min-width: 4em;
  //   &.router-link-active {
  //     background-color: white;
  //   }
  // }


  // .null {
  //   flex: 1;
  // }

  .tab {
    flex: 0 1 auto;

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
        background: lightcoral;
      }
      &.active, &.router-link-active {
        background-color: $main;
        color: white;
        &.join { background-color: $join }
        &.intro { background-color: $intro }
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

  .more {
    position:relative;
    .dropdown.menu {
      position: absolute;
      z-index: 10;
      top: $navHeight - 20px;
      left: -4em;
      width: 10em;
      background-color: $navBgColor;
      padding: 0.5em;
      a {
        display: block;
        margin-top: 0.5em;
      }
    }
  }

</style>

<style lang="scss" scoped>
  .thin-only{
    padding-bottom: 5%;
    .menu{
      display: flex;
      .m-item{
        cursor: pointer !important;
        flex: 1;
        text-align: center;
        font-size: 1.3rem;
        padding: 10px;
        color: black;
      }
    }
    .m-logo{
      height: 155px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 60px;
        height: 60px;
        margin-right: 15px;
        margin-top: 50px;
      }
      span{
        padding-top: 50px;
        font-size: 1.6rem;
      }
    }
  }
</style>