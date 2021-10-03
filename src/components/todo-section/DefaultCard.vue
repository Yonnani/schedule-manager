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
    display: flex;
    flex-direction: column;

    &.default {
      background-color: #5AAAFA;
    }

    &.tapped {
      background-color: #007AFF;
    }

    &.active {
      background-color: #081F5C;
    }

    &.is-being-completed {
      background-color: #969DAB;
      text-decoration-line: line-through;
    }

    &.is-being-deleted {
      opacity: 50%;
    }
  }
</style>