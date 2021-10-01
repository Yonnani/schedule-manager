<template>
  <div class="default-card-area">
    <default-card 
      :todo="todo"
      :mode="mode"
      @click="changeMode()"></default-card>
    <div v-if="mode === 'tapped'" class="buttons">
      <action-button text="삭제"
        @click="deleteTodo"></action-button>
      <action-button text="수정"
        @click="modifyTodo"></action-button>
      <action-button text="완료"
        @click="completeTodo"></action-button>
    </div>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue'
import DefaultCard from './DefaultCard.vue'
import { mapActions } from 'vuex';

export default {
  name: 'DefaultCardArea',
  components: { DefaultCard, ActionButton },
  props: [
    'todo',
    'date'
  ],
  data() {
    return {
      mode: 'default'
    };
  },
  methods: {
    changeMode() {
      this.mode = (this.mode === 'tapped' ? 'default' : 'tapped');
    },
    deleteTodo() {
      this.deleteTodoSchedule({
        dateKey: this.date,
        id: this.todo.id
      });
    },
    modifyTodo() {
      console.log('modify todo');
    },
    completeTodo() {
      this.completeTodoSchedule({
        dateKey: this.date,
        id: this.todo.id
      });
      this.mode = 'default';
    },
    ...mapActions({
      deleteTodoSchedule: 'deleteTodo',
      completeTodoSchedule: 'completeTodo'
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