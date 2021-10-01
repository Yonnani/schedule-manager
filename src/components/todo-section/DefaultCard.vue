<template>
  <div :class="`schedule-card todo-card ${bgClass}`">
    <span>{{ todo.content }}</span>
  </div>
</template>

<script>
export default {
  name: 'DefaultCard',
  props: [
    'todo'
  ],
  data() {
    return {
      bgClass: 'default'
    };
  }
}
</script>

<style lang="scss" scoped>
</style>