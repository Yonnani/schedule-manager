<template>
  <div class="content todo">
    <div class="title">할 일 ({{ todoArr ? todoArr.length : 0 }})</div>
    <plus-button-card 
      @click="addInputCard"></plus-button-card>
    
    <div class="todo-default-cards"
      @dragover="dragOver($event, this)"
      @drop="drop($event, this)"
      ref="todoDefaultCards">
      <default-card-area 
        v-for="(todo) in todoArr"
        :key="todo.order"
        :todo="todo"
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
    dragOver(e, $this) {
      e.preventDefault();
      const container = $this.$refs.todoDefaultCards;
      const afterEle = $this.getDragAfterElement(container, e.clientY);
      const draggable = Array.from(container.children)
        .find(child => {
          if (child.className === 'default-card-area') {
            const classSet = new Set(child.children[0].classList);
            return classSet.has('active');
          }
          return false;
        });
      if (afterEle == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterEle);
      }
    },
    drop(e, $this) {
      e.preventDefault();
      const newTodoObjArr = 
        Array.from(e.currentTarget.children)
          .map((child, index) => {
            return {
              id: child.dataset.id,
              order: index + 1,
              content: child.dataset.content
            };
          });
      this.changeTodoOrders({
        dateKey: $this.$props.date,
        newTodoArr: newTodoObjArr
      });
    },
    getDragAfterElement(container, y) {
      const draggableEles = 
        Array.from(container.children)
        .filter(child => {
          if (child.className === 'default-card-area') {
            const classSet = new Set(child.children[0].classList);
            return !classSet.has('active');
          }
          return false;
        });

      return draggableEles.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
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
      'refreshSchedules'
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