<template lang="jade">
.component
  .ui.list
    .item(v-for="r in results")
      router-link(:to="'/topic/'+r.routeName") 
        img.icon(:src="r.cover")
        .text {{r.title}} 
</template>

<script>
export default {
  name: 'resault',
  props: ['allTopics', 'myKey'],
  data () {
    return {
    }
  },
  computed: {
    results: function () {
      var k = this.myKey;
      var reg = new RegExp(k);
      return this.allTopics.filter(function(o){
        return (reg.test(o.title) || reg.test(o.routeName))
      })
    }
  }
}
</script>


<style lang="scss" scoped>

.component {
  position: absolute;
  z-index: 11;
  width: 100%;
  max-height: 12em;
  overflow: auto;
  background-color: rgba(255,255,255,0.8)
}

.list {
  padding: .5em 0;
  .item {
    a {
      display: flex;
      .icon {
        flex: 0 0 3em;
        width: 3em;
        height: 3em;
      }
      .text {
        flex: 1 1;
        text-align: center;
        padding: .2em;
      }
    }
  }
}

</style>
