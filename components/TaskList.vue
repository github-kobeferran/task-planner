<template>
  <div>
    <h1>Tasklist</h1>
    <ul class="list-group"></ul>
    <div class="list-group">
      <label v-for="task in tasks" :key="task.id" class="list-group-item">
        <input
          @input="markTask(task)"
          class="form-check-input me-1"
          type="checkbox"
          value=""
          :checked="task.is_done"
        />
        {{ task.title }}
        <button @click="deleteTask(task)" class="ms-1">Delete</button>
      </label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  async fetch() {
    await this.fetchTasks();
  },
  computed: {
    ...mapGetters("tasks", {
      tasks: "getTasks",
    }),
  },
  methods: {
    ...mapActions("tasks", [
      "fetchTasks",
      "deleteTask",
      "markAsDone",
      "undoTask",
    ]),
    markTask(task) {
      if (!task.is_done) {
        this.markAsDone(task);
        return;
      }

      this.undoTask(task);
    },
  },
};
</script>
