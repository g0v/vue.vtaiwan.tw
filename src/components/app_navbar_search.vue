<template lang="jade">
.component
   .ui.category.search.thin-only(:class="{active: myKey}", @keyup.down="onKeyDown()")  
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
.ui.category.search {
  text-align: center;
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