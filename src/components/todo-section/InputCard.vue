<template>
  <div class="schedule-card todo-card active">
    <input 
      type="text" 
      v-model="inputValue"
      @keyup="checkLength($event, this)">
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
    },
    checkLength(e, component) {
      const value = component.$data.inputValue;
      if (value.length > 20) {
        e.currentTarget.classList.add('red');
        component.$data.inputValue = value.slice(0, 20);
      } else {
        e.currentTarget.classList.remove('red');
        component.$data.inputValue = value;
      }
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

      &.red {
        color: red;
      }
    }
  }
</style>