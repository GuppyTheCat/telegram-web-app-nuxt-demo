<template>
  <div class="canvas-container">
    <h1>Interactive Figure</h1>
    <canvas 
      ref="canvasRef" 
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      width="400"
      height="400"
    ></canvas>
    <div class="controls">
      <p>Click to rotate the figure</p>
      <p>Drag to move the figure</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDragging = ref(false)
const figure = ref({
  x: 200, // center X
  y: 200, // center Y
  rotation: 0,
  size: 50
})

let startX = 0
let startY = 0

function drawFigure(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  
  ctx.save()
  ctx.translate(figure.value.x, figure.value.y)
  ctx.rotate(figure.value.rotation)
  
  // Draw a simple rectangle
  ctx.fillStyle = '#4CAF50'
  ctx.fillRect(-figure.value.size/2, -figure.value.size/2, figure.value.size, figure.value.size)
  
  ctx.restore()
}

function handleMouseDown(e: MouseEvent) {
  const canvas = canvasRef.value!
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // Check if click is inside the figure
  if (Math.abs(x - figure.value.x) < figure.value.size/2 &&
      Math.abs(y - figure.value.y) < figure.value.size/2) {
    isDragging.value = true
    startX = x - figure.value.x
    startY = y - figure.value.y
  } else {
    // Rotate if clicked outside the figure
    figure.value.rotation += Math.PI / 4
    draw()
  }
}

function handleMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  
  const canvas = canvasRef.value!
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  figure.value.x = x - startX
  figure.value.y = y - startY
  draw()
}

function handleMouseUp() {
  isDragging.value = false
}

// Touch event handlers
function handleTouchStart(e: TouchEvent) {
  e.preventDefault()
  const touch = e.touches[0]
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  })
  handleMouseDown(mouseEvent)
}

function handleTouchMove(e: TouchEvent) {
  e.preventDefault()
  const touch = e.touches[0]
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  })
  handleMouseMove(mouseEvent)
}

function handleTouchEnd(e: TouchEvent) {
  e.preventDefault()
  handleMouseUp()
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  drawFigure(ctx)
}

onMounted(() => {
  draw()
})
</script>

<style scoped>
.canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

canvas {
  border: 2px solid #333;
  background-color: #f5f5f5;
  touch-action: none; /* Prevents default touch actions */
}

.controls {
  margin-top: 20px;
  text-align: center;
  color: #666;
}
</style> 