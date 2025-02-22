<template>
  <div class="canvas-container">
    <h1>Interactive Figure</h1>
    <canvas 
      ref="canvasRef" 
      width="400"
      height="400"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    />
    <button class="reset-button" @click="resetFigure">
      Reset Position
    </button>
    <div class="controls">
      <p>Click to rotate the figure</p>
      <p>Drag horizontally to move left/right</p>
      <p>Figure automatically moves down</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const INITIAL_POSITION = {
  x: 200,
  y: 25, // Start near the top
  rotation: 0,
  size: 50
}

const FALL_SPEED = 1 // pixels per frame
const UPDATE_INTERVAL = 50 // milliseconds

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDragging = ref(false)
const initialDragPosition = ref({ x: 0, y: 0 })
const dragDirection = ref<'horizontal' | 'vertical' | null>(null)
const intervalId = ref<number | null>(null)

const figure = ref({ ...INITIAL_POSITION })

let startX = 0
let startY = 0

function resetFigure() {
  figure.value = { ...INITIAL_POSITION }
  draw()
}

function updateFigurePosition() {
  const canvas = canvasRef.value
  if (!canvas) return

  // Move figure down
  figure.value.y += FALL_SPEED

  // Reset to top if reached bottom
  if (figure.value.y > canvas.height - figure.value.size/2) {
    figure.value.y = figure.value.size/2
  }

  draw()
}

function startAutoMove() {
  if (intervalId.value) return
  intervalId.value = window.setInterval(updateFigurePosition, UPDATE_INTERVAL)
}

function stopAutoMove() {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

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
    initialDragPosition.value = { x, y }
    dragDirection.value = null
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

  // Determine drag direction if not set
  if (!dragDirection.value) {
    const deltaX = Math.abs(x - initialDragPosition.value.x)
    const deltaY = Math.abs(y - initialDragPosition.value.y)
    
    if (deltaX > 5 || deltaY > 5) {
      dragDirection.value = deltaX > deltaY ? 'horizontal' : 'vertical'
    }
  }

  // Apply movement based on direction
  if (dragDirection.value === 'horizontal') {
    figure.value.x = x - startX
  } else if (dragDirection.value === 'vertical' && y > initialDragPosition.value.y) {
    // Add extra downward movement when dragging down
    figure.value.y += (y - initialDragPosition.value.y)// Adjust divisor to control sensitivity
    initialDragPosition.value.y = y // Update reference point
  }

  // Keep figure within canvas bounds
  figure.value.x = Math.max(figure.value.size/2, Math.min(canvas.width - figure.value.size/2, figure.value.x))
  figure.value.y = Math.max(figure.value.size/2, Math.min(canvas.height - figure.value.size/2, figure.value.y))

  draw()
}

function handleMouseUp() {
  isDragging.value = false
  dragDirection.value = null
  startAutoMove() // Resume auto movement
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
  startAutoMove()
})

onUnmounted(() => {
  stopAutoMove()
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

.reset-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.reset-button:hover {
  background-color: #45a049;
}

.controls {
  margin-top: 20px;
  text-align: center;
  color: #666;
}
</style> 