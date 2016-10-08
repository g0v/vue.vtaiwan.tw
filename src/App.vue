<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/" exact>
            <img class="logo" src="./assets/logo.png" alt="logo">
            vTaiwan
          </router-link>
        </li>
        <li>Comment 留言不忘返</li>
        <li>Live Draft 直播寫草案</li>
        <li>Follow PROPOSAL 來追蹤定案</li>
      </ul>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="stylus">
*
  box-sizing border-box
body
  border 4px solid #D75155
  height 100vh
  margin 0
nav
  a
    text-decoration none
    &:visited
      color black
  .logo
    width 40px
    height 40px
  ul
    width 100%
    text-align center
    padding-left 0
    list-style none
  li
    display inline-block
    float none
</style>
