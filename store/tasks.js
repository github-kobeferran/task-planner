const initialTask = () => ({
  title: "",
  assignee: null,
  is_done: null,
  is_important: null,
  sort: null,
});

export const state = () => ({
  tasks: [],
  task: initialTask(),
  serverQuery: {
    search: "",
  },
});

export const getters = {
  getTasks(state) {
    return state.tasks;
  },
  getTask(state) {
    return state.task;
  },
  getServerQuery(state) {
    return state.serverQuery;
  },
};

export const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks;
  },
  replaceTaskOnList(state, updatedTask) {
    const index = state.tasks.findIndex((task) => task.id === updatedTask.id);

    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask);
    }
  },
  moveTask(state, { oldIndex, newIndex }) {
    if (newIndex >= state.tasks.length) {
      let k = newIndex - state.tasks.length + 1;
      while (k--) {
        state.tasks.push(undefined);
      }
    }
    state.tasks.splice(newIndex, 0, state.tasks.splice(oldIndex, 1)[0]);
  },
  setTask(state, task) {
    state.task = task;
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
  resetTask(state) {
    state.task = initialTask();
  },

  setServerQuery(state, { key, value }) {
    state.serverQuery[key] = value;
  },
};

export const actions = {
  async fetchTasks({ state, commit }) {
    try {
      const { data } = await this.$axios.get("/tasks", {
        params: {
          search: state.serverQuery.search,
          sortBy: "sort",
        },
      });
      commit("setTasks", data);
      return;
    } catch (e) {
      console.error(e);
    }
  },
  async storeTask({ commit, state }, title) {
    try {
      let sortValue = Math.max(
        ...state.tasks.map((task) => {
          if (!task.sort) {
            return 0;
          }

          return task.sort;
        })
      );

      if (!sortValue || sortValue === 0) {
        sortValue = 1;
      }

      const { data: newTask } = await this.$axios.post("/tasks", {
        title,
        sort: ++sortValue,
      });
      if (newTask) {
        commit("addTask", newTask);
        return newTask;
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
  async updateAssignee({ commit }, { task, user }) {
    try {
      const { data: updatedTask } = await this.$axios.put("/tasks/" + task.id, {
        assignee: user,
      });

      if (updatedTask) {
        commit("replaceTaskOnList", updatedTask);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async markAsDone({ commit }, task) {
    try {
      const { data: updatedTask } = await this.$axios.put("/tasks/" + task.id, {
        is_done: true,
      });

      if (updatedTask) {
        commit("replaceTaskOnList", updatedTask);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async undoTask({ commit }, task) {
    try {
      const { data: updatedTask } = await this.$axios.put("/tasks/" + task.id, {
        is_done: false,
      });
      if (updatedTask) {
        commit("replaceTaskOnList", updatedTask);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async markImportant({ commit }, task) {
    try {
      const { data: updatedTask } = await this.$axios.put("/tasks/" + task.id, {
        is_important: !task.is_important,
      });
      if (updatedTask) {
        commit("replaceTaskOnList", updatedTask);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async updateTask({ commit, state }) {
    try {
      const { data: updatedTask } = await this.$axios.put(
        "/tasks/" + state.task.id,
        { ...state.task }
      );

      if (updatedTask) {
        commit("replaceTaskOnList", updatedTask);
      }
    } catch (e) {
      console.error(e);
    }
  },
  setTask({ commit }, task) {
    commit("setTask", task);
  },
  resetTask({ commit }) {
    commit("resetTask");
  },
  setServerQuery({ commit }, payload) {
    commit("setServerQuery", payload);
  },

  async moveTask(
    { commit, dispatch, state },
    { droppedTaskID, draggedTaskID }
  ) {
    const newIndex = state.tasks.findIndex((task) => task.id === droppedTaskID);
    const oldIndex = state.tasks.findIndex((task) => task.id === draggedTaskID);

    const droppedTask = state.tasks.find((task) => task.id === droppedTaskID);
    const draggedTask = state.tasks.find((task) => task.id === draggedTaskID);

    commit("moveTask", { oldIndex, newIndex });

    dispatch("setTask", {
      ...droppedTask,
      sort: draggedTask.sort,
    });
    await dispatch("updateTask");
    dispatch("setTask", {
      ...draggedTask,
      sort: droppedTask.sort,
    });
    await dispatch("updateTask");
  },
};
