<template>
  <div 
    v-if="mode !== 'modify'" 
    class="default-card-area"
    :data-id="todo.id"
    :data-order="todo.order"
    :data-content="todo.content"
    :data-index="index"
    :draggable="mode === 'default' ? true : false"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragover="dragOver">

    <default-card 
      :todo="todo"
      :mode="mode"
      @click="changeMode(getOppositeMode())"></default-card>
    
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
    'date',
    'index'
  ],
  data() {
    return {
      mode: 'default', // default, tapped, modify
    };
  },
  methods: {
    dragStart(e) {
      const scheduleCardNode = Array.from(e.currentTarget.children)
        .find($child => $child?.classList?.[0] === 'schedule-card');
      scheduleCardNode.classList.add('active');
      scheduleCardNode.classList.remove('default');

      if (scheduleCardNode?.parentNode?.className === 'default-card-area') {
        scheduleCardNode.parentNode.dataset.startX = e.pageX;
        scheduleCardNode.parentNode.dataset.startY = e.pageY;
      }

      e.dataTransfer.setData('text/plain', 
        JSON.stringify({
          id: this.todo.id, 
          order: this.todo.order, 
          date: this.date,
          index: this.index
        })
      );
    },
    dragEnd(e) {
      const scheduleCardNode = Array.from(e.currentTarget.children)
        .find($child => $child?.classList?.[0] === 'schedule-card');
      scheduleCardNode.classList.add('default');
      scheduleCardNode.classList.remove('active');
      scheduleCardNode.classList.remove('is-being-completed');
      scheduleCardNode.classList.remove('is-being-deleted');
    },
    dragOver(e) {
      e.preventDefault();
      console.log('card area drag over <<<<');
      const toNode = e.currentTarget;
      const fromChildNode = toNode.parentNode.querySelector('.active');
      const fromNode = fromChildNode.parentNode;
      const fromData = fromNode.dataset;
      const toId = toNode.dataset.id;

      if (fromData.id === toId) {
        // swipe
        const halfWidth = Math.round(toNode.offsetWidth / 2);
        const curX = e.pageX;
        const fromX = fromData.startX;
        const moveXLength = curX - fromX;

        if (Math.abs(moveXLength) >= halfWidth) {
          if (moveXLength < 0) {
            fromData.workType = 'delete';
            fromChildNode.classList.remove('is-being-completed');
            fromChildNode.classList.add('is-being-deleted');
          } else {
            fromData.workType = 'complete';
            fromChildNode.classList.remove('is-being-deleted');
            fromChildNode.classList.add('is-being-completed');
          }
        } else {
          fromData.workType = '';
          fromChildNode.classList.remove('is-being-deleted');
          fromChildNode.classList.remove('is-being-completed');
        }
      } else {
        // change order
      }
    },
    changeMode(_mode) {
      this.mode = _mode;
    },
    getOppositeMode() {
      if (this.mode === 'tapped') return 'default';
      else if (this.mode === 'default') return 'tapped';
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
    padding: {
      top: 5px;
      bottom: 5px;
    };

    &:last-of-type {
      padding-bottom: 10px;
    }

    .buttons {
      display: flex;
      justify-content: space-around;
    }
  }
</style>