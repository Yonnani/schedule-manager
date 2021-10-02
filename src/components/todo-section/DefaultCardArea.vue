<template>
  <div v-if="mode !== 'modify'" class="default-card-area"
    :data-id="todo.id"
    :data-order="todo.order"
    :draggable="mode === 'default' ? true : false"
    @dragstart="dragStart($event, {id: todo.id, order: todo.order})"
    @dragend="dragEnd"
    @drop="drop"
    @dragover="dragOver"
    @dragenter="dragEnter"
    @dragleave="dragLeave">
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
    dragStart(e, {id, order}) {
      const scheduleCardNode = Array.from(e.currentTarget.childNodes).find($child => $child?.classList[0] === 'schedule-card');
      scheduleCardNode.classList.add('active');
      scheduleCardNode.classList.remove('default');
      e.dataTransfer.setData('text/plain', JSON.stringify({id: id, order: order}));
    },
    dragEnd(e) {
      const scheduleCardNode = Array.from(e.currentTarget.childNodes).find($child => $child?.classList[0] === 'schedule-card');
      scheduleCardNode.classList.add('default');
      scheduleCardNode.classList.remove('active');
    },
    drop(e) {
      e.preventDefault();
      const fromData = JSON.parse(e.dataTransfer.getData('text/plain'));
      const toData = { 
        id: Number(e.currentTarget.dataset.id), 
        order: Number(e.currentTarget.dataset.order)
      };

      if (fromData.id !== toData.id) {
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
      }
    },
    dragOver(e) {
      e.preventDefault();
      console.log('drag over ==== ', {currentTarget: e.currentTarget, target: e.target, toElement: e.toElement});
      const currentY = e.offsetY;
      const eleHeight = e.currentTarget.offsetHeight;
      const centerY = Math.round(eleHeight / 2);
      
      if (currentY < centerY) {
        // e.currentTarget.offsetTop += eleHeight;
        // e.currentTarget.style.marginTop = `${eleHeight}px`
      } else {
        // e.currentTarget.nextSibling.offsetTop += eleHeight;
        // e.currentTarget.nextSibling.style.marginTop = `${eleHeight}px`
      }
    },
    dragEnter(e) {
      console.log('drag enter ==== ', {e});
    },
    dragLeave(e) {
      console.log('drag leave ==== ', {e});
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
      top: 10px;
    };

    .buttons {
      display: flex;
      justify-content: space-around;
    }
  }
</style>