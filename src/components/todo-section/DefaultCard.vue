<template>
  <div :class="`todo-card ${bgClass}`">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'DefaultCard',
  props: [
    'text',
    'bgClass'
  ]
}
</script>

<style lang="scss" scoped>
</style>