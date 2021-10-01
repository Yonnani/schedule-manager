<template>
  <div :class="`schedule-card todo-card ${mode}`">
    <span>{{ todo.content }}</span>
  </div>
</template>

<script>
export default {
  name: 'DefaultCard',
  props: [
    'todo',
    'mode'
  ],
  data() {
    return {
    };
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .schedule-card {
    cursor: pointer;

    &.default {
      background-color: #5AAAFA;
    }

    &.tapped {
      background-color: #007AFF;
    }
  }
</style>