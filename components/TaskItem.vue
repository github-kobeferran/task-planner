<template>
   <label class="list-group-item">
        <input
          class="form-check-input me-1"
          type="checkbox"
          :checked="task.is_done"
          @input="$emit('mark', {
            task,
            markAs: !task.is_done ? 'done' : 'undo'
          })"
        />
        <span
          :class="{
            'strike-through': task.is_done,
          }"
          >{{ task.title }}</span
        >
        <button class="ms-1" @click="$emit('delete', task)" >Delete</button>
        <button class="ms-1" :class="{
          'bg-warning' : task.is_important
        }" @click="$emit('mark', {task, markAs: 'important'})" >{{ importantTitle }}</button>
      </label>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
  emits: ['mark', 'delete'],
  computed:{
    importantTitle(){
      if( this.task.is_important){
        return 'Important'
      }

      return 'Not Important'
    }
  }
}
</script>

<style lang="scss" scoped>
.strike-through {
  text-decoration: line-through !important;
}
</style>

