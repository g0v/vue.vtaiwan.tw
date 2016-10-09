<template>
  <div id="app">
    <nav class="ui menu">
      <ul>
        <li>
          <router-link to="/" exact>
            <img class="logo" src="./assets/logo.png" alt="logo">
            vTaiwan
          </router-link>
        </li>
        <li>
          <router-link to="/join" exact>
            Pitch Issue 來提個案吧
          </router-link>
        </li>
        <li>
          <router-link to="/live" exact>
            Live Draft 直播寫草案
          </router-link>
        </li>
        <li>
          <router-link to="/track" exact>
            Follow PROPOSAL 來追蹤定案
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

<style lang="sass">
html {
  font-size: 16px;
  font-size: 2vmax;
}
* {
  box-sizing: border-box;
}
body {
  border: 4px solid #3cf;
  height: 100vh;
  margin: 0;
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
    text-decoration: none;
    &:visited {
      color: green;
    }
    &:hover {
      border-bottom: 3px solid green;
    }
    &.active, &.router-link-active {
      background-color: #ccf;
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
