<script setup lang="ts">
import { useDark } from '@vueuse/core'

// Initialize dark mode at app level so it works across all routes
useDark()
</script>

<template>
  <router-view />
</template>
