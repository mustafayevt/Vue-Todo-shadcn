<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen grid place-items-center bg-background text-foreground">
    <div class="text-center space-y-4">
      <h1 class="text-3xl font-bold">404 — Page Not Found</h1>
      <p class="text-muted-foreground">The page you're looking for doesn't exist.</p>
      <Button variant="outline" @click="goHome">Back to Home</Button>
    </div>
  </div>
</template>

