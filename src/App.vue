<template>
  <day-card :date="today"></day-card>
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
  @import "~@/assets/_global.scss";
  @import "~@/assets/_reset.scss";


</style>
