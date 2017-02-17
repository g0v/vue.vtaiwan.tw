<template lang="jade">
  .component
    
      .ui.inverted.vertical.footer.segment
        .ui.center.aligned.container
          .ui.stackable.inverted.divided.grid
            .three.wide.column
              h4.ui.inverted.header 相關連結
              .ui.inverted.link.list
                a.item(href="https://talk.vtaiwan.tw/" title="vTaiwan討論區" target="_blank") 討論區
                a.item(href="https://github.com/g0v/vue.vtaiwan.tw" title="Github" target="_blank") Github
                router-link.m-logo.item(to='/', exact='') vTaiwan
            .three.wide.column
              h4.ui.inverted.header 影音專區
              .ui.inverted.link.list
                a.item(href="https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/" title="Youtube" target="_blank") Youtube
                a.item(href="https://www.facebook.com/vtaiwan.tw/" title="Fackbook" target="_blank") Fackbook              
                router-link.m-logo.item(to='/subscribe', exact='') 訂閱電子報
            .three.wide.column
              h4.ui.inverted.header 關於我們
              .ui.inverted.link.list                
                router-link.m-logo.item(to='/Contactus', exact='') 聯絡我們
                router-link.m-logo.item(to='/how-to-use', exact='') 使用手冊
                router-link.m-logo.item(to='/intro', exact='') 關於vTaiwan
            .seven.wide.column
              h4.ui.inverted.header vTaiwan
              p
                | vTaiwan為討論法規該如何制定或修改的平台，透過彼此的意見交流，希望能夠產出符合各利益關係人期待，也貼近實際需求的法規內容。
        .ui.inverted.section.divider
        .ui.centered
          
          a.big.ui.centered.circular.facebook.icon.button(href="https://www.facebook.com/vtaiwan.tw/" title="Fackbook" target="_blank")
            i.facebook.icon
          a.big.ui.circular.youtube.icon.button(href="https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/" title="Youtube" target="_blank")
            i.youtube.icon
          a.big.ui.circular.github.icon.grey.button(href="https://github.com/g0v/vue.vtaiwan.tw" title="Github" target="_blank")
            i.github.icon
          router-link.m-logo.big.ui.circular.mail.icon.orange.button(to='/Contactus', exact='')
            i.mail.icon
          router-link.m-logo.item(to='/', exact='') 
            img(src='../assets/vTaiwan_logo_2017.png', alt='logo')
      
    
</template>
<style lang="scss" scoped>
@import "../sass/global.scss";

  

img {
    width: 3.2em;
    height: auto;
    vertical-align: bottom;
  }
 .ui.centered{
   text-align:center;
 }


  .linkicon{                    //連結icon 置中
    text-align: center;
  }


  
</style>