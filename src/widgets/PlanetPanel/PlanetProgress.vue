<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

defineProps<{
  currentLevel: number
  accentColor?: string
  emptyColor?: string
  delay?: number
}>()

const segments = reactive([
  { d: 'M7 116.713C13.4716 99.4293 22.6758 83.3314 34.2506 69.0527', length: 0 },
  { d: 'M36.375 66.4838C48.2248 52.4395 62.251 40.4492 77.9019 30.9844', length: 0 },
  { d: 'M81.5898 28.8188C97.4725 19.7603 114.704 13.3895 132.606 9.95703', length: 0 },
  { d: 'M138.34 8.96249C156.349 6.16241 174.687 6.35991 192.633 9.5472', length: 0 },
  { d: 'M198.371 10.6699C216.197 14.4898 233.29 21.2327 248.979 30.6335', length: 0 },
  { d: 'M253.113 33.1953C268.527 43.0524 282.255 55.3933 293.757 69.7325', length: 0 },
  { d: 'M296.02 72.6152C307.213 87.2038 315.988 103.546 322.001 121', length: 0 },
])

const svgEl = ref<SVGSVGElement | null>(null)

onMounted(() => {
  if (!svgEl.value) return

  const fgPaths = svgEl.value.querySelectorAll<SVGPathElement>('path.fg-segment')
  fgPaths.forEach((path, i) => {
    segments[i].length = path.getTotalLength()
  })
})
</script>

<template>
  <div class="planet-progress">
    <svg
      width="329"
      height="124"
      viewBox="0 0 329 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref="svgEl"
    >
      <path v-for="(seg, i) in segments" :key="i + '-bg'" :d="seg.d" class="bg-segment" />

      <path
        v-for="(seg, i) in segments"
        :key="i + '-fg'"
        :d="seg.d"
        class="fg-segment"
        :class="{ active: i < currentLevel }"
        :style="{ '--len': seg.length + 'px' }"
      />
    </svg>
  </div>
</template>

<style scoped lang="scss">
.planet-progress {
  --gap: 2px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 38px;
  right: 0;
  left: 0;

  @media (max-width: 400px) {
    top: 28px;
    svg {
      width: 290px;
    }
  }

  .bg-segment {
    fill: none;
    stroke: rgba(255, 255, 255, 0.2);
    stroke-width: 13;
    stroke-linecap: butt;
  }

  .fg-segment {
    fill: none;
    stroke: var(--accent);
    stroke-width: 13;
    stroke-linecap: butt;
    stroke-dasharray: var(--len);
    stroke-dashoffset: var(--len);
    transition: stroke-dashoffset 0.5s ease;
  }
  .fg-segment.active {
    stroke-dashoffset: 0;
  }
}
</style>
