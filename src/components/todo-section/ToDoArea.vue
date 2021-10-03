<template>
  <div class="content todo">
    <div class="title">할 일 ({{ todoArr ? todoArr.length : 0 }})</div>
    <plus-button-card 
      @click="addInputCard"></plus-button-card>
    <default-card-area 
      v-for="(todo, i) in todoArr"
      :key="i"
      :todo="todo"
      :date="date"></default-card-area>
    <input-card-area 
      v-if="showInputCard"
      mode="create"
      @cancel-input="hideInputCard"
      @complete-input="addTodo"></input-card-area>
  </div>
</template>

<script>
import DefaultCardArea from './DefaultCardArea.vue';
import InputCardArea from './InputCardArea.vue';
import PlusButtonCard from './PlusButtonCard.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ToDoArea',
  components: { 
    PlusButtonCard, 
    InputCardArea,
    DefaultCardArea
  },
  props: [
    'todoArr',
    'date'
  ],
  data() {
    return {
      showInputCard: false,
      inputMsg: ''
    };
  },
  methods: {
    addInputCard() {
      this.showInputCard = true;
    },
    hideInputCard() {
      this.showInputCard = false;
    },
    addTodo(param) {
      this.addTodoSchedule({ 
        dateKey: this.date, 
        todoContent: param.content 
      });
      this.showInputCard = false;
    },
    ...mapActions([
      'addTodoSchedule'
    ])
  }
}
</script>

<style lang="scss">
  .todo-card {
    padding: {
      top: 5px;
      bottom: 5px;
    };
  }
</style>