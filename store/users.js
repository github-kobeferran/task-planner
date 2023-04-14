const initialCoordinates = () => ({
  clientX: 0,
  clientY: 0,
});

export const state = () => ({
  users: [],
  showDropdown: false,
  selectedUser: null,
  mouseCoordinates: initialCoordinates(),
  serverQuery: {
    search: "",
  },
});

export const getters = {
  getUsers(state) {
    return state.users;
  },
  getSelectedUser(state) {
    return state.selectedUser;
  },
  getShowDropDown(state) {
    return state.showDropdown;
  },
  getMouseCoordinates(state) {
    return state.mouseCoordinates;
  },
  getServerQuery(state) {
    return state.serverQuery;
  },
};

export const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setShowDropDown(state, value) {
    state.showDropdown = value;
  },
  setServerQuery(state, { key, value }) {
    state.serverQuery[key] = value;
  },
  setSelectedUser(state, user) {
    state.selectedUser = user;
  },
  setMouseCoordinates(state, value) {
    state.mouseCoordinates = value;
  },
  resetSelectedUser(state) {
    state.selectedUser = null;
  },
  resetMouseCoordinates(state) {
    state.mouseCoordinates = initialCoordinates();
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
  setShowDropDown({ commit }, value) {
    commit("setShowDropDown", value);
  },
  setServerQuery({ commit }, payload) {
    commit("setServerQuery", payload);
  },
  setSelectedUser({ commit }, user) {
    commit("setSelectedUser", user);
  },
  setMouseCoordinates({ commit }, value) {
    commit("setMouseCoordinates", value);
  },
  resetSelectedUser({ commit }) {
    commit("resetSelectedUser");
  },
};
