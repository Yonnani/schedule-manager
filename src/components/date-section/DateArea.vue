<template>
  <div class="date-area">
    <left-arrow
      v-if="cardNum === 1"
      :width="arrowSize" :height="arrowSize"
      @click.capture="goPrevDay()"></left-arrow>

    <div class="date-text">
      <div class="year-text">{{ thisDate.getFullYear() }}</div>
      <div class="month-day-text">
        {{ `${thisDate.getMonth() + 1}월 ${thisDate.getDate()}일 (${getShortDayFromDate(thisDate)})` }}
      </div>
    </div>
    
    <right-arrow 
      v-if="cardNum === 1"
      :width="arrowSize" :height="arrowSize"
      @click.capture="goNextDay()"></right-arrow>
  </div>
</template>

<script>
import LeftArrow from '../LeftArrow.vue';
import RightArrow from '../RightArrow.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: { 
    LeftArrow,
    RightArrow
  },
  name: 'DateArea',
  props: [
    'date'
  ],
  data() {
    return {
      arrowSize: 20
    };
  },
  computed: {
    thisDate() {
      return new Date(this.date);
    },
    ...mapState([
      'cardNum'
    ])
  },
  methods: {
    getShortDayFromDate(_date) {
      const options = { weekday: 'short' };
      return new Intl.DateTimeFormat('ko-KR', options).format(_date);
    },
    ...mapActions([
      'goPrevDay',
      'goNextDay'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .date-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;

    .date-text {
      text-align: center;
      margin: {
        left: auto;
        right: auto;
      };

      .year-text {
        font-size: 15px;
      }

      .month-day-text {
        font-size: 17px;
      }
    }
  }
</style>