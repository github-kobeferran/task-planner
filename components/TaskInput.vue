<template>
  <div class="task-input">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="22.56"
      height="22.56"
      class="task-input__icon icon--plus"
    >
      <path
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      />
    </svg>

    <input
      type="text"
      class="task-input__input bg-gray-100 border-0 form-control"
      placeholder="What's your plan for today?"
      @input="editTaskTitle"
      :value="task.title"
      @keypress.enter="submit"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {

  computed: {
    ...mapGetters("tasks", {
      task: "getTask",
    }),
  },
  methods: {
    ...mapActions("tasks", ["addTask", "updateTaskDetail"]),
    editTaskTitle(e) {
      this.updateTaskDetail({
        key: "title",
        value: e.target.value,
      });
    },
    async submit() {
      const res = await this.addTask(this.task);
      console.log(res, 'res')
      this.$router.push("/tasks");
    },
  },
};
</script>

<style lang="scss" scoped>
.task-input {
  width: 100%;
  position: relative;

  &__icon {
    position: absolute;
    top: 25%;
    left: 1%;
    pointer-events: none;
  }
}

.task-input input {
  padding-left: 3rem !important;

  &:focus {
    box-shadow: none;
  }
}

input {
  width: 100%;
  padding: 1em !important;
  margin: 0em !important;
  box-sizing: border-box;
}
</style>
