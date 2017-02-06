<style lang="scss" scoped>
  .component {
    // position: relative;
    // top: 50px;
    text-align: center;
    // width: 100%;
    padding: 1em;
    border-top: 1px #AAA solid;
    // margin-top: 12vh;
  }
  .space{
    margin-left:0.4em;
  }
</style>

<template lang="jade">
  .component
    //a.ui.labeled.icon.basic.big.button(href="https://github.com/g0v/vue.vtaiwan.tw" target="_blank")
      i.github.alternate.icon
      | Code on Github
    a.big.ui.circular.facebook.icon.button(href="https://www.facebook.com/vtaiwan.tw/" title="Fackbook" target="_blank")
      i.facebook.icon
    a.big.ui.circular.youtube.icon.button.space(href="https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/" title="Youtube" target="_blank")
      i.youtube.icon
    a.big.ui.circular.github.icon(href="https://github.com/g0v/vue.vtaiwan.tw" title="Github" target="_blank")
      i.big.github.icon
    a.big.ui.circular.mail.icon.black.button(href="mailto:support@vtaiwan.tw" title="聯絡我們")
      i.mail.icon

      
    
</template>
