export const state = () => ({
  tasks: [],
  task: {
    title: "",
    assignee: null,
    is_done: null,
    is_important: null,
    sort: null,
  },
});

export const getters = {
  getTasks(state) {
    return state.tasks;
  },
  getTask(state) {
    return state.task;
  },
};

export const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks;
  },
  setTask(state, updatedTask) {
    const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask);
    }
  },
  updateTaskDetail(state, { key, value }) {
    state.task[key] = value;
  },
  addTask(state, task) {
    state.tasks.push(task);
  },
  deleteTask(state, task) {
    state.tasks.splice(state.tasks.indexOf(task), 1);
  },
};

export const actions = {
  async fetchTasks({ commit }) {
    try {
      const { data } = await this.$axios.get("/tasks");

      commit("setTasks", data);
    } catch (e) {
      console.error(e);
    }
  },
  async addTask({ commit }, task) {
    try {
      const res = await this.$axios.post("/tasks", task);
      if (res) {
        commit("addTask", task);
        return res;
      }
    } catch (e) {
      console.error(e);
    }
  },
  async deleteTask({ commit }, task) {
    try {
      const res = await this.$axios.delete("/tasks/" + task.id);
      if (res) {
        commit("deleteTask", task);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async markAsDone({ commit }, task) {
    try {
      const updatedTask = await this.$axios.put("/tasks/" + task.id, {
        is_done: true,
      });
      if (updatedTask) {
        commit("setTask", updatedTask);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async undoTask({ commit }, task) {
    try {
      const updatedTask = await this.$axios.put("/tasks/" + task.id, {
        is_done: false,
      });
      if (updatedTask) {
        commit("setTask", updatedTask);
      }
    } catch (e) {
      console.error(e);
    }
  },
  updateTaskDetail({ commit }, { key, value }) {
    commit("updateTaskDetail", { key, value });
  },
};
