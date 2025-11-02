<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Todo } from '@/types/todo'
import { TodoStatus, TodoPriority } from '@/types/todo'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Edit, Trash2, Clock, Calendar } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  update: [id: string, updates: Partial<Todo>]
  delete: [id: string]
  toggleStatus: [id: string]
}>()

const editOpen = ref(false)
const editTitle = ref(props.todo.title)
const editDescription = ref(props.todo.description)
const editStatus = ref(props.todo.status)
const editPriority = ref(props.todo.priority)
const editCategory = ref(props.todo.category)
const editTagsInput = ref(props.todo.tags.join(', '))
const editDueDate = ref(props.todo.dueDate ? new Date(props.todo.dueDate).toISOString().split('T')[0] : '')

const priorityColor = computed(() => {
  switch (props.todo.priority) {
    case TodoPriority.LOW:
      return 'default'
    case TodoPriority.MEDIUM:
      return 'secondary'
    case TodoPriority.HIGH:
      return 'default'
    case TodoPriority.URGENT:
      return 'destructive'
    default:
      return 'default'
  }
})

const statusColor = computed(() => {
  switch (props.todo.status) {
    case TodoStatus.TODO:
      return 'outline'
    case TodoStatus.IN_PROGRESS:
      return 'secondary'
    case TodoStatus.DONE:
      return 'default'
    default:
      return 'outline'
  }
})

const isOverdue = computed(() => {
  if (!props.todo.dueDate) return false
  return new Date(props.todo.dueDate) < new Date() && props.todo.status !== TodoStatus.DONE
})

function handleEdit() {
  const tags = editTagsInput.value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  emit('update', props.todo.id, {
    title: editTitle.value,
    description: editDescription.value,
    status: editStatus.value,
    priority: editPriority.value,
    category: editCategory.value,
    tags,
    dueDate: editDueDate.value ? new Date(editDueDate.value) : undefined,
  })
  editOpen.value = false
}

function openEdit() {
  editTitle.value = props.todo.title
  editDescription.value = props.todo.description
  editStatus.value = props.todo.status
  editPriority.value = props.todo.priority
  editCategory.value = props.todo.category
  editTagsInput.value = props.todo.tags.join(', ')
  editDueDate.value = props.todo.dueDate ? new Date(props.todo.dueDate).toISOString().split('T')[0] : ''
  editOpen.value = true
}
</script>

<template>
  <Card :class="{ 'border-destructive': isOverdue }">
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <CardTitle class="text-lg">{{ todo.title }}</CardTitle>
            <Button
              size="icon"
              variant="ghost"
              class="h-6 w-6"
              @click="emit('toggleStatus', todo.id)"
            >
              <Check :class="{ 'text-green-600': todo.status === TodoStatus.DONE }" class="w-4 h-4" />
            </Button>
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge :variant="statusColor">
              {{ todo.status === TodoStatus.IN_PROGRESS ? 'In Progress' : todo.status }}
            </Badge>
            <Badge :variant="priorityColor">
              {{ todo.priority }}
            </Badge>
            <Badge v-if="todo.category" variant="outline">
              {{ todo.category }}
            </Badge>
          </div>
        </div>
        <div class="flex gap-1">
          <Button size="icon" variant="ghost" class="h-8 w-8" @click="openEdit">
            <Edit class="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" class="h-8 w-8 text-destructive" @click="emit('delete', todo.id)">
            <Trash2 class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    
    <CardContent class="space-y-3">
      <p v-if="todo.description" class="text-sm text-muted-foreground">
        {{ todo.description }}
      </p>
      
      <div v-if="todo.tags.length > 0" class="flex flex-wrap gap-1">
        <Badge v-for="tag in todo.tags" :key="tag" variant="secondary" class="text-xs">
          #{{ tag }}
        </Badge>
      </div>

      <div v-if="todo.dueDate" class="flex items-center gap-2 text-sm" :class="{ 'text-destructive': isOverdue }">
        <Calendar class="w-4 h-4" />
        <span>Due: {{ new Date(todo.dueDate).toLocaleDateString() }}</span>
        <Badge v-if="isOverdue" variant="destructive" class="text-xs">Overdue</Badge>
      </div>

      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock class="w-3 h-3" />
        <span>Created: {{ new Date(todo.createdAt).toLocaleDateString() }}</span>
      </div>
    </CardContent>
  </Card>

  <Dialog v-model:open="editOpen">
    <DialogContent class="sm:max-w-[525px]">
      <DialogTitle>Edit Todo</DialogTitle>
      
      <form @submit.prevent="handleEdit" class="space-y-4 mt-4">
        <div class="space-y-2">
          <label for="edit-title" class="text-sm font-medium">Title *</label>
          <Input
            id="edit-title"
            v-model="editTitle"
            placeholder="Enter todo title"
            required
          />
        </div>

        <div class="space-y-2">
          <label for="edit-description" class="text-sm font-medium">Description</label>
          <Textarea
            id="edit-description"
            v-model="editDescription"
            placeholder="Enter todo description"
            rows="3"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="edit-status" class="text-sm font-medium">Status</label>
            <Select v-model="editStatus">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="TodoStatus.TODO">To Do</SelectItem>
                <SelectItem :value="TodoStatus.IN_PROGRESS">In Progress</SelectItem>
                <SelectItem :value="TodoStatus.DONE">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <label for="edit-priority" class="text-sm font-medium">Priority</label>
            <Select v-model="editPriority">
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="TodoPriority.LOW">Low</SelectItem>
                <SelectItem :value="TodoPriority.MEDIUM">Medium</SelectItem>
                <SelectItem :value="TodoPriority.HIGH">High</SelectItem>
                <SelectItem :value="TodoPriority.URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="space-y-2">
          <label for="edit-category" class="text-sm font-medium">Category</label>
          <Input
            id="edit-category"
            v-model="editCategory"
            placeholder="e.g., Work, Personal, Shopping"
          />
        </div>

        <div class="space-y-2">
          <label for="edit-tags" class="text-sm font-medium">Tags</label>
          <Input
            id="edit-tags"
            v-model="editTagsInput"
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div class="space-y-2">
          <label for="edit-dueDate" class="text-sm font-medium">Due Date</label>
          <Input
            id="edit-dueDate"
            v-model="editDueDate"
            type="date"
          />
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" @click="editOpen = false">
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
