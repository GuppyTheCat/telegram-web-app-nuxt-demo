<template>
  <nav class="navigation">
    <NuxtLink to="/" class="nav-link" :class="{ active: route.path === '/' }">
      Drawing Canvas
    </NuxtLink>
    <NuxtLink to="/figure" class="nav-link" :class="{ active: route.path === '/figure' }">
      Interactive Figure
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.navigation {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.nav-link {
  color: #6c757d;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #4CAF50;
  background-color: #e9ecef;
}

.nav-link.active {
  color: #fff;
  background-color: #4CAF50;
}
</style> 