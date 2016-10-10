<template lang="jade">
#app(:class="{join: $route.path == '/join', comment: $route.path == '/comment', live: $route.path == '/live', track: $route.path == '/track'}")
  nav.ui.menu(v-cloak='')
    ul
      li
        router-link(to='/', exact='')
          .main
            img.logo(width='40', height='40', src='./assets/logo.png', alt='logo')
            |             vTaiwan
      li(v-for='r in myRoutes')
        router-link(:to="'/'+r.r", :class='r.r', exact='')
          .sub {{r.en | uppercase}}
          .main {{r.t}}
  .breadcrumb
    router-link(v-if="rtName($route.path)", to='/', exact='')
      | vTaiwan HOME
    span(v-else) vTaiwan HOME
    span(v-if="rtName($route.path)")&nbsp;>&nbsp;
    | {{rtName($route.path)}}
  #main
    transition(name='fade', mode='out-in')
      router-view.view
  footer
    | 施工中...
    a(href='https://xd.adobe.com/view/504e446c-90c8-4816-5ac3-941ee02cbdff/', target='_blank') Wireframe Design
    |  
    a(href='https://github.com/g0v/vue.vtaiwan.tw/issues', target='_blank') Issues
</template>

<script>
export default {
  data () {
    return {
      myRoutes: [
        {en:'Pitch Issue',t:'來提個案吧',r:'join'},
        {en:'Comment',t:'留言不忘返',r:'comment'},
        {en:'Live Draft', t:'直播寫草案',r:'live'},
        {en:'Follow PROPOSAL', t:'來追蹤定案',r:'track'}
      ]
    }
  },
  methods: {
    rtName(path) {
      var r = this.myRoutes.filter((o) => {
        return '/'+o.r == path;
      })[0];
      return r ? r.t : '';
    }
  }
}

</script>


<style lang="sass">
$join: #f3c;
$comment: #f33;
$live: #33f;
$track: #ff2;


html {
  font-size: 16px;
  font-size: 2vmax;
}
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
}
#app {
  border: 5px solid #3cf;
  height: 100vh;
  width: 100%;
  margin: 0;
  transition: border-color 0.5s ease;
  -webkit-transition: border-color 0.5s ease;
  -moz-transition: border-color 0.5s ease;
  -o-transition: border-color 0.5s ease;  
  &.join {    border-color: $join  }
  &.comment {    border-color: $comment  }
  &.live {    border-color: $live  }
  &.track {   border-color: $track  }
}
#main {
  position: absolute;
  top: 150px;
  left: 0;
  width: 100%;
  text-align: center;
}
.breadcrumb {
  position: absolute;
  top: 100px;
  left: 1vw;
  font-size: 0.5rem;
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
          &.live { background-color: lighten($live,30) }
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
footer {
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
  height:50px;
  text-align:center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-in;
  -webkit-transition: opacity .5s ease-in;
  -moz-transition: bopacity .5s ease-in;
  -o-transition: opacity .5s ease-in; 
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
