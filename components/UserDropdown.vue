<template>
  <div
    ref="dropdown"
    class="dropdown"
    tabindex="0"
    v-show="showDropdown"
    :style="{
      left: mouseCoordinates.clientX + 'px',
      top: mouseCoordinates.clientY + 'px',
    }"
    @focus="handleFocus"
  >
    <div class="dropdown__header">
      <input
        ref="userSearch"
        @blur="inputIsFocused = false"
        @focus="inputIsFocused = true"
        :value="serverQuery.search"
        @keyup="search"
        type="text"
        placeholder="Search Team Member"
      />
    </div>

    <div class="dropdown__content">
      <ul>
        <li
          v-for="user in users"
          :key="user.id"
          class="assignee-option--unselected"
          :class="{
            'bg-gray-400': currentAssigneeId == user.id,
          }"
          @click="handleAssigneeSelect(user)"
        >
          <div class="user-avatar">
            <img :src="user.avatar" alt="User Avatar" />
          </div>
          <div class="user-name">{{ user.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    avatarImg: {
      type: String,
      required: false,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    },
  },
  data() {
    return {
      inputIsFocused: false,
    };
  },
  computed: {
    currentAssigneeId() {
      if (!this.task || !this.task.assignee) {
        return null;
      }

      return this.task.assignee.id;
    },
    ...mapGetters("tasks", {
      task: "getTask",
    }),
    ...mapGetters("users", {
      users: "getUsers",
      showDropdown: "getShowDropDown",
      selectedUser: "getSelectedUser",
      mouseCoordinates: "getMouseCoordinates",
      serverQuery: "getServerQuery",
    }),
  },
  watch: {
    showDropdown(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.userSearch.focus();
          this.inputIsFocused = true;
          this.$refs.dropdown.focus();
        });
        // Add event listener on the window object to detect clicks outside the dropdown
        window.addEventListener("mousedown", this.handleClickOutside);
      } else {
        // Remove the event listener when the dropdown is hidden
        window.removeEventListener("mousedown", this.handleClickOutside);
      }
    },
  },
  methods: {
    ...mapActions("tasks", ["updateAssignee"]),
    ...mapActions("users", [
      "fetchUsers",
      "setServerQuery",
      "setShowDropDown",
      "setMouseCoordinates",
      "setServerQuery",
      "setSelectedUser",
      "updateAsignee",
    ]),
    handleAssigneeSelect(user) {
      this.updateAssignee({ task: this.task, user });
      this.setShowDropDown(false);
      this.setServerQuery({
        key: "search",
        value: "",
      });
    },
    search(e) {
      this.setServerQuery({
        key: "search",
        value: e.target.value,
      });
      clearTimeout(this.timeout);
      const self = this;
      this.timeout = setTimeout(function () {
        // enter this block of code after 1 second
        // handle stuff, call search API etc.
        self.fetchUsers({
          query: self.searchValue,
        });
      }, 300);
    },
    handleAvatarClicked(e) {
      // if(this.showUserDropDown){
      //   this.setUserServerQuery({
      //     key: 'search',
      //     value: '',
      //   })
      //   this.resetSelectedUser();
      //   return
      // }

      this.setShowDropDown(true);
      this.setMouseCoordinates({
        clientX: e.clientX,
        clientY: e.clientY,
      });
    },
    handleFocus() {
      console.log("focused user dropdoen");
    },
    // handleBlur() {
    //   if (!this.inputIsFocused) {
    //     this.setShowDropDown(false);
    //   }
    //   console.log("blur");
    // },
    handleClickOutside(e) {
      // Check if the clicked element is a child of the dropdown
      if (
        !this.$refs.dropdown.contains(e.target) &&
        !this.$refs.userSearch.contains(e.target)
      ) {
        this.setShowDropDown(false);
        this.setServerQuery({
          key: "search",
          value: "",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  transform: translate(-95%, 3%);
  position: absolute;

  z-index: 1;
  padding: 11px 10px 13px 12px;
  border-radius: 5px;
  box-shadow: 0px 8px 16px #00000040;
  background: #fff;
  opacity: 1;

  &__content {
    width: 224px;
    height: 279px;
    overflow-y: scroll;
    margin: 4px;
    padding: 0;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #d8dbe2; // $gray-300;
    }
  }
}

.dropdown__header {
  width: 100%;
  height: 32px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
}

.user-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 8px;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  font-weight: 400;
}

.assignee-option--unselected {
  &:hover {
    background: #c4bcbc;
  }
}
</style>
