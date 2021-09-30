<template>
  <arrow 
    :arrow-value="require(`@/assets/icons/right-arrow.svg`)"
    :width="width"
    :height="height"></arrow>
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