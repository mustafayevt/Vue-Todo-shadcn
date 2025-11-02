<script setup lang="ts">
import { useTodos } from '@/composables/useTodos'
import TodoForm from '@/components/todo/TodoForm.vue'
import TodoList from '@/components/todo/TodoList.vue'
import TodoFilters from '@/components/todo/TodoFilters.vue'
import TodoStats from '@/components/todo/TodoStats.vue'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-vue-next'
import { useDark, useToggle } from '@vueuse/core'

const {
  filteredTodos,
  stats,
  categories,
  filter,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
  updateFilter,
  clearFilter,
  reorderTodos,
} = useTodos()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Advanced Todo App
          </h1>
          <p class="text-muted-foreground mt-2">
            Organize your tasks efficiently with advanced features
          </p>
        </div>
        <div class="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            @click="toggleDark()"
          >
            <Sun v-if="isDark" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
          </Button>
          <TodoForm @add="addTodo" />
        </div>
      </div>

      <!-- Stats -->
      <TodoStats :stats="stats" class="mb-6" />

      <!-- Filters -->
      <TodoFilters
        :categories="categories"
        :current-filter="filter"
        @update-filter="updateFilter"
        @clear-filter="clearFilter"
        class="mb-6"
      />

      <!-- Todo List -->
      <div v-if="filteredTodos.length === 0" class="text-center py-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 text-muted-foreground"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">No todos found</h3>
        <p class="text-muted-foreground mb-4">
          {{ filter.searchQuery || filter.status || filter.priority || filter.category
            ? 'Try adjusting your filters'
            : 'Get started by creating your first todo' }}
        </p>
      </div>

      <TodoList
        v-else
        :todos="filteredTodos"
        @update="updateTodo"
        @delete="deleteTodo"
        @toggle-status="toggleTodoStatus"
        @reorder="reorderTodos"
      />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
