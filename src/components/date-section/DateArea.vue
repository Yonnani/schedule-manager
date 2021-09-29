<template>
  <div class="date-area">
    <arrow arrow-value="←"></arrow>
    <div class="date-text">
      <div class="year-text">{{ date.getFullYear() }}</div>
      <div class="month-day-text">
        {{ `${date.getMonth() + 1}월 ${date.getDate()}일 (${getShortDayFromDate(date)})` }}
      </div>
    </div>
    <arrow arrow-value="→"></arrow>
  </div>
</template>

<script>
import Arrow from './Arrow.vue';

export default {
  components: { Arrow },
  name: 'DateArea',
  props: [
    'date'
  ],
  methods: {
    getShortDayFromDate(_date) {
      const options = { weekday: 'short' };
      return new Intl.DateTimeFormat('ko-KR', options).format(_date);
    }
  }
}
</script>

<style lang="scss">
  .date-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;

    .date-text {
      text-align: center;

      .year-text {
        font-size: 15px;
      }

      .month-day-text {
        font-size: 17px;
      }
    }
  }
</style>