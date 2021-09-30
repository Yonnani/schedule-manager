<template>
  <div class="schedule-card done-card">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'DoneCard',
  props: [
    'text'
  ]
}
</script>

<style lang="scss" scoped>
  .done-card {
    background-color: #969DAB;
    text-decoration-line: line-through;
  }
</style>