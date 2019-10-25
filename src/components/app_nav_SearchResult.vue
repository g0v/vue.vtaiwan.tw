<template lang="pug">
  .component#searchresult
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
      ans = ans.replace(reg, '<strong style="color:red;">' + k + '</strong>');
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

.component {
  position: absolute;
  z-index: 11;
  margin-top: 5px;
  height: 90vh;
  overflow: auto;
  font-size: 1rem;
}

.results {
    background: #FFF;   
    z-index: 998;
    
    .category {
      background: #F3F4F5;
      border-bottom: 1px solid rgba(34,36,38,.1);
    }
    .name {
      width: 100px;
      font-size: 1em;
      float: left;
      padding: 1em;
      font-weight: 700;
      color: rgba(0,0,0,.4); 
    }
    .result {
      background: #FFF;
      margin-left: 100px;
      border-left: 1px solid rgba(34,36,38,.15);
      border-bottom: 1px solid rgba(34,36,38,.1);
      transition: background .1s ease,border-color .1s ease;
      padding: 1em;
      cursor: pointer;
      display: block;
      overflow: hidden;
      font-size: 1em;
      color: rgba(0,0,0,.87);
      &:hover{
        background-color: #f3c7c7;
      }
      &:last-child{
        border-bottom: 0;
      }
    }
    .title {
        font-weight: 700;
        font-size: 1em;
        color: rgba(0,0,0,.85);
    }
    .description {
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
    font-size: 0.8em;
    color: rgba(0, 0, 0, 0.6);
  }
}

.thin-only {
  .component {
      height:100%;
      width:100%;
      font-size: 1rem;
      .results { // Search Result
        width: 95%;
        margin: auto;
        border: 1px solid rgba(34,36,38,.1);
      }
      .message.empty { // No result
        font-size: 1.2em;
      }
    }  
           
}
</style>
