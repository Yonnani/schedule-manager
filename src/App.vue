<template>
  <div class="main">
    <left-arrow
      v-if="cardNum === null || cardNum > 1" 
      :width="arrowSize" :height="arrowSize"
      @click="goPrevDay()"></left-arrow>

    <day-card 
      v-for="(date, i) in Object.keys(schedules)"
      :key="i"
      :date="date"></day-card>

    <right-arrow 
      v-if="cardNum === null || cardNum > 1" 
      :width="arrowSize" :height="arrowSize"
      @click="goNextDay()"></right-arrow>
    
    <footer>
      <div>Arrow Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </footer>
  </div>
</template>

<script>
import LeftArrow from './components/LeftArrow.vue';
import RightArrow from './components/RightArrow.vue';
import DayCard from './components/DayCard.vue'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

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
    schedules() {
      // todo. vuex로 옮기기
      let schedules = {};
      const quotient = Math.floor(this.cardNum / 2);
      for(let i = (0 - quotient); i < (this.cardNum - quotient); i++) {
        const thisDate = this.getDateByNumFromSelectedDate(i);
        const thisDateKey = this.getKeyStringFromDate(thisDate);
        const thisDateSchedule = this.getData(thisDateKey);
        schedules[thisDateKey] = thisDateSchedule;
      }

      return schedules;
    },
    ...mapGetters([
      'getDateByNumFromSelectedDate'
    ]),
    ...mapState([
      'cardNum'
    ])
  },
  methods: {
    init() {
      const arrowChildren = Array.from(this.$el.children).filter(child => child.className === 'arrow');
      if (arrowChildren) {
        this.arrowOffsetWidth = arrowChildren[0].offsetWidth;
      }
      
      const resizeObserver = new ResizeObserver(entries => {
        const width = entries[0].contentBoxSize[0].inlineSize - (this.arrowOffsetWidth * 2);
        const computedCardNum = this.getCardNum(width);
        if (this.cardNum === null || this.cardNum !== computedCardNum) {
          this.setCardNum(computedCardNum < 1 ? 1 : computedCardNum);
        }
      });
      resizeObserver.observe(this.$el);
    },
    getCardNum(_width) {
      const maxNum = Math.floor(_width / this.cardWidth);
      return maxNum % 2 === 0 ? maxNum - 1 : maxNum;
    },
    getKeyStringFromDate(date) {
      const thisDate = new Date(date);
      return `${thisDate.getFullYear()}-${thisDate.getMonth() + 1}-${thisDate.getDate()}`;
    },
    getData(key) {
      const data = localStorage.getItem(key);
      let parsedData = null;
      if (data) {
        parsedData = JSON.parse(data);
      }

      return parsedData;
    },
    setData(_key, _data) {
      this.data[_key] = _data;
      localStorage.setItem(_key, JSON.stringify(_data));
    },
    ...mapActions([
      'goPrevDay',
      'goNextDay'
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
    height: 100%;

    footer {
      color: #000;
      font-size: 12px;
      text-align: center;
      position: absolute;
      bottom: 0;
      right: 0
    }
  }
</style>
