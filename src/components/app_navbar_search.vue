<template lang="jade">
.component
  .thin-only
   form.search(:class="{active: myKey}", @keyup.down="onKeyDown()")
     p 關鍵字搜尋   
     i.search.icon
     input(type="search", v-model="myKey", placeholder="搜尋")
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

p {
   text-align: left;
   margin-top: 10px;
   margin-bottom: 0;
   font-size: 1em;
   color: gray;

}
form.search {
  // flex: 0 1 auto;
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
  line-height: $navHeight;
  /*padding: 0 0 0 1em;*/

  i.search.icon {
    position: absolute;
    z-index: -1;
    right: .55em;
    line-height: $navHeight;
    color: gray;
  }

  input {
    color: gray;
    height: calc( #{$navHeight} * 0.55);
    border: 1px solid lightgray;
    /*border-radius: 1em;*/
    padding: 0 .6em;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }

  &.active {
    i.icon {
      visibility: hidden;
    }
  }

}

</style>