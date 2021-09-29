<template>
  <button class="action-button">{{ text }}</button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: [
    'text'
  ]
}
</script>

<style lang="scss">
  .action-button {
    width: 100px;
    height: 44px;
    font-size: 15px;
    background-color: #EEEEEE;
    color: #007AFF;
    border-radius: 8px;
  }
</style>