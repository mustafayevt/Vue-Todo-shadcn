<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '@/types/todo'
import TodoItem from './TodoItem.vue'
import { useSortable } from '@vueuse/integrations/useSortable'

const props = defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  update: [id: string, updates: Partial<Todo>]
  delete: [id: string]
  toggleStatus: [id: string]
  reorder: [todos: Todo[]]
}>()

const todoList = ref<HTMLElement | null>(null)

useSortable(todoList, props.todos, {
  animation: 200,
  ghostClass: 'opacity-50',
  onUpdate: (e: { oldIndex?: number; newIndex?: number }) => {
    const newOrder = [...props.todos]
    const item = newOrder.splice(e.oldIndex!, 1)[0]
    if (item) {
      newOrder.splice(e.newIndex!, 0, item)
      emit('reorder', newOrder)
    }
  },
})
</script>

<template>
  <div ref="todoList" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @update="(id, updates) => emit('update', id, updates)"
      @delete="(id) => emit('delete', id)"
      @toggle-status="(id) => emit('toggleStatus', id)"
      class="cursor-move"
    />
  </div>
</template>
