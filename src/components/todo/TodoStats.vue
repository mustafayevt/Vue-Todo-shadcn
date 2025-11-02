<script setup lang="ts">
import { computed } from 'vue'
import type { TodoStats } from '@/types/todo'
import { Card, CardContent } from '@/components/ui/card'
import { ListTodo, Clock, CheckCircle2, TrendingUp } from 'lucide-vue-next'

const props = defineProps<{
  stats: TodoStats
}>()

const completionRate = computed(() => {
  if (props.stats.total === 0) return 0
  return Math.round((props.stats.done / props.stats.total) * 100)
})
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent class="pt-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Total</p>
              <p class="text-2xl font-bold">{{ stats.total }}</p>
            </div>
            <ListTodo class="w-8 h-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">To Do</p>
              <p class="text-2xl font-bold">{{ stats.todo }}</p>
            </div>
            <ListTodo class="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">In Progress</p>
              <p class="text-2xl font-bold">{{ stats.inProgress }}</p>
            </div>
            <Clock class="w-8 h-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Done</p>
              <p class="text-2xl font-bold">{{ stats.done }}</p>
            </div>
            <CheckCircle2 class="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>

    <Card v-if="stats.total > 0">
      <CardContent class="pt-6">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <TrendingUp class="w-5 h-5 text-primary" />
            <p class="text-sm font-medium">Completion Rate</p>
          </div>
          <p class="text-2xl font-bold">{{ completionRate }}%</p>
        </div>
        <div class="w-full bg-secondary rounded-full h-2">
          <div
            class="bg-primary h-2 rounded-full transition-all duration-300"
            :style="{ width: `${completionRate}%` }"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
