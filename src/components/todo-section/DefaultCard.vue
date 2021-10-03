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
      background-color: $color-default;
    }

    &.tapped {
      background-color: $color-tapped;
    }

    &.active {
      background-color: $color-active;
    }

    &.is-being-completed {
      background-color: $color-completed;
      text-decoration-line: line-through;
    }

    &.is-being-deleted {
      opacity: 50%;
    }
  }
</style>