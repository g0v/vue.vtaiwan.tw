<template lang="jade">
.component
  .ui.list
    .item(v-for="(r, idx) in results")
      router-link(:to="'/topic/'+r.routeName", :class="{active: idx == myIdx}") 
        img.icon(:src="r.icon || r.cover")
        .text
          .title(v-html="toHTML(r.title, myKey)") 
          .route-name(v-html="toHTML(r.routeName, myKey)")
</template>

<script>
export default {
  name: 'resault',
  props: ['allTopics', 'myKey', 'myIdx'],
  data () {
    return {
    }
  },
  computed: {
    results: function () {
      var k = this.myKey;
      var reg = new RegExp(k,'i');
      return this.allTopics.filter(function(o){
        return (reg.test(o.title) || reg.test(o.routeName))
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
    }
  }
}
</script>


<style lang="scss" scoped>

.component {
  position: absolute;
  z-index: 11;
  width: 33vw;
  max-height: 66vh;
  overflow: auto;
  background-color: rgba(255,255,255,0.8);
  border-bottom: 2px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  font-size: .7rem;
}

.list {
  padding: .5em 0;
  .item {
    margin: 0 0;
    padding: 0 0;
    a {
      display: flex;
      &.active {
        background-color: #ccf;
      }
      .icon {
        flex: 0 0 3em;
        width: 3em;
        height: 3em;
        border-left: 3px solid #fff;
      }
      .text {
        flex: 1 1;
        text-align: left;
        padding: .2em .5em;
        border-bottom: 1px solid #ccc;
        strong {
          /* scoped css 無法 bind 到，所以寫在App.vue的全域css中*/
        }
      }
    }
  }
}

</style>
