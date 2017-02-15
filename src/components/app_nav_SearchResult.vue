<template lang="jade">
  .Search_component#searchresult
    .results
      .category(v-if="stage.length !== 0", v-for="(s, idx) in stage", v-on:click="sHide") 
         .name {{s}} 
         router-link.result(v-for="(r, idx) in results",v-if="s == r.status", :to="'/topic/'+r.routeName")
          .contents
            .title(v-html="toHTML(r.title, myKey)")
            .description(v-html="toHTML(r.routeName, myKey)")    
      .message.empty(v-if="stage.length == 0") 
          .header 沒有結果
          .description 找不到符合 {{myKey}} 的議題
</template>

<script>
export default {
  name: 'resault',
  props: ['allTopics', 'myKey', 'myIdx'],
  data () {
    return {
      temp:[]
    }
  },
  computed: {
    results: function () {
      var k = this.myKey;
      var reg = new RegExp(k,'i');
      var result =this.allTopics.filter(function(o){
        return (reg.test(o.title) || reg.test(o.routeName))
      })
      return result;
    },
    stage: function (){
      var k = this.myKey;
      var reg = new RegExp(k,'i');
      this.temp =[];
      var result =this.allTopics.filter(function(o){
        return (reg.test(o.title) || reg.test(o.routeName))
      })
      for(var i =0; i<result.length;i++){
          this.temp.push(result[i].status)
      }    
      return this.temp.filter(function(element, index, arr){
          return arr.indexOf(element)=== index;
      })  
    }
  },
  methods: {
    toHTML: function (str, k) {
      var ans = ''+str;
      var reg = new RegExp(k,'gi');
      ans = ans.replace(/</g, '&lt;').replace(/>/g, '&gt;');      
      ans = ans.replace(reg, '<strong>' + k + '</strong>');
      return ans;
    },
    sHide:function(){
      $("#searchresult").hide();
    }
    
  }
}
</script>


<style lang="scss" scoped>

@import "../sass/global.scss";

.Search_component {
  position: absolute;
  z-index: 11;
  margin-top: 4px;
  max-height: 150px;
  overflow: auto;
  background-color: rgba(255,255,255,0.8);
  font-size: 1rem;
}

.results {
    left:0;
    transform-origin: center top;
    white-space: normal;
    background: #FFF;
    margin:0 auto;
    // width: 18em;
    border-radius: .28571429rem;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15);
    border: 1px solid #D4D4D5;
    z-index: 998;
    .category {
      background: #F3F4F5;
      box-shadow: none;
      border-bottom: 1px solid rgba(34,36,38,.1);
      -webkit-transition: background .1s ease,border-color .1s ease;
      transition: background .1s ease,border-color .1s ease;
    }
    .name {
      width: 100px;
      background: 0 0;
      // font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
      font-size: 1em;
      float: 1em;
      float: left;
      // padding: 1.2em 1em;
      padding: 1em 1em;
      font-weight: 700;
      color: rgba(0,0,0,.4); 
    }
    .result {
      background: #FFF;
      margin-left: 100px;
      border-left: 1px solid rgba(34,36,38,.15);
      border-bottom: 1px solid rgba(34,36,38,.1);
      // -webkit-transition: background .1s ease,border-color .1s ease;
      transition: background .1s ease,border-color .1s ease;
      padding: .85714286em 1.14285714em;
      cursor: pointer;
      display: block;
      overflow: hidden;
      font-size: 1em;
      // padding: .85714286em 1.14285714em;
      color: rgba(0,0,0,.87);
      // line-height: 1.33;
      // border-bottom: 1px solid rgba(34,36,38,.1)
      &:hover{
        background-color: #f3c7c7;
      }
    }
    .title {
        margin: -.14285em 0 0;
        // font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
        font-weight: 700;
        font-size: 1em;
        color: rgba(0,0,0,.85);
    }
    .description {
        margin-top: 0;
        font-size: .92857143em;
        color: rgba(0,0,0,.4);
    }
}
.message.empty {
  text-align: left;
  padding:0.6em;
  font-size: 1.2rem;
  .header{
    padding-bottom:0.2rem;
  }
  .description {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
  }
}

@media only screen and (max-width: $breakpoint+1) {
  .component {
      height:100%;
      width:100%;
      font-size: 1rem;

      .ui.category.search .results { // Search Result
        width: 95%;
      }
      .message.empty { // No result
        font-size: 1.2em;
      }
    }  
           
  }
</style>
