<template>
  <div class="card">
    <date-area :date="date"></date-area>
    <to-do-area></to-do-area>
    <done-area></done-area>
  </div>
</template>

<script>
import DateArea from './date-section/DateArea.vue'
import DoneArea from './done-section/DoneArea.vue'
import ToDoArea from './todo-section/ToDoArea.vue'

export default {
  name: 'DayCard',
  props: [
    'date'
  ],
  components: {
    DateArea,
    ToDoArea,
    DoneArea
  }
}
</script>

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-content: center;
    min-height: 100%;
    max-width: 375px;
    padding: 20px;
    margin: {
      left: auto;
      right: auto;
    };
  }
</style>