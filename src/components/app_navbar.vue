<template lang="jade">
  .component

    nav.fat-only
      // router-link.explore.fat-only(to='/', exact='')
        // | 探索
      .ui.grid
        .seven.wide.column
          form.search(:class="{active: myKey}", @keyup.down="onKeyDown()")
            i.search.icon
            input(type="search", v-model="myKey", placeholder="探索")
            SearchResult(v-show="myKey", :allTopics="allTopics", :myKey = "myKey", :myIdx="myIdx")

        .two.wide.column
          router-link.logo(to='/', exact='')
            img(src='../assets/vTaiwan_logo_2017.png', alt='logo')
            span vTaiwan

        .seven.wide.column.right
          router-link.item(v-for='r in routes', v-if="r.r", :to="'/'+r.r", :class='r.r', exact='')
            | {{ r.t }}
            //.sub {{r.en | uppercase}}

      // .null

      // .more.thin-only
      //   a(@click="showDropDown = !showDropDown")
      //     | 更多
      //     i.caret.down.icon(v-if="!showDropDown")
      //     i.caret.up.icon(v-else)
      //   .dropdown.menu(v-if="showDropDown")
      //     router-link.item(v-for='r in routes', v-if="r.r", :to="'/'+r.r", :class='r.r', exact='')
      //       | {{ r.t }}

    nav.thin-only
      router-link.m-logo(to='/', exact='')
        // img(width='30', height='30', src='../assets/vTaiwan_logo_2017.png', alt='logo')
        img(src='../assets/vTaiwan_logo_2017.png', alt='logo')
        span vTaiwan
      .menu
        router-link.m-item(to='/how-to-use') 使用手冊
        router-link.m-item(to='/') 探索議題
        router-link.m-item(to='/search') 搜尋議題
        
      // .ui.three.item.menu
      //   router-link.item(to='/how-to-use') 使用手冊
      //   router-link.item(to='/') 探索議題
      //   router-link.item(to='/') 搜尋議題
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

// $navHeight: 55px;
// $navBgColor: hsla(0, 0%, 100%, 0.95);

.component {
  // ****************** push home by nav height
  @media screen and (min-width: $breakpoint){
    height: $navHeight;
  }
  
  nav.fat-only {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
    // display: flex;
    // align-items: center;
    height: $navHeight;
    overflow: visible;
    background: $navBgColor;
    border-bottom: 1px solid lightgray;
  }
}

form.search {
  // flex: 0 1 auto;
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
  line-height: $navHeight;
  padding: 0 0 0 1em;

  i.search.icon {
    position: absolute;
    z-index: -1;
    right: .55em;
    line-height: $navHeight;
    color: gray;
  }

  input {
    color: gray;
    height: calc( #{$navHeight} * 0.55);
    border: 1px solid lightgray;
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
  // flex: 0 1 auto;
  height: $navHeight;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding-left: 1em;
  // padding-right: 1em;
  img {
    width: auto;
    max-height: 75%;
  }
  span {
    color: black;
    font-family: $logo_font;
    font-size: 2rem;
    margin-left: .3em;
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

.right {
  text-align: right;
  a.item {
    // display: flex;
    // flex-flow: row nowrap;
    // align-items: center;
    // -webkit-box-align: center;
    // vertical-align: middle;
    // justify-content: center;
    font-size: 1.2rem;
    display: inline-block;
    line-height: $navHeight;
    padding: 0 1em;
    color: dimgray;
    cursor: pointer;
    text-decoration: none;
    @include transition(background-color 0.5s ease);
    // padding: 10px;
    // border-left: 1px solid #ccc;

    &:visited {
      // color: #030;
    }
    &:hover {
      color: white;
      background: $main_color;
    }
    &.active, &.router-link-active {
      background-color: $intro_color;
      // color: black;
      // &.join { background-color: $join }
      // &.intro { background-color: $intro }
      // &.live { background-color: $live }
      // &.track { background-color: $track }
    }

    // .sub {
    //   font-size: 0.7rem;
    //   line-height: 1rem;
    // }
  }
}

// .more {
//   position:relative;
//   .dropdown.menu {
//     position: absolute;
//     z-index: 10;
//     top: $navHeight - 20px;
//     left: -4em;
//     width: 10em;
//     background-color: $navBgColor;
//     padding: 0.5em;
//     a {
//       display: block;
//       margin-top: 0.5em;
//     }
//   }
// }

// ************************* m-obile version

@media screen and (max-width: $breakpoint){
  .thin-only {
    border-bottom: 1px solid #ccc;
  }
}

.m-logo {
  width: 50%;
  margin: 0 auto;
  height: 20vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  img {
    width: 60px;
    height: 60px;
    margin: 0;
    // margin-right: 15px;
    // margin-top: 50px;
  }
  span {
    color: black;
    font-family: $logo_font;
    font-size: 1.6rem;
    // padding-top: 50px;
    padding: 0 0 0 .3em;
  }
}

.menu {
  height: 10vh;
  line-height: 10vh;
  display: flex;
  a.m-item, a.item {
    cursor: pointer !important;
    flex: 1;
    text-align: center;
    font-size: 1.3rem;
    color: dimgray;
    // padding: 10px;
    // vertical-align: bottom;

    &:hover {
      color: white;
      background: $main_color;
    }
  }
}
</style>