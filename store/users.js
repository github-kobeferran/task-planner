export const state = () => ({
  users: [],
  serverQuery: {
    search: "",
  },
});

export const getters = {
  getUsers(state) {
    return state.users;
  },
};

export const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
};

export const actions = {
  async fetchUsers({ state, commit }) {
    try {
      const { data } = await this.$axios.get("/users", {
        params: {
          search: state.serverQuery.search,
        },
      });
      commit("setUsers", data);
      return;
    } catch (e) {
      console.error(e);
    }
  },
};
