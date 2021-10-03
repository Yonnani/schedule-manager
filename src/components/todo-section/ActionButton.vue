<template>
  <button class="action-button">{{ text }}</button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: [
    'text'
  ],
  methods: {
  }
}
</script>

<style lang="scss">
  .action-button {
    width: 100px;
    height: 44px;
    font-size: 15px;
    background-color: $color-bt-bg;
    color: $color-bt-font;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    margin: 5px;
  }
</style>