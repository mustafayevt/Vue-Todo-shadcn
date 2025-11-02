<script setup lang="ts">
import { ref } from 'vue'
import { TodoStatus, TodoPriority } from '@/types/todo'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { Plus } from 'lucide-vue-next'

const emit = defineEmits<{
  add: [todo: {
    title: string
    description: string
    status: TodoStatus
    priority: TodoPriority
    category: string
    tags: string[]
    dueDate?: Date
  }]
}>()

const open = ref(false)
const title = ref('')
const description = ref('')
const status = ref<TodoStatus>(TodoStatus.TODO)
const priority = ref<TodoPriority>(TodoPriority.MEDIUM)
const category = ref('')
const tagsInput = ref('')
const dueDate = ref('')

function handleSubmit() {
  if (!title.value.trim()) return

  const tags = tagsInput.value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  emit('add', {
    title: title.value,
    description: description.value,
    status: status.value,
    priority: priority.value,
    category: category.value,
    tags,
    dueDate: dueDate.value ? new Date(dueDate.value) : undefined,
  })

  // Reset form
  title.value = ''
  description.value = ''
  status.value = TodoStatus.TODO
  priority.value = TodoPriority.MEDIUM
  category.value = ''
  tagsInput.value = ''
  dueDate.value = ''
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>
        <Plus class="w-4 h-4" />
        Add Todo
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[525px]">
      <DialogTitle>Add New Todo</DialogTitle>
      <DialogDescription>
        Create a new todo item. Fill in the details below.
      </DialogDescription>
      
      <form @submit.prevent="handleSubmit" class="space-y-4 mt-4">
        <div class="space-y-2">
          <label for="title" class="text-sm font-medium">Title *</label>
          <Input
            id="title"
            v-model="title"
            placeholder="Enter todo title"
            required
          />
        </div>

        <div class="space-y-2">
          <label for="description" class="text-sm font-medium">Description</label>
          <Textarea
            id="description"
            v-model="description"
            placeholder="Enter todo description"
            rows="3"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="status" class="text-sm font-medium">Status</label>
            <Select v-model="status">
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
            <label for="priority" class="text-sm font-medium">Priority</label>
            <Select v-model="priority">
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
          <label for="category" class="text-sm font-medium">Category</label>
          <Input
            id="category"
            v-model="category"
            placeholder="e.g., Work, Personal, Shopping"
          />
        </div>

        <div class="space-y-2">
          <label for="tags" class="text-sm font-medium">Tags</label>
          <Input
            id="tags"
            v-model="tagsInput"
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div class="space-y-2">
          <label for="dueDate" class="text-sm font-medium">Due Date</label>
          <Input
            id="dueDate"
            v-model="dueDate"
            type="date"
          />
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" @click="open = false">
            Cancel
          </Button>
          <Button type="submit">
            Create Todo
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
