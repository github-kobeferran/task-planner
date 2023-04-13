<template>
  <div class="backdrop" @click="cancelDelete">
    <div class="delete-dialog">
      <h3>Are you sure you want to delete this item?</h3>
      <div class="delete-buttons">
        <button class="delete-confirm" @click="confirmDelete">Yes</button>
        <button class="delete-cancel" @click="cancelDelete">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["delete", "close"],
  methods: {
    confirmDelete() {
      this.$emit("clicked-yes");
    },
    cancelDelete() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.delete-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 400px;
  text-align: center;
  z-index: 9999;
}

.delete-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.delete-confirm {
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}

.delete-confirm:hover {
  background-color: #c62828;
}

.delete-cancel {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

.delete-cancel:hover {
  background-color: #e0e0e0;
}
</style>
