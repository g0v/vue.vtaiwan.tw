<template lang="jade">
  .ui.centered.card      
    .content
      .header
        span.ui.header {{locate.title}} 
    .content
      .meta
        span 
        | 年度: {{locate.year}}
        span 
        | 區域: {{locate.region}}
        span 
        |  發佈日期: {{locate.publish_date}}      
      .description 
        div.body(v-html="locate.content")       
     .extra.content
        a(href='http://vtaiwan.tw/')
        .ui.teal.label {{locate.category}}
        .right.floated.author
            a(:href="locate.link", target='_blank') 
                | {{locate.organization}}

                                            
</template>

<script>


export default {
  name: 'fancybox',
  props:['locate']
}
</script>

<style scoped lang="scss">
@import "../sass/global.scss";
.ui.centered.card{

  .header{
    font-family: $main_font;
  }
  .ui.teal.label{
    font-size: 1rem;
  }
  .meta{
      margin-bottom: 20px;
  }
  .description{
    text-indent: 32px;
    text-align: justify;
    font-size: 1.5rem;
    p{
      line-height: 35px;
    }
  }
  .right.floated.author{
    font-weight: 600;
    margin-top:5px; 
  }
  
}
@media only screen and (max-width: $breakpoint+1){

.ui.centered.card{
    
    .description{
         font-size: 1rem;
        p{
            line-height:20px; 
        } 
    }
    .ui.teal.label{
        font-size: 0.5rem;
    }  
}

}	
</style>