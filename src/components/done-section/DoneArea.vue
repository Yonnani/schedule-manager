<template>
  <div class="content done">
    <div class="title">끝난 일 ({{ doneArr ? doneArr.length : 0 }})</div>
    <done-card 
      v-for="(done, i) in doneArr"
      :key="i"
      :content="done.content"></done-card>
  </div>
</template>

<script>
import DoneCard from './DoneCard.vue'

export default {
  name: 'DoneArea',
  components: {
    DoneCard
  },
  props: [
    'doneArr'
  ]
}
</script>

<style lang="scss" scoped>
</style>