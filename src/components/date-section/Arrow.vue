<template>
  <div class="arrow">
    <button>{{ arrowValue }}</button>
  </div>
</template>

<script>
export default {
  name: 'Arrow',
  props: [
    'arrowValue'
  ]
}
</script>

<style lang="scss">
  .arrow {
    button {
      font-size: 20px;
    }
  }
</style>