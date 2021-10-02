<template>
  <div :class="`schedule-card todo-card ${mode}`">
    <!-- <div class="dropzone"></div> -->
    <span>{{ todo.content }}</span>
    <!-- <div class="dropzone"></div> -->
  </div>
</template>

<script>
export default {
  name: 'DefaultCard',
  props: [
    'todo',
    'mode'
  ],
  data() {
    return {
    };
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .schedule-card {
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &.default {
      background-color: #5AAAFA;
    }

    &.tapped {
      background-color: #007AFF;
    }

    &.active {
      background-color: #081F5C;
    }

    .dropzone {
      // position: relative;
      width: inherit;
      height: 10px;
      border: 1px solid black;
      margin: 0;
      padding: 0;
    }
  }
</style>