<template lang="jade">
  div
    .nav-tabs
      div(v-bind:class="{'active': index==selected}", v-for="(tab, index) in tablist", @click="onTabClick(index)")
        {{tab.title}}
    .tab-content
      slot
</template>

<script>
  export default{
    data() {
      return {
        selected: 0,
        tablist: [],
      }
    },
    mounted() {
      this.$children.forEach(child => {
        this.tablist.push({ title: child.title });
      });
    },
    methods: {
      onTabClick(index) {
        this.selected = index;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .nav-tabs {
    display: flex;
    cursor: pointer;
    font-size: 1.2rem;
    .active {
      border-bottom: 1px #000 solid;
    }
  }
  .tab-content {
  }
</style>
