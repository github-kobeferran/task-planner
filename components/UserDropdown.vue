<template>
  <div class="avatar-dropdown">
    <div class="avatar" @click="showDropdown = !showDropdown">
      <img :src="imageSrc" alt="Avatar" />
    </div>
    <div class="dropdown" v-show="showDropdown">
      <ul>
        <li v-for="user in users" :key="user.id">
          <div class="user-avatar">
            <img :src="user.avatarSrc" alt="User Avatar" />
          </div>
          <div class="user-name">{{ user.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    imageSrc: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    ...mapGetters("users", {
      users: "getUsers",
    }),
  },
};
</script>

<style lang="scss">
.avatar-dropdown {
  position: relative;
}

.avatar {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-color: #f0f0f0;
  cursor: pointer;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown {
  width: 224px;
  height: 279px;
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  padding: 8px 0;
  margin: 2px 0 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 8px 16px #00000040;
  background: #fff;
  opacity: 1;
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
</style>
