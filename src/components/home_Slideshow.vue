<style lang="scss" scoped>
  .component {
    position: relative;
    width: 100%;
    img {
      position: relative;
      width: 100%;
      z-index: -3;
    }
  }

  a {
    cursor: pointer;
    &:hover {
      i {
        color: white !important;
      }
    }
    &.pre {
      position: absolute;
      z-index: 5;
      top: 33vh;
      left: 5px;
    }
    &.next {
      position: absolute;
      z-index: 5;
      top: 33vh;
      right: 5px;
    }
  }

  img.full-page {
    min-height: 80vh;
    width: 100vw;
  }

  i {
    transition: color 0.3s;
  }

  
</style>

<template lang="jade">
  .component
    a.pre
      i.huge.chevron.black.left.icon
    a.next
      i.huge.chevron.black.right.icon
    img.full-page(src="http://static.thousandwonders.net/Taiwan.original.3738.jpg")


    // to use vue-slide, see this: https://github.com/hilongjw/vue-slide
</template>
