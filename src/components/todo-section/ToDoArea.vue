<template>
  <div class="content todo">
    <div class="title">할 일 (0)</div>
    <plus-button-card></plus-button-card>
    <input-card :value="'lorem ipsum lorem ip'"></input-card>
    <default-card 
      :text="'default text'"
      :bgClass="'tapped'"></default-card>
    <default-card 
      :text="'default text'"
      :bgClass="'default'"></default-card>
    <div>
      <action-button text="취소"></action-button>
      <action-button text="완료"></action-button>
      <action-button text="삭제"></action-button>
      <action-button text="수정"></action-button>
    </div>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue'
import DefaultCard from './DefaultCard.vue'
import InputCard from './InputCard.vue'
import PlusButtonCard from './PlusButtonCard.vue'

export default {
  components: { 
    PlusButtonCard, 
    DefaultCard,
    InputCard,
    ActionButton
  },
  name: 'ToDoArea',
    ActionButton
}
</script>

<style lang="scss" scoped>
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