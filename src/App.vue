<template>
  <div id="app" :class = "{join: $route.path == '/join', comment: $route.path == '/comment', live: $route.path == '/live', track: $route.path == '/track'}">
    <nav class="ui menu">
      <ul>
        <li>
          <router-link to="/" exact>
            <img class="logo" src="./assets/logo.png" alt="logo">
            vTaiwan
          </router-link>
        </li>        
        <li v-for="r in myRoutes">
          <router-link :to="'/'+r.r" :class="r.r" exact>
            {{r.en | uppercase}}
            {{r.t}}
          </router-link>
        </li>
      </ul>
    </nav>
    <div id="main">
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
    <footer>
      施工中...
      <a href = "https://xd.adobe.com/view/504e446c-90c8-4816-5ac3-941ee02cbdff/" target="_blank">Wireframe Design</a> | 
      <a href = "https://github.com/g0v/vue.vtaiwan.tw/issues" target="_blank">Issues</a>
    </footer>
  </div>
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
  &.join {
    border-color: $join;
  }
  &.live {
    border-color: $live;    
  }
  &.track {
    border-color: $track;    
  }
}
#main {
  position: absolute;
  top: 150px;
  left: 0;
  width: 100%;
  text-align: center;
}
nav {
  a {
    color: #333;
    cursor: pointer;
    font-size: 0.6rem;
    text-decoration: none;
    &:visited {
      color: green;
    }
    &:hover {
      border-bottom: 3px solid green;
    }
    &.active, &.router-link-active {
      background-color: #ccf;
      &.join { background-color: $join }
      &.comment { background-color: $comment }
      &.live { background-color: $live }
      &.track { background-color: $track }
    }
    padding: 10px;
    border: 1px solid gray;
  }
  .logo {
    width: 40px;
    height: 40px;
  }
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
    }
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
</style>
