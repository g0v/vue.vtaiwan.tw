<template lang="jade">
  .breadcrumb
    router-link(v-if="rtName($route.path)", to='/', exact='')
      | vTaiwan HOME
    span(v-else) vTaiwan HOME
    span(v-if="rtName($route.path)") &nbsp;>&nbsp;
    span.c(:class="pure($route.path)")
      | {{rtName($route.path)}}
</template>

<script>
export default {
  name: 'breadcrumb',
  props: ['routes','pure'],
  data () {
    return {
      data: '...'
    }
  },
  methods: {
    rtName(path) {
      var r = this.routes.filter((o) => {
        return '/'+o.r == path;
      })[0];
      return r ? r.t : '';
    }
  }
}
</script>

<style lang="scss">

@import "../sass/global.scss";

.breadcrumb {
  position: absolute;
  z-index: 9;
  top: $bread-top;
  left: 50px;
  font-size: 0.66rem;
  .c {
    color: $main;
    &.join {    color: $join  }
    &.comment {    color: $comment  }
    &.live {    color: $live  }
    &.track {   color: $track  }
  }
}

</style>
