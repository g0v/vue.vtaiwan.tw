<template lang="pug">
  #footer.component

      .ui.inverted.vertical.footer.segment

        .ui.center.aligned.container
          .ui.stackable.inverted.divided.grid
            .three.wide.column
              h4.ui.inverted.header 相關連結
              .ui.inverted.link.list
                a.item(href="https://talk.vtaiwan.tw/" title="vTaiwan討論區" target="_blank") 討論區
                a.item(href="https://github.com/g0v/vue.vtaiwan.tw" title="Github" target="_blank") Github
                a.item(href="https://pdis.tw/" title="PDIS 公共數位創新空間" target="_blank") PDIS
                a.item(href="https://org.vtaiwan.tw" title="歷史資料" target="_blank") 歷史資料
                a.item(href="https://join.gov.tw/policies/detail/031e9918-59d5-4a1a-b105-96af228f3147" title="公共政策網路參與平台" target="_blank") 公共政策網路參與平台                
            .three.wide.column
              h4.ui.inverted.header 影音專區
              .ui.inverted.link.list
                a.item(href="https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/" title="Youtube" target="_blank") Youtube
                a.item(href="https://www.facebook.com/vtaiwan.tw/" title="Facebook" target="_blank") Facebook
                router-link.item(to='/subscribe', exact='', title="訂閱電子報") 訂閱電子報
            .three.wide.column
              h4.ui.inverted.header 關於我們
              .ui.inverted.link.list
                router-link.item(to='/contactus', exact='', title="留言") 留言
                router-link.item(to='/how-to-use', exact='', title="使用手冊") 使用手冊
                router-link.item(to='/intro', exact='', title="關於vTaiwan") 關於 vTaiwan
            .seven.wide.column
              h4.ui.inverted.header vTaiwan
              p
                | vTaiwan 為討論法規該如何制定或修改的平台，透過彼此的意見交流，希望能夠產出符合各利益關係人期待，也貼近實際需求的法規內容。
              a(href="mailto:support@vtaiwan.tw") 支援信箱 support@vtaiwan.tw

        .ui.inverted.section.divider

        .ui.center.aligned.container
          a.ui.circular.facebook.icon.button(href="https://www.facebook.com/vtaiwan.tw/" title="Facebook" target="_blank")
            i.big.facebook.icon
          a.ui.circular.youtube.icon.button(href="https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/" title="Youtube" target="_blank")
            i.big.youtube.icon
          router-link.ui.icon(to='/', exact='', title="Home")
            img(src='../assets/vTaiwan_logo_2017.png', alt='logo')
          a.ui.circular.icon.grey.button(href="https://github.com/g0v/vue.vtaiwan.tw" title="Github" target="_blank")
            i.big.github.icon
          a.ui.circular.icon.orange.button(href='mailto:replies+private@vtaiwan.tw', exact='', title="Email Us")
            i.big.mail.icon

          img.hidden(src='../assets/rolling.gif', alt='loading')

</template>
<style lang="scss" scoped>
@import "../sass/global.scss";
.component {
  position: relative;
  margin: 0 auto;
  // margin-top: 40px;
  max-width: 100%;
}

img {
    width: 3.5em;
    height: auto;
    vertical-align: bottom;
    &.hidden {
      display: none;
    }
}

.ui.icon {
  margin: 0 1ch;
  @media only screen and (max-width: $breakpoint){
   font-size: x-small;
  }
}

a.ui.icon.button{
  background-color: #333;
}


</style>
