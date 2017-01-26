<style scoped lang="scss">
  @import "../sass/global.scss";
</style>

<template lang="jade">
  .component
    .ui.container

      h2.ui.icon.header
        i.comment.outline.icon
        | 如何有效的發言？

      .ui.left.aligned.text.container

        p vTaiwan全部的訊息都是公開閱覽。
        p 基本上，發言沒有任何的資格或內容限制。但若您能夠參考以下的說明來進行發言，將會讓您的發言更容易被行政機關或其他參與者所閱讀及理解：
        p 第一，您在提出法規制訂或修改建議時，除了「內容」外，也可以補充說明「理由」，也就是您提出建議前所考量的各種因素。「理由」可以是資訊、案例，或者是具體可行的想法，如果可以附上訊息的來源出處更好，這樣將有助於行政機關或其他參與者更容易理解您的建議。
        p 第二，針對討論主題，也歡迎提出詢問。例如，行政機關的文字說明不夠清晰，或者是為了討論需要，希望行政機關能夠提供更多資訊的時候。
        p 第三，若您單純只是認同某個建議，可以直接為它按「讚」，而不用再說一次一樣的東西。若您不認同某個建議，或是某段說明的內容，可以提出建議或詢問，但請避免加入過多的個人情緒，例如直接的批評或是嘲諷，這樣無助於您意見的被採納。

      h2.ui.icon.header
        i.comments.outline.icon
        | 為何有些發言被標示？

      .ui.left.aligned.text.container

        p 用高亮度標示的發言，是版主推薦作為有效發言的範例。這些發言被推薦的原因，不是「內容」寫了什麼，而是具備良好的討論態度及陳述方式。
        p vTaiwan 的版主團隊為中立性質，不會對個別的發言採取支持或反對立場。

      h2.ui.center.aligned.icon.header
        i.send.outline.icon
        | 來提個案吧！
        .sub.header 由下而上的提案，經網路連署後由各部會處理並回應

      // h1.ui.header
      //   i.edit.icon
      //   | 提案

      h2.ui.header      
        a(href='http://join.gov.tw/idea/index', target='_blank')
          .ui.massive.teal.labeled.icon.button
            i.edit.icon
            p 提案
          p 公共政策網路參與平台

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
