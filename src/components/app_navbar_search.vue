<template lang="jade">
.component
  .thin-only
   .ui.category.search(:class="{active: myKey}", @keyup.down="onKeyDown()")
     // p 關鍵字搜尋   
     .ui.icon.input
      input.prompt(type="search", v-model="myKey", placeholder="搜尋...")
      i.search.icon 
     SearchResult(v-show="myKey", :allTopics="allTopics", :myKey = "myKey", :myIdx="myIdx")  
</template>

<script>

import SearchResult from "./app_nav_SearchResult.vue";

export default {
    name : "search",
    props: ['routes', 'allTopics'],
    components:{
      SearchResult
    },
    data () {
        return {
         myKey: '',
         myIdx: 0,
         showDropDown: false
        }
    },
    methods: {
      onKeyDown: function () {
       this.myIdx++;
       this.showDropDown = true;
       // body...
    }
  }

}




</script>

<style lang ="scss" scoped> 

@import "../sass/global.scss";

.component {
  min-height: 47vh;;
}
p {
   text-align: left;
   margin-top: 10px;
   margin-bottom: 0;
   font-size: 1em;
   color: gray;

}
.ui.icon.input{
  margin-top: 40px;
  width: 250px;
  font-size:1.5em;

  input {
    font-family: $main_font;
  }

  i.icon {
    font-size:1.2em;
    top: -1px;
    /*right:5px;*/
  }
}


</style>