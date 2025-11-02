import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import type { Todo, TodoFilter, TodoStats, TodoStatus } from '@/types/todo'

const STORAGE_KEY = 'vue-todo-app'

export function useTodos() {
  // State with localStorage persistence
  const todos = useStorage<Todo[]>(STORAGE_KEY, [])
  const filter = ref<TodoFilter>({})

  // Computed properties
  const filteredTodos = computed(() => {
    let result = todos.value

    if (filter.value.searchQuery) {
      const query = filter.value.searchQuery.toLowerCase()
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query) ||
          todo.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    if (filter.value.status) {
      result = result.filter((todo) => todo.status === filter.value.status)
    }

    if (filter.value.priority) {
      result = result.filter((todo) => todo.priority === filter.value.priority)
    }

    if (filter.value.category) {
      result = result.filter((todo) => todo.category === filter.value.category)
    }

    if (filter.value.tags && filter.value.tags.length > 0) {
      result = result.filter((todo) =>
        filter.value.tags!.some((tag) => todo.tags.includes(tag))
      )
    }

    return result
  })

  const stats = computed<TodoStats>(() => {
    return {
      total: todos.value.length,
      todo: todos.value.filter((t) => t.status === 'todo').length,
      inProgress: todos.value.filter((t) => t.status === 'in-progress').length,
      done: todos.value.filter((t) => t.status === 'done').length,
    }
  })

  const categories = computed(() => {
    const cats = new Set(todos.value.map((t) => t.category))
    return Array.from(cats).filter(Boolean)
  })

  const allTags = computed(() => {
    const tags = new Set(todos.value.flatMap((t) => t.tags))
    return Array.from(tags)
  })

  // Actions
  function addTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    todos.value.push(newTodo)
  }

  function updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) {
    const todo = todos.value.find((t) => t.id === id)
    if (!todo) return

    Object.assign(todo, {
      ...updates,
      updatedAt: new Date(),
    })
  }

  function deleteTodo(id: string) {
    const index = todos.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }

  function toggleTodoStatus(id: string) {
    const todo = todos.value.find((t) => t.id === id)
    if (!todo) return

    let newStatus: TodoStatus
    if (todo.status === 'todo') {
      newStatus = 'in-progress' as TodoStatus
    } else if (todo.status === 'in-progress') {
      newStatus = 'done' as TodoStatus
    } else {
      newStatus = 'todo' as TodoStatus
    }

    updateTodo(id, {
      status: newStatus,
      completedAt: newStatus === 'done' ? new Date() : undefined,
    })
  }

  function updateFilter(newFilter: Partial<TodoFilter>) {
    filter.value = { ...filter.value, ...newFilter }
  }

  function clearFilter() {
    filter.value = {}
  }

  function reorderTodos(newOrder: Todo[]) {
    todos.value = newOrder
  }

  function getTodoById(id: string) {
    return todos.value.find((t) => t.id === id)
  }

  return {
    todos,
    filteredTodos,
    filter,
    stats,
    categories,
    allTags,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
    updateFilter,
    clearFilter,
    reorderTodos,
    getTodoById,
  }
}
