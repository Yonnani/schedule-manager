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
    // min-height: 100%;
    max-width: 375px;
    padding: 20px;
    margin: {
      left: auto;
      right: auto;
    };

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 327px;
      margin: {
        left: auto;
        right: auto;
        top: 20px;
      };

      .title {
        font-size: 17px;
        width: 100%;
        margin: {
          top: 10px;
          bottom: 10px;
        };
      }

      .schedule-card {
        width: inherit;
        height: 68px;
        border-radius: 12px;
        font-size: 17px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: {
          top: 5px;
          bottom: 5px;
        };
      }
    }

  }
</style>