<template lang="jade">
  .component

    .ui.grid
      .three.column.row
        .column
          .row
            a(href="https://github.com/g0v/vue.vtaiwan.tw" title="Github" target="_blank")
              u code on github
          .row
            a(href="https://www.facebook.com/vtaiwan.tw/" title="Fackbook" target="_blank")
              u vTaiwan官方臉書
        .column
          .row
            a(href="https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/" title="Youtube" target="_blank")
              u 影音專區
          .row
            a
              u 訂閱電子報
        .column
          .row
            router-link.m-logo(to='/intro', exact='')
              u 關於vTaiwan
          .row
            router-link.m-logo(to='/Contactus', exact='')
              u 聯絡我們
          

    //a.ui.labeled.icon.basic.big.button(href="https://github.com/g0v/vue.vtaiwan.tw" target="_blank")
      i.github.alternate.icon
      | Code on Github
    a.big.ui.circular.facebook.icon.button(href="https://www.facebook.com/vtaiwan.tw/" title="Fackbook" target="_blank")
      i.facebook.icon
    a.big.ui.circular.youtube.icon.button(href="https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/" title="Youtube" target="_blank")
      i.youtube.icon
    a.big.ui.circular.github.icon.black.button(href="https://github.com/g0v/vue.vtaiwan.tw" title="Github" target="_blank")
      i.github.icon
    a.big.ui.circular.mail.icon.teal.button(href="mailto:support@vtaiwan.tw" title="聯絡我們")
      i.mail.icon

      
    
</template>
<style lang="scss" scoped>
@import "../sass/global.scss";

  
  .component { //設定整個footer 背景顏色
    text-align: center;
    padding: 1em;
    background-color: #efefef;
  }
  .row{       //行間距 & 字型
    margin-bottom: 1em;
    font-family: $main_font;
  }
  u{            //文字顏色
    color: black;
    text-align: left;
  }
  
</style>