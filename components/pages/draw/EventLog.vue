<template>
  <div class="event-log">
    <h3>Event Log:</h3>
    <div class="log-container">
      <div v-for="(event, index) in events" :key="index" class="log-entry">
        {{ event }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  events: string[]
}>()
</script>

<style scoped>
.event-log {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  max-width: 400px;
}

.log-container {
  max-height: 200px;
  overflow-y: auto;
}

.log-entry {
  font-family: monospace;
  font-size: 12px;
  padding: 2px 0;
  border-bottom: 1px solid #eee;
}
</style> 