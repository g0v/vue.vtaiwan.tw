<template lang="jade">

.component
    .ui.container
        .ui.four.cards
            .card(v-for="(n,idx) in allNews")
                .image
                    img(:src="n.img_link")
                .content
                    p {{n.tags}}
                    a.header(:href="n.news_link") {{n.title}}
                    //- .meta
                    //-     span.right.floated.time 
                    //-     //- span.category {{n.source}}
                    .description 
                        p#text {{n.content}}
                .extra.content
                    .right.floated.author
                        |  {{n.source}}

</template>

<script>

export default {
  name: 'News',
  props:['allNews']
  



}
</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.component {
  padding: 1em 0;
  min-height: 72vh;
  #text:after {
        background: #FFF;
        bottom: 0;
        content: "...";
        // font-weight: bold;
        padding: 0 0 1px 8px;
        position: absolute;
        right: 0;
  }
  #text {
        font-size: 0.8em;
        width: 192px;
        height: 142px;
        line-height: 1.5;
        overflow: hidden;
        position: relative;
  }
  .ui.card>.content>.header:not(.ui), .ui.cards>.card>.content>.header:not(.ui) {
    font-weight: 700;
    text-align: left;
    font-size: 0.8em;
    margin-top: -.21425em;
    line-height: 1.2em;
  }
  .ui.cards>.card>.content>p {
    font-size: 0.6em;  
    text-align: left;
    color: red;
    background-color: #e8e8e8;
  }
  .ui.cards>.card>.image:not(.ui)>img {
    height: 150px;
  }  
}

.content {
    // a.header {
    //     font-size:1rem;
    //     line-height: 20px;
    //     font-weight: 700;
    // }
} 
</style>