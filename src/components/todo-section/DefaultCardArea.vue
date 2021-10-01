<template>
  <div v-if="mode !== 'modify'" class="default-card-area">
    <default-card 
      :todo="todo"
      :mode="mode"
      @click="changeMode('tapped')"></default-card>
    <div v-if="mode === 'tapped'" class="buttons">
      <action-button text="삭제"
        @click="deleteTodo"></action-button>
      <action-button text="수정"
        @click="modifyTodo"></action-button>
      <action-button text="완료"
        @click="completeTodo"></action-button>
    </div>
  </div>
  <template v-else>
    <input-card-area
      mode="modify"
      :content="todo.content"
      @cancel-input="cancelInput"
      @complete-input="updateTodo"></input-card-area>
  </template>
</template>

<script>
import ActionButton from './ActionButton.vue'
import DefaultCard from './DefaultCard.vue'
import InputCardArea from './InputCardArea.vue'
import { mapActions } from 'vuex';

export default {
  name: 'DefaultCardArea',
  components: { 
    DefaultCard, 
    ActionButton, 
    InputCardArea 
  },
  props: [
    'todo',
    'date'
  ],
  data() {
    return {
      mode: 'default' // default, tapped, modify
    };
  },
  methods: {
    changeMode(_mode) {
      this.mode = _mode;
    },
    deleteTodo() {
      this.deleteTodoSchedule({
        dateKey: this.date,
        id: this.todo.id
      });
      this.mode = 'default';
    },
    modifyTodo() {
      this.changeMode('modify');
    },
    completeTodo() {
      this.completeTodoSchedule({
        dateKey: this.date,
        id: this.todo.id
      });
      this.mode = 'default';
    },
    cancelInput() {
      this.mode = 'default';
    },
    updateTodo({ content }) {
      this.updateTodoSchedule({
        dateKey: this.date, 
        id: this.todo.id, 
        content: content
      });
      this.mode = 'default';
    },
    ...mapActions({
      deleteTodoSchedule: 'deleteTodo',
      completeTodoSchedule: 'completeTodo',
      updateTodoSchedule: 'updateTodo'
    })
  }
}
</script>

<style lang="scss" scoped>
  .default-card-area {
    width: inherit;
    height: inherit;
    margin: {
      bottom: 5px;
    };

    .buttons {
      display: flex;
      justify-content: space-around;
    }
  }
</style>