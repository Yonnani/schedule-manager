<template>
  <arrow 
    :arrow-value="require(`@/assets/icons/left-arrow.svg`)"
    :width="width"
    :height="height"
    text="left arrow"
    copyright="Icons made by Roundicons from www.flaticon.com"></arrow>
</template>

<script>
import Arrow from './Arrow.vue'

export default {
  name: 'LeftArrow',
  props: [
    'width',
    'height'
  ],
  components: {
    Arrow
  }
}
</script>

<style lang="scss">

</style>