<template>
  <canvas
    ref="canvasRef"
    width="400"
    height="400"
    style="border: 1px solid black; touch-action: none;"
    @pointerdown="startDrawing"
    @pointermove="draw"
    @pointerup="stopDrawing"
    @pointercancel="stopDrawing"
    @touchstart.prevent
    @touchmove.prevent
  ></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  (e: 'logEvent', eventName: string, event: PointerEvent): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const isDrawing = ref(false)

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d')
    canvasRef.value.style.touchAction = 'none'
  }
})

const startDrawing = (e: PointerEvent) => {
  isDrawing.value = true
  emit('logEvent', 'pointerdown', e)
  
  if (ctx.value && canvasRef.value) {
    const rect = canvasRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.value.beginPath()
    ctx.value.moveTo(x, y)
  }
}

const draw = (e: PointerEvent) => {
  if (!isDrawing.value || !ctx.value || !canvasRef.value) return
  
  e.preventDefault()
  emit('logEvent', 'pointermove', e)
  
  const rect = canvasRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  ctx.value.lineWidth = 5
  ctx.value.lineCap = 'round'
  ctx.value.lineTo(x, y)
  ctx.value.stroke()
}

const stopDrawing = (e?: PointerEvent) => {
  if (e) {
    emit('logEvent', 'pointerup/cancel', e)
  }
  isDrawing.value = false
}
</script>

<style scoped>
canvas {
  touch-action: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style> 