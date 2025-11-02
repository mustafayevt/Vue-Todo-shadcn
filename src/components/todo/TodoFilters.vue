<script setup lang="ts">
import { ref } from 'vue'
import { TodoStatus, TodoPriority } from '@/types/todo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { Search, Filter, X } from 'lucide-vue-next'

interface TodoFilter {
  status?: TodoStatus
  priority?: TodoPriority
  category?: string
  searchQuery?: string
}

const props = defineProps<{
  categories: string[]
  currentFilter: TodoFilter
}>()

const emit = defineEmits<{
  updateFilter: [filter: Partial<TodoFilter>]
  clearFilter: []
}>()

const searchQuery = ref(props.currentFilter.searchQuery || '')
const selectedStatus = ref<TodoStatus | undefined>(props.currentFilter.status)
const selectedPriority = ref<TodoPriority | undefined>(props.currentFilter.priority)
const selectedCategory = ref(props.currentFilter.category || '')

function handleSearch() {
  emit('updateFilter', { searchQuery: searchQuery.value })
}

function handleStatusChange(value: unknown) {
  const stringValue = String(value)
  const status = stringValue === 'all' || !value ? undefined : stringValue as TodoStatus
  selectedStatus.value = status
  emit('updateFilter', { status })
}

function handlePriorityChange(value: unknown) {
  const stringValue = String(value)
  const priority = stringValue === 'all' || !value ? undefined : stringValue as TodoPriority
  selectedPriority.value = priority
  emit('updateFilter', { priority })
}

function handleCategoryChange(value: unknown) {
  const stringValue = String(value)
  const category = stringValue === 'all' || !value ? undefined : stringValue
  selectedCategory.value = category || ''
  emit('updateFilter', { category })
}

function handleClear() {
  searchQuery.value = ''
  selectedStatus.value = undefined
  selectedPriority.value = undefined
  selectedCategory.value = ''
  emit('clearFilter')
}
</script>

<template>
  <div class="space-y-4 p-4 bg-muted/50 rounded-lg">
    <div class="flex items-center gap-2">
      <Filter class="w-5 h-5 text-muted-foreground" />
      <h3 class="font-semibold">Filters</h3>
      <Button
        v-if="searchQuery || selectedStatus || selectedPriority || selectedCategory"
        size="sm"
        variant="ghost"
        @click="handleClear"
        class="ml-auto"
      >
        <X class="w-4 h-4 mr-1" />
        Clear All
      </Button>
    </div>

    <div class="relative">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        v-model="searchQuery"
        placeholder="Search todos..."
        class="pl-9"
        @input="handleSearch"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="space-y-2">
        <label class="text-sm font-medium">Status</label>
        <Select :model-value="selectedStatus || 'all'" @update:model-value="handleStatusChange">
          <SelectTrigger>
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem :value="TodoStatus.TODO">To Do</SelectItem>
            <SelectItem :value="TodoStatus.IN_PROGRESS">In Progress</SelectItem>
            <SelectItem :value="TodoStatus.DONE">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Priority</label>
        <Select :model-value="selectedPriority || 'all'" @update:model-value="handlePriorityChange">
          <SelectTrigger>
            <SelectValue placeholder="All priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem :value="TodoPriority.LOW">Low</SelectItem>
            <SelectItem :value="TodoPriority.MEDIUM">Medium</SelectItem>
            <SelectItem :value="TodoPriority.HIGH">High</SelectItem>
            <SelectItem :value="TodoPriority.URGENT">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Category</label>
        <Select :model-value="selectedCategory || 'all'" @update:model-value="handleCategoryChange">
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
