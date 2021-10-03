<template>
  <arrow 
    :arrow-value="require(`@/assets/icons/right-arrow.svg`)"
    :width="width"
    :height="height"
    text="right arrow"
    copyright="Icons made by Roundicons from www.flaticon.com"></arrow>
</template>

<script>
import Arrow from './Arrow.vue'

export default {
  name: 'RightArrow',
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