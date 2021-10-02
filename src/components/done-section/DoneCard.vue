<template>
  <div class="schedule-card done-card">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'DoneCard',
  props: [
    'content'
  ]
}
</script>

<style lang="scss" scoped>
  .done-card {
    background-color: #969DAB;
    text-decoration-line: line-through;
    margin-top: 10px;
  }
</style>