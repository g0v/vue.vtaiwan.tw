<template lang="jade">
  .component

    nav.fat-only
      .ui.grid

        .seven.wide.column
          .ui.category.search(:class="{active: myKey}", @keyup.down="onKeyDown()")   
           .ui.icon.input
             input.prompt(type="search", v-model="myKey", placeholder="搜尋...")
             i.search.icon 
            SearchResult(v-show="myKey", :allTopics="allTopics", :myKey = "myKey", :myIdx="myIdx")

        .two.wide.column
          router-link.logo(to='/', exact='')
            img(src='../assets/vTaiwan_logo_2017.png', alt='logo')
            span vTaiwan

        .seven.wide.column.right
        
          button.go-to.ui.yellow.icon.button(@click.prevent="goAnchor('top')")
            i.up.arrow.icon

          router-link.item(v-for='r in routes', v-if="r.r", :to="'/'+r.r", :class='r.r', exact='')
            | {{ r.t }}

    nav.thin-only
      router-link.m-logo(to='/', exact='')
        img(src='../assets/vTaiwan_logo_2017.png', alt='logo')
        span vTaiwan
      .menu
        router-link.m-item(to='/how-to-use') 使用手冊
        router-link.m-item(to='/') 探索議題
        router-link.m-item(to='/search') 搜尋議題
        
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
    },
    goAnchor: function(event){
      if(event == "top"){
        /* go to top */
        // window.scrollTo(0, 0)
        $('html, body').animate({
          scrollTop: 0,
        }, 1000)
      }
      else if(event){
        /* get the hash name */
        let anchor = event.target.hash
        /* get the top position of anchor */
        let anchor_y = $(anchor).offset().top
        /* go to anchor */
        // window.scrollTo(0, anchor_y)
        $('html, body').animate({
          scrollTop: anchor_y,
        }, 1000)
      }
    }
  }
}
</script>


<style lang="scss" scoped>

@import "../sass/global.scss";

// $navHeight: 55px;
$navBgColor: hsla(0, 0%, 95%, 1);

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
.ui.icon.input{
  height:50px;
  padding:10px;
  input{
    font-size: 1.2rem;
    font-family: $main_font;
    padding:0.5em 1em;
  }
  i.icon {
    font-size:0.8em;
    top: -1px;
    right:10px;
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

.right {
  text-align: right;
  a.item {
    font-size: 1.2rem;
    display: inline-block;
    line-height: $navHeight;
    padding: 0 1em;
    color: dimgray;
    cursor: pointer;
    text-decoration: none;
    @include transition(background-color 0.5s ease);
    
    &:hover {
      color: white;
      background: $main_color;
    }
    &.active, &.router-link-active {
      background-color: $intro_color;
    }
  }
}

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
  }
  span {
    color: black;
    font-family: $logo_font;
    font-size: 1.6rem;
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
    &:hover {
      color: white;
      background: $main_color;
    }
  }
}
</style>