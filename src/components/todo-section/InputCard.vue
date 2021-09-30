<template>
  <div class="schedule-card todo-card active">
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
      font-size: inherit;
      background-color: inherit;
      color: inherit;
      border-radius: 0;
      border: 0;
      outline-style: none;
    }
  }
</style>