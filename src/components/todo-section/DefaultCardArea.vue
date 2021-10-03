<template>
  <div v-if="mode !== 'modify'" class="default-card-area"
    :data-id="todo.id"
    :data-order="todo.order"
    :draggable="mode === 'default' ? true : false"
    @dragstart="dragStart($event, {id: todo.id, order: todo.order, date: date})"
    @dragend="dragEnd"
    @drop="drop"
    @dragover="dragOver">
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
      mode: 'default', // default, tapped, modify
    };
  },
  methods: {
    dragStart(e, {id, order, date}) {
      const scheduleCardNode = Array.from(e.currentTarget.childNodes).find($child => $child?.classList?.[0] === 'schedule-card');
      scheduleCardNode.classList.add('active');
      scheduleCardNode.classList.remove('default');

      if (scheduleCardNode?.parentNode?.className === 'default-card-area') {
        scheduleCardNode.parentNode.dataset.startX = e.pageX;
        scheduleCardNode.parentNode.dataset.startY = e.pageY;
      }

      e.dataTransfer.setData('text/plain', JSON.stringify({id: id, order: order, date: date}));
    },
    dragEnd(e) {
      const scheduleCardNode = Array.from(e.currentTarget.childNodes).find($child => $child?.classList?.[0] === 'schedule-card');
      scheduleCardNode.classList.add('default');
      scheduleCardNode.classList.remove('active');
      scheduleCardNode.classList.remove('is-being-completed');
      scheduleCardNode.classList.remove('is-being-deleted');
    },
    drop(e) {
      e.preventDefault();
      const fromData = JSON.parse(e.dataTransfer.getData('text/plain'));
      const targetData = e.currentTarget.dataset;
      const toData = { 
        id: Number(targetData.id), 
        order: Number(targetData.order)
      };

      if (fromData.id !== toData.id) {
        // order 변경
        const currentY = e.offsetY;
        const eleHeight = e.currentTarget.offsetHeight;
        const centerY = Math.round(eleHeight / 2);
        
        if (currentY < centerY) {
          this.changeOrder({ 
            dateKey: this.date, 
            fromId: fromData.id, 
            toId: toData.id,
            toOrder: toData.order 
          });
        } else {
          this.changeOrder({ 
            dateKey: this.date, 
            fromId: fromData.id, 
            toId: toData.id,
            toOrder: (toData.order + 1) 
          });
        }
      } else {
        // swipe
        if (targetData?.workType === 'complete') {
          this.completeTodoSchedule({
            dateKey: fromData.date, 
            id: fromData.id
          });
        } else if (targetData?.workType === 'delete') {
          this.deleteTodoSchedule({
            dateKey: fromData.date, 
            id: fromData.id
          });
        }
      }
    },
    dragOver(e) {
      e.preventDefault();
      console.log('drag over ==== ');
      const toNode = e.currentTarget;
      const fromChildNode = toNode.parentNode.querySelector('.active');
      const fromNode = fromChildNode.parentNode;
      const fromData = fromNode.dataset;
      const toId = toNode.dataset.id;

      // toNode.style.position = 'absolute';

      if (fromData.id === toId) {
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
        console.log('change order');
      }
    },
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
      updateTodoSchedule: 'updateTodo',
      changeOrder: 'changeOrder'
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