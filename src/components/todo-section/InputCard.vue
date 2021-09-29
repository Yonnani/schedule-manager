<template>
  <div class="todo-card active">
    <input type="text" :value="value">
  </div>
</template>

<script>
export default {
  name: 'InputCard',
  props: [
    'value'
  ]
}
</script>

<style lang="scss" scoped>
  .todo-card {
    input {
      text-align: center;
      border-radius: inherit;
      font-size: inherit;
      background-color: inherit;
      color: inherit;
    }
  }
</style>