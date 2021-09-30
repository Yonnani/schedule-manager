<template>
  <day-card :date="today"></day-card>
  <footer>
    <div>Arrow Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </footer>
</template>

<script>
import DayCard from './components/DayCard.vue'

export default {
  name: 'App',
  components: {
    DayCard
  },
  data() {
    return {
      today: new Date()
    };
  }
}
</script>

<style lang="scss">
  footer {
    color: #000;
    font-size: 12px;
    text-align: center;
    position: absolute;
    bottom: 0;
    right: 0
  }
</style>
