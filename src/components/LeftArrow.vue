<template>
  <arrow 
    :arrow-value="require(`@/assets/icons/left-arrow.svg`)"
    :width="width"
    :height="height"></arrow>
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