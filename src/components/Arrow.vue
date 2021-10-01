<template>
  <div class="arrow">
    <button>
      <img :src="arrowValue" alt="" :width="width" :height="height">
    </button>
  </div>
</template>

<script>
export default {
  name: 'Arrow',
  props: [
    'arrowValue',
    'width',
    'height'
  ]
}
</script>

<style lang="scss">
  .arrow {
    margin: {
      top: auto;
      bottom: auto;
    }

    button {
      background-color: inherit;
      border: 0;
      cursor: pointer;
    }
  }
</style>