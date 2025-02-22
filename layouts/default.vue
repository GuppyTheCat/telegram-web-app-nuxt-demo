<template>
  <div class="layout">
    <AppNavigation />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNavigation from '~/components/AppNavigation.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 1rem;
}
</style>
