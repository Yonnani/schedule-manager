<template>
  <div class="content done">
    <div class="title">끝난 일 (0)</div>
    <done-card text="물 마시기"></done-card>
  </div>
</template>

<script>
import DoneCard from './DoneCard.vue'

export default {
  name: 'DoneArea',
  components: {
    DoneCard
  }
}
</script>

<style lang="scss" scoped>
</style>