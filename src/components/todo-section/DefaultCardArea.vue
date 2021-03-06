<template>
  <div 
    v-if="mode !== modes.MODIFY" 
    class="default-card-area"
    :data-id="todo.id"
    :data-order="todo.order"
    :data-content="todo.content"
    :data-index="index"
    :draggable="mode === modes.DEFAULT ? true : false"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragover="dragOver">

    <default-card 
      :todo="todo"
      :mode="mode"
      @click="changeMode(getOppositeMode())"></default-card>
    
    <div v-if="mode === modes.TAPPED" class="buttons">
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
import { defaultCardModes } from '../../constants.js'

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
      mode: defaultCardModes.DEFAULT,
      modes: defaultCardModes
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
      scheduleCardNode.style.position = '';
      scheduleCardNode.style.left = '';
    },
    dragOver(e) {
      e.preventDefault();
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

        fromChildNode.style.position = 'relative';
        fromChildNode.style.left = `${moveXLength}px`;

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
        fromChildNode.style.position = '';
        fromChildNode.style.left = '';
      }
    },
    changeMode(_mode) {
      this.mode = _mode;
    },
    getOppositeMode() {
      if (this.mode === defaultCardModes.TAPPED) return defaultCardModes.DEFAULT;
      else if (this.mode === defaultCardModes.DEFAULT) return defaultCardModes.TAPPED;
    },
    deleteTodo() {
      this.deleteTodoSchedule({
        dateKey: this.date,
        id: this.todo.id
      });
      this.mode = defaultCardModes.DEFAULT;
    },
    modifyTodo() {
      this.changeMode(defaultCardModes.MODIFY);
    },
    completeTodo() {
      this.completeTodoSchedule({
        dateKey: this.date,
        id: this.todo.id
      });
      this.mode = defaultCardModes.DEFAULT;
    },
    cancelInput() {
      this.mode = defaultCardModes.DEFAULT;
    },
    updateTodo({ content }) {
      this.updateTodoSchedule({
        dateKey: this.date, 
        id: this.todo.id, 
        content: content
      });
      this.mode = defaultCardModes.DEFAULT;
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

    .buttons {
      display: flex;
      justify-content: space-around;
    }
  }
</style>