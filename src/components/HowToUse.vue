<style scoped lang="scss">
  @import "../sass/global.scss";
  .component {
    padding: 2em 0;
  }
</style>

<template lang="pug">
  .component
    .ui.container

      h1.ui.center.aligned.icon.header
        i.circular.talk.icon
        | vTaiwan 說明

      .ui.left.aligned.text.container

        p 📣這裡是 vTaiwan 虛擬法規調適平台的工作小組社團，歡迎自由加入成為社群的貢獻者，幫助台灣在制定／修改法規的路上更加開放透明、促進更多的公民參與：)

      h1.ui.center.aligned.icon.header
        i.circular.flag.icon
        | 我可以怎麼開始幫忙呢？


      .ui.left.aligned.text.container
        h2 🗣️提供意見：針對議題提供想法或意見
        p vTaiwan 網站上有各式各樣的議題在進行意見徵集，歡迎留下你的意見、經驗，或想法，提供給行政部門參考。

        h2 📣擴散議題：讓意見徵集被看到
        p 協助轉貼、擴散 vTaiwan 網站上正在進行的意見徵集的議題給任何人，尤其是讓有可能會被該議題影響到的人們（利害關係人）或該領域的專家，讓他們能有機會在徵集意見期間內提出意見。

        h2 ✍️編輯文字：讓議題更加淺顯易懂
        p 如果你覺得某個 vTaiwan 上的議題的說明會讓公民很難懂，歡迎動手修改，你可以建立一個比較淺顯易懂的版本貼在社團，讓法律專長的社群朋友確認內容，形式不拘，不管是文字、圖像、懶人包或顏文字都可以。如果你有擅長法律白話文的熱心朋友，也歡迎介紹他幫忙。
        p 當然，如果想修改 vTaiwan 網站的說明文字也是沒有問題的唷。

        h2 🎨影像設計：讓議題更吸睛
        p vTaiwan 也徵求擅長影像設計的朋友，讓 vTaiwan 上的議題可以透過影像的力量更容易地被傳遞出去，得到更多公民意見的回饋。

        h2 📫意見回饋：提出想法
        p 如果你有任何關於能讓 vTaiwan 變得更好的發想，歡迎用各種方式告訴我們！

        h2 ㊙️其實你想做什麼都可以：沒有人是萬能的
        p 除了把意見回饋給我們，或是你就直接動手吧，
          | 「不要問為什麼『沒有人』做這個，先承認你自己就是『沒有人』。」
          | 但如果你在過程中需要幫助，歡迎在社團或slack上和大家聊聊。
        h2 ❤️或是參加我們的實體活動&nbsp;
          a(href='https://www.facebook.com/groups/vtaiwan/', target='_blank')
            | vTaiwan 小松
            sup
              i.external.link.icon

        p 如同 g0v 社群，vTaiwan 社群也是自由且去中心化的，工作都自主提案參與，分工協作，所有活動沒有強制性，專案皆由社群成員各自發起串連。

      h1.ui.center.aligned.icon.header
        i.circular.talk.icon
        | 我可以怎麼開始幫忙呢？

      .ui.text.container
        h2 相關連結
        ul
          li
            a(href='https://www.facebook.com/vtaiwan.tw/', target='_blank') vTaiwan Facebook
        ul
          li
            a(href='https://vtw.link/', target='_blank') Hackfoldr
        ul
          li
            a(href='https://g0v.hackpad.com/ep/pad/static/h', target='_blank') 聊天室：g0v-tw slack「#vtaiwan」
</template>

<script>
export default {
  name: 'HowToUse',
  data () {
    return {
        data: '...'
    }
  }
}
</script>
