<template>
  <div class="schedule-card todo-card active">
    <input type="text" v-model="inputValue">
  </div>
</template>

<script>
export default {
  name: 'InputCard',
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    focus() {
      this.$el.children[0].focus();
    },
    getValue() {
      return this.inputValue;
    },
    setValue(_value) {
      this.inputValue = _value;
    }
  }
}
</script>

<style lang="scss" scoped>
  .todo-card {
    &.active {
      background-color: #081F5C;
    }
    
    input {
      text-align: center;
      font-size: inherit;
      background-color: inherit;
      color: inherit;
      border-radius: 0;
      border: 0;
      outline-style: none;
    }
  }
</style>