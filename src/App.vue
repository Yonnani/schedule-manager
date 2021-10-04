<template>
  <div class="main">
    <left-arrow
      v-if="cardNum === null || cardNum > 1" 
      :width="arrowSize" :height="arrowSize"
      @click="goPrevDay()"></left-arrow>

    <day-card 
      v-for="(date, i) in Object.keys(schedules)"
      :key="i"
      :date="date"
      :schedule="schedules[date]"></day-card>

    <right-arrow 
      v-if="cardNum === null || cardNum > 1" 
      :width="arrowSize" :height="arrowSize"
      @click="goNextDay()"></right-arrow>
  </div>
</template>

<script>
import LeftArrow from './components/LeftArrow.vue';
import RightArrow from './components/RightArrow.vue';
import DayCard from './components/DayCard.vue';
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';


export default {
  name: 'App',
  components: {
    DayCard,
    LeftArrow,
    RightArrow
  },
  data() {
    return {
      cardWidth: 375,
      arrowSize: 50,
      arrowOffsetWidth: 0
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters([
      'getDateByNumFromSelectedDate',
      'getDateKeys'
    ]),
    ...mapState([
      'cardNum',
      'schedules'
    ])
  },
  methods: {
    init() {
      const arrowChildren = Array.from(this.$el.children).filter(child => child.className === 'arrow');
      if (arrowChildren && arrowChildren[0]) {
        this.arrowOffsetWidth = arrowChildren[0].offsetWidth;
      }
      
      const resizeObserver = new ResizeObserver(entries => {
        const width = entries[0].contentBoxSize[0].inlineSize - (this.arrowOffsetWidth * 2);
        const computedCardNum = this.getCardNum(width);
        if (this.cardNum === null || this.cardNum !== computedCardNum) {
          this.setCardNum(computedCardNum < 1 ? 1 : computedCardNum);
        }
        console.log('resize observer called');
        this.refreshSchedules(this.getDateKeys);
      });
      resizeObserver.observe(this.$el);
      
      this.refreshSchedules(this.getDateKeys);
    },
    getCardNum(_width) {
      const maxNum = Math.floor(_width / this.cardWidth);
      return maxNum % 2 === 0 ? maxNum - 1 : maxNum;
    },
    getKeyStringFromDate(date) {
      const thisDate = new Date(date);
      return `${thisDate.getFullYear()}-${thisDate.getMonth() + 1}-${thisDate.getDate()}`;
    },
    setData(_key, _data) {
      this.data[_key] = _data;
      localStorage.setItem(_key, JSON.stringify(_data));
    },
    ...mapActions([
      'goPrevDay',
      'goNextDay',
      'refreshSchedules'
    ]),
    ...mapMutations([
      'setCardNum'
    ])
  }
}
</script>

<style lang="scss">
  .main {
    display: flex;
    justify-content: space-between;
    min-height: 100%;
  }
</style>
