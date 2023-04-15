<template>
  <div class="task-title-input" :class="computedClasses">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="task-title-input--icon"
    >
      <path
        v-if="!inputFocused"
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      />
      <path
        v-else
        d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
      />
    </svg>

    <input
      ref="task-title-input"
      type="text"
      class="task-title-input__input"
      :placeholder="placeholderText"
      v-model="titleInputValue"
      @keypress.enter="submit"
      @focus="onInputFocus"
      @blur="onInputBlur"
    />
    <p class="task-title-input__enter-prompt">
      Press
      <span
        :class="{
          'task-title-input__enter-prompt--enter': !inputFocused,
        }"
        >enter</span
      >
      to add task
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    placeholderProp: {
      type: String,
      required: false,
    },
    classList: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      inputFocused: false,
      titleInputValue: "",
    };
  },
  computed: {
    ...mapGetters("tasks", {
      task: "getTask",
    }),
    placeholderText() {
      if (this.placeholderProp) {
        return this.placeholderProp;
      }

      if (this.inputFocused) {
        return 'Try typing "Submit report by Friday 3PM"';
      }

      return "What's your plan for today?";
    },
    computedClasses() {
      if (!this.classList) {
        return "";
      }

      return this.classList.join(" ");
    },
  },
  mounted() {
    window.addEventListener("keyup", this.handleKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.handleKeyUp);
  },
  methods: {
    ...mapActions("tasks", ["storeTask", "resetTask"]),
    async submit() {
      if (!this.titleInputValue) {
        return;
      }

      const res = await this.storeTask(this.titleInputValue);
      if (res) {
        this.resetTask();
        this.$router.push("/tasks");
        this.titleInputValue = "";
      }
    },
    onInputFocus() {
      this.inputFocused = true;
    },
    onInputBlur() {
      this.inputFocused = false;
    },
    handleKeyUp(event) {
      if (event.keyCode === 13) {
        // Enter key
        this.$refs["task-title-input"].focus();
      }

      if (event.keyCode === 27) {
        // ESC key
        this.resetTask();
        this.$refs["task-title-input"].blur();
      }
    },
  },
};
</script>
