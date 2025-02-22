<template>
  <div>
    <h1>Drawing Canvas</h1>
    <DrawingCanvas @log-event="handleLogEvent" />
    <EventLog :events="eventLog" />
  </div>
</template>

<script setup lang="ts">
import DrawingCanvas from '~/components/pages/draw/DrawingCanvas.vue'
import EventLog from '~/components/pages/draw/EventLog.vue'

const eventLog = ref<string[]>([])

const handleLogEvent = (eventName: string, e: PointerEvent) => {
  const log = `${eventName}: x=${Math.round(e.clientX)}, y=${Math.round(e.clientY)}, pressure=${e.pressure}, type=${e.pointerType}`
  eventLog.value.unshift(log)
  if (eventLog.value.length > 10) {
    eventLog.value.pop()
  }
  console.log(log)
}
</script>

<style scoped>
.figure-link {
  display: block;
  margin: 1rem 0;
  color: #4CAF50;
  text-decoration: none;
}

.figure-link:hover {
  text-decoration: underline;
}
</style> 