<template>
  <div class="content todo">
    <div class="title">할 일 ({{ todoArr ? todoArr.length : 0 }})</div>
    <plus-button-card 
      @click="addInputCard"></plus-button-card>
    
    <div class="todo-default-cards"
      @drop="drop"
      ref="todoDefaultCards">
      <default-card-area 
        v-for="(todo, index) in todoArr"
        :key="index"
        :todo="todo"
        :index="index"
        :date="date"></default-card-area>
    </div>
    
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
    drop(e) {
      e.preventDefault();
      const target = e.target.closest('.default-card-area');
      if (target) {
        const fromData = JSON.parse(e.dataTransfer.getData('text/plain'));
        const toData = {
          id: Number(target.dataset.id),
          order: Number(target.dataset.order),
          index: Number(target.dataset.index)
        };
        
        if (fromData.id === toData.id) {
          const targetData = target.dataset;
          if (targetData?.workType === 'complete') {
            this.completeTodo({
              dateKey: fromData.date, 
              id: fromData.id
            });
          } else if (targetData?.workType === 'delete') {
            this.deleteTodo({
              dateKey: fromData.date, 
              id: fromData.id
            });
          }
        } else {
          const copiedTodoArr = [...this.todoArr];
          const fromEle = copiedTodoArr.splice(fromData.index, 1)[0];
          copiedTodoArr.splice(toData.index, 0, fromEle);
          copiedTodoArr.forEach((todo, index) => todo.order = index + 1);
          this.changeTodoOrders({
            dateKey: this.$props.date,
            newTodoArr: copiedTodoArr
          });
        }
      }
    },
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
      'addTodoSchedule',
      'changeTodoOrders',
      'completeTodo',
      'deleteTodo'
    ])
  }
}
</script>

<style lang="scss">
  .todo-default-cards {
    width: inherit;
  }

  .todo-card {
    padding: {
      top: 5px;
      bottom: 5px;
    };
  }
</style>