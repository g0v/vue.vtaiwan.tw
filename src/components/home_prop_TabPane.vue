<template lang="jade">
  .tabPane(v-bind:class="{ 'active': selected }")
    slot
</template>

<script>
  export default {
    data() {
      return {
        selected: this.$parent.selected === this.$parent.$children.indexOf(this),
      }
    },
    props: {
      title: { type: String, required: true},
    },
    computed: {
      index () {
        return this.$parent.$children.indexOf(this)
      }
    },
    watch: {
      '$parent.selected' (index, prevIndex) {
        this.selected = (this.index === index) ? true : false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tabPane {
    display: none;
  }
  .tabPane.active {
    display: block;
  }
</style>
