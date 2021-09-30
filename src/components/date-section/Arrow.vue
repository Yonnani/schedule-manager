<template>
  <div class="arrow">
    <button>
      <img :src="arrowValue" alt="">
    </button>
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
      background-color: inherit;
      border: 0;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>