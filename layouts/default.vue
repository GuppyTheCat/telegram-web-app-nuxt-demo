<template>
  <div class="layout">
    <Navigation />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Navigation component will be auto-imported by Nuxt
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
