<template>
  <div class="input-card-area">
    <input-card ref="input"></input-card>
    <div class="buttons">
      <action-button text="취소"
        @click="cancel"></action-button>
      <action-button text="완료"
        @click="complete"></action-button>
    </div>
  </div>
</template>

<script>
import InputCard from './InputCard.vue'
import ActionButton from './ActionButton.vue'
import { inputCardModes } from '../../constants.js'

export default {
  name: 'InputCardArea',
  emits: [
    'cancelInput',
    'completeInput'
  ],
  components: {
    InputCard,
    ActionButton
  },
  props: [
    'mode', // modify, create
    'content'
  ],
  mounted() {
    this.$refs.input.focus();
    if (this.mode === inputCardModes.MODIFY && this.content) {
      this.$refs.input.setValue(this.content);
    }
  },
  methods: {
    cancel() {
      this.$emit('cancelInput');
    },
    complete() {
      const inputValue = this.$refs.input.getValue();
      this.$emit('completeInput', {
        mode: this.mode,
        content: inputValue
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-card-area {
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