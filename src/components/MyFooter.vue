<template lang="jade">
  .component
    .ui.container
      .ui.grid
        .three.column.row
          .column
            .ui.list
              P [ 相關連結 ]
              a.item(href="https://www.facebook.com/vtaiwan.tw/" title="Fackbook" target="_blank")
                i.right.triangle.icon
                | Fackbook
              a.item(href="https://github.com/g0v/vue.vtaiwan.tw" title="Github" target="_blank")
                i.right.triangle.icon
                | code on github
                
          .column
            .ui.list
              P [ 影音專區 ]
              a.item(href="https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/" title="Youtube" target="_blank")
                i.right.triangle.icon
                | Youtube
              //a.item(href="mailto:replies+subscribe@vtaiwan.tw?subject=開啟vtaiwan電子報功能&body=開啟vtaiwan discourse電子報功能" title="訂閱電子報")
              router-link.m-logo.item(to='/subscribe', exact='')
                i.right.triangle.icon
                | 訂閱電子報
            
          .column
            .ui.list
              P [ 關於我們 ]
              router-link.m-logo.item(to='/Contactus', exact='')
                i.right.triangle.icon
                | 聯絡我們
              router-link.m-logo.item(to='/intro', exact='')
                i.right.triangle.icon
                | 關於vTaiwan

      .ui.section.divider        
      .linkicon   
        a.big.ui.circular.facebook.icon.button(href="https://www.facebook.com/vtaiwan.tw/" title="Fackbook" target="_blank")
          i.facebook.icon
        a.big.ui.circular.youtube.icon.button(href="https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/" title="Youtube" target="_blank")
          i.youtube.icon
        a.big.ui.circular.github.icon.black.button(href="https://github.com/g0v/vue.vtaiwan.tw" title="Github" target="_blank")
          i.github.icon
        router-link.m-logo.big.ui.circular.mail.icon.orange.button(to='/Contactus', exact='')
          i.mail.icon

      
    
</template>
<style lang="scss" scoped>
@import "../sass/global.scss";

  
  .component {                //設定整個footer 背景顏色
    //text-align: center;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.04);
  }
  .row{                       //行間距 & 字型
    margin-bottom: 1em;
    font-family: $main_font;
  }
  u{                          //文字顏色
    color: black;
    text-align: left;
  }
  .ui.button {                //按鈕預設灰色
    background-color: rgba(34, 36, 38, 0.21);
    margin-right: 1em;
  }
  .ui.button:hover {            //按鈕hover顯示原色
      filter: inherit;
  }
  .ui.list>a.item {             //lis顏色
      color: #696969;
  }
  .ui.list>a.item:hover {       //lishover顏色
      color: #1b1c1d;
  }
  .linkicon{                    //連結icon 置中
    text-align: center;
  }
  .ui.grid{                     //grid增加margin-bottom
    margin-bottom: 2em;
    text-align: left;
  }
  
</style>