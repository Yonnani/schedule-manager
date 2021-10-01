<template>
  <div class="content todo">
    <div class="title">할 일 ({{ todoArr ? todoArr.length : 0 }})</div>
    <plus-button-card 
      @click="addInputCard"></plus-button-card>
    <default-card 
      v-for="(todo, i) in todoArr"
      :key="i"
      :todo="todo"></default-card>
    <input-card-area 
      v-if="showInputCard"
      mode="create"
      @cancel-input="hideInputCard"
      @complete-input="addTodo"></input-card-area>

    <!-- <input-card :value="'lorem ipsum lorem ip'"></input-card>
    <default-card 
      :text="'default text'"></default-card>
    <default-card 
      :text="'default text'"></default-card>
    <div>
      <action-button text="취소"></action-button>
      <action-button text="완료"></action-button>
      <action-button text="삭제"></action-button>
      <action-button text="수정"></action-button>
    </div> -->
  </div>
</template>

<script>
import DefaultCard from './DefaultCard.vue';
import InputCardArea from './InputCardArea.vue';
// import ActionButton from './ActionButton.vue'
import PlusButtonCard from './PlusButtonCard.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ToDoArea',
  components: { 
    PlusButtonCard, 
    DefaultCard,
    InputCardArea,
    // ActionButton
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
  .todo {
    .todo-card {
      &.default {
        background-color: #5AAAFA;
      }

      &.active {
        background-color: #081F5C;
      }

      &.tapped {
        background-color: #007AFF;
      }
    }
  }
</style>