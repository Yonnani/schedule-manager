<template>
  <div class="card">
    <date-area 
      :date="date"></date-area>
    <to-do-area
      :date="date"
      :todo-arr="schedule?.todoList"></to-do-area>
    <done-area
      :done-arr="schedule?.doneList"></done-area>
  </div>
</template>

<script>
import DateArea from './date-section/DateArea.vue'
import DoneArea from './done-section/DoneArea.vue'
import ToDoArea from './todo-section/ToDoArea.vue'

export default {
  name: 'DayCard',
  props: [
    'date',
    'schedule'
  ],
  components: {
    DateArea,
    ToDoArea,
    DoneArea
  },
  data() {
    return {
    };
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
    padding: {
      left: 20px;
      right: 20px;
      bottom: 20px;
    };
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
        color: $color-font-white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

  }
</style>