<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, defineProps } from 'vue'
import { useResizeObserver } from '@vueuse/core'

import UfoImage from '@/shared/assets/bg/ufo.webp'
import explosionSrc from '@/shared/assets/planets/expose.png'
import PlanetImage from '@/shared/assets/planets/planet-1/level-0.png'

interface FixedPoint {
  x: number
  y: number
  rotation?: number
  scale?: number
}

export interface AttackSceneProps {
  currentLevel: number
  fixedPoints?: FixedPoint[]
  planetSrc?: string
  ufoSrc?: string
}

const EXPLOSION_DURATION = 1_500 // мс
const EXPLOSION_BASE_SIZE = 100 // px
const UFO_LANDING = { x: 0.7, y: 0.8 } as const

const props = withDefaults(defineProps<AttackSceneProps>(), {
  ufoSrc: UfoImage,
  planetSrc: PlanetImage,
  fixedPoints: () => [
    { x: 0.7, y: 0.8 },
    { x: 0.85, y: 0.42, rotation: 120 },
    { x: 0.22, y: 0.7, scale: 0.8 },
    { x: 0.25, y: 0.3 },
    { x: 0.6, y: 0.18 },
    { x: 0.45, y: 0.5 },
  ],
})

const container = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const ctx = computed(() => canvas.value?.getContext('2d') ?? null)
const ufoEl = ref<HTMLImageElement>()

const explosionImg = new Image()
explosionImg.src = explosionSrc

interface Explosion {
  x: number
  y: number
  rotation: number
  scale: number
  start: number
}
const activeExplosions = ref<Explosion[]>([])
const persistentExplosions = ref<Explosion[]>([])

function addExplosion(pt: FixedPoint) {
  const now = performance.now()
  const exp: Explosion = {
    x: pt.x,
    y: pt.y,
    rotation: pt.rotation ?? 0,
    scale: pt.scale ?? 1,
    start: now,
  }
  activeExplosions.value.push(exp)
  persistentExplosions.value.push({ ...exp })
}

function resizeCanvas() {
  if (canvas.value && container.value) {
    const { width, height } = container.value.getBoundingClientRect()
    canvas.value.width = width
    canvas.value.height = height
  }
}
useResizeObserver(container, resizeCanvas)

let rafId: number
function renderExplosion(
  c: CanvasRenderingContext2D,
  {
    x,
    y,
    rotation,
    scale,
    alpha,
  }: { x: number; y: number; rotation: number; scale: number; alpha: number },
) {
  c.save()
  c.translate(x, y)
  c.rotate((rotation * Math.PI) / 180)
  c.globalAlpha = alpha
  const size = EXPLOSION_BASE_SIZE * scale
  c.drawImage(explosionImg, -size / 2, -size / 2, size, size)
  c.restore()
}

function loop() {
  const c = ctx.value
  if (!c || !container.value) return

  const { width, height } = container.value.getBoundingClientRect()
  c.clearRect(0, 0, width, height)

  persistentExplosions.value.forEach((e) => renderExplosion(c, { ...e, alpha: 1 }))

  const now = performance.now()
  activeExplosions.value = activeExplosions.value.filter((e) => {
    const t = (now - e.start) / EXPLOSION_DURATION
    if (t >= 1) return false
    const progress = 1 - (1 - t) ** 2 // ease‑out‑quad
    renderExplosion(c, {
      ...e,
      scale: e.scale * progress,
      alpha: 1 - t,
    })
    return true
  })

  rafId = requestAnimationFrame(loop)
}

async function animateUfoTo(destX: number, destY: number) {
  if (!ufoEl.value || !container.value) return
  const { width, height } = container.value.getBoundingClientRect()
  const ufoW = ufoEl.value.clientWidth
  const ufoH = ufoEl.value.clientHeight
  const startY = height / 2 - ufoH / 2

  ufoEl.value.style.transform = `translate(${-ufoW}px, ${startY}px)`

  await ufoEl.value.animate(
    [
      { transform: `translate(${-ufoW}px, ${startY}px)` },
      { transform: `translate(${destX - ufoW / 2}px, ${destY - ufoH / 2}px)` },
    ],
    { duration: 800, easing: 'ease-in-out', fill: 'forwards' },
  ).finished

  addExplosion({
    x: destX,
    y: destY,
    rotation: props.fixedPoints[props.currentLevel - 1]?.rotation,
    scale: props.fixedPoints[props.currentLevel - 1]?.scale,
  })
  await new Promise((r) => setTimeout(r, EXPLOSION_DURATION))

  await ufoEl.value.animate(
    [
      { transform: `translate(${destX - ufoW / 2}px, ${destY - ufoH / 2}px)` },
      { transform: `translate(${width + ufoW}px, ${startY}px)` },
    ],
    { duration: 800, easing: 'ease-in', fill: 'forwards' },
  ).finished
}

onMounted(() => {
  resizeCanvas()
  explosionImg.onload = () => loop()
})
onBeforeUnmount(() => cancelAnimationFrame(rafId))

watch(
  () => props.currentLevel,
  () => {
    if (!container.value) return
    const { width, height } = container.value.getBoundingClientRect()

    props.fixedPoints.forEach((pt, i) =>
      setTimeout(
        () =>
          addExplosion({
            x: pt.x * width,
            y: pt.y * height,
            rotation: pt.rotation,
            scale: pt.scale,
          }),
        i * 400,
      ),
    )

    animateUfoTo(UFO_LANDING.x * width, UFO_LANDING.y * height)
  },
)
</script>

<template>
  <div ref="container" class="planet-attack-scene">
    <img :src="planetSrc" alt="Planet" class="planet-img" />
    <canvas ref="canvas" class="explosion-canvas" />
    <img ref="ufoEl" :src="ufoSrc" alt="UFO" class="ufo" />
  </div>
</template>

<style scoped lang="scss">
.planet-attack-scene {
  position: relative;
  width: 310px;
  height: 310px;
}
.planet-img {
  display: block;
  width: 100%;
}
.explosion-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.ufo {
  position: absolute;
  top: 0;
  left: 0;
  width: 280px;
  height: auto;
  will-change: transform;
  transform: translateX(-100%);
}
</style>
