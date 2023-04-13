<template>
  <div class="task-title-input" :class="computedClasses">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="task-title-input--icon"
    >
      <path
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      />
    </svg>

    <input
      type="text"
      class="task-title-input__input "
      ref="task-title-input"
      :placeholder="placeholderText"
      :value="task.title"
      @input="editTaskTitle"
      @keypress.enter="submit"
      @focus="onInputFocus"
      @blur="onInputBlur"
    />
    <p class="task-title-input__enter-prompt">
      Press
      <span :class="{
        'task-title-input__enter-prompt--enter': !inputFocused
      }">enter</span>
      to add task
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    placeholderText: {
      type: String,
      default: "What's your plan for today?",
    },
   classList: {
      type: Array,
      required: false
    }
  },
  data(){
    return {
      inputFocused: false,
    }
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp);
  },
  computed: {
    ...mapGetters("tasks", {
      task: "getTask",
    }),
    computedClasses() {
      if(!this.classList){
        return ''
      }

      return this.classList.join(' ');
    }
  },
  methods: {
    ...mapActions("tasks", ["addTask", "updateTaskDetail", "resetTask"]),
    async submit() {
      const res = await this.addTask(this.task);
      if (res) {
        this.resetTask();
        this.$router.push("/tasks");
      }
    },
    editTaskTitle(e) {
      this.updateTaskDetail({
        key: "title",
        value: e.target.value,
      });
    },
    onInputFocus(){
      this.inputFocused = true;
    },
    onInputBlur(){
      this.inputFocused = false;
    },
    handleKeyUp(event) {
      if (event.keyCode === 13) { // Enter key
        this.$refs['task-title-input'].focus();
      }

      if (event.keyCode === 27) { // ESC key
        this.resetTask();
        this.$refs['task-title-input'].blur();
      }
    }
  },
};
</script>


