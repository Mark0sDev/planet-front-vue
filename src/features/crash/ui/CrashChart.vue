<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import LineIcon from '../assets/line.svg'
import type { VueInstance } from '@vueuse/core'

const props = defineProps<{ status: boolean }>()

// ссылка на DOM-обёртку
const wrapper = ref<HTMLElement | null>(null)
const lineComp = ref<VueInstance | null>(null)

const finalLinePos = ref({ top: 0, left: 0 })
const ufoPos = ref({ top: 200, left: -999 })

// Флаг для запуска «покачивания» НЛО
const ufoBob = ref(false)

// Массив звёзд
interface Star {
  id: number
  top: number
  left: number
  size: number
  opacity: number
  duration: number
  delay: number
}
const stars = ref<Star[]>([])

function getRelativePosition(el: HTMLElement, parent: HTMLElement) {
  const e = el.getBoundingClientRect()
  const p = parent.getBoundingClientRect()
  const style = getComputedStyle(parent)
  const padL = parseFloat(style.paddingLeft)
  const padT = parseFloat(style.paddingTop)
  const bL = parseFloat(style.borderLeftWidth)
  const bT = parseFloat(style.borderTopWidth)
  return {
    top: e.top - p.top - padT - bT,
    left: e.right - p.left - padL - bL,
  }
}

async function precomputeLine() {
  await nextTick()
  if (!wrapper.value || !lineComp.value) return

  const lineEl = lineComp.value.$el as HTMLElement
  if (!lineEl) return

  // временно без анимации, чтобы вычислить финальную позицию
  lineEl.style.transition = 'none'
  lineEl.style.opacity = '0'
  lineEl.classList.add('show')
  await nextTick()
  finalLinePos.value = getRelativePosition(lineEl, wrapper.value)

  // возвращаем как было
  lineEl.classList.remove('show')
  lineEl.style.opacity = ''
  await nextTick(() => {
    lineEl.style.transition = 'all 1s'
  })
}

onMounted(precomputeLine)

watch(
  () => props.status,
  async (show) => {
    // сбрасываем поле
    stars.value = []
    ufoBob.value = false

    if (show && wrapper.value && lineComp.value) {
      const lineEl = lineComp.value.$el as HTMLElement

      // стартовая позиция НЛО
      const wr = wrapper.value.getBoundingClientRect()
      ufoPos.value = {
        top: wr.bottom - wr.top - 50,
        left: 0,
      }

      // растём линия
      ufoPos.value = finalLinePos.value
      await nextTick()
      lineEl.classList.add('show')

      // перемещаем НЛО в конец линии

      // спустя 3 секунды запускаем и звёзды, и «покачивание» НЛО
      setTimeout(() => {
        if (!wrapper.value) return

        // генерируем звёзды
        const w = wrapper.value.clientWidth
        const h = wrapper.value.clientHeight
        const count = 30
        stars.value = Array.from({ length: count }, (_, i) => ({
          id: i,
          left: Math.random() * w * 2,
          top: Math.random() * h,
          size: 2 + Math.random() * 6, // 2–8px
          opacity: 0.3 + Math.random() * 0.7, // 0.3–1.0
          duration: 4 + Math.random() * 6, // 4–10s
          delay: Math.random() * 3, // 0–3s задержки
        }))

        // запускаем «покачивание» НЛО
        ufoBob.value = true
      }, 1000)
    } else {
      // сброс при закрытии
      lineComp.value?.$el.classList.remove('show')
      ufoPos.value = { top: 200, left: -999 }
      ufoBob.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <img
    class="ufo"
    :class="{ show: props.status, bob: ufoBob }"
    src="../assets/ezgif-7bb2f7089b2210.webp"
    alt="ufo"
    :style="{ top: `${ufoPos.top - 50}px`, left: `${ufoPos.left - 60}px` }"
  />
  <div class="chart-wrapper" ref="wrapper">
    <div :class="['start-view', { show: status }]">
      Поставь ставку и поймай <br /><span>большой</span> коэффициент
    </div>
    <div :class="['rule', 'rule-x', { show: status }]"></div>
    <div :class="['rule', 'rule-y', { show: status }]"></div>
    <LineIcon ref="lineComp" class="line" />
    <div :class="['x-wrapper', { show: status }]">
      <slot />
    </div>
    <div class="stars">
      <svg
        v-for="star in stars"
        :key="star.id"
        class="star"
        :style="{
          top: star.top + 'px',
          left: star.left + 'px',
          width: star.size + 'px',
          height: star.size + 'px',
          opacity: star.opacity,
          animationDuration: star.duration + 's',
          animationDelay: star.delay + 's',
        }"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9" fill="white" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  height: 200px;
  position: relative;

  .line {
    opacity: 1;
    transition: all 1s;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 0;
    margin: 10px;

    &.show {
      width: 80%;
      height: auto;
    }
  }
}

.start-view {
  opacity: 1;
  transition: all 0.5s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px 0;
  border-top: 2px solid var(--accent);
  border-bottom: 2px solid var(--accent);
  right: 0;
  left: 0;
  text-align: center;
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
  span {
    color: var(--accent);
  }

  &.show {
    opacity: 0;
    padding: 100px 0;
  }
}

.x-wrapper {
  opacity: 0;
  transition: all 0.3s;

  &.show {
    opacity: 1;
  }
}

.rule {
  opacity: 0;
  transition: all 0.3s;
  &.show {
    opacity: 0.6;
  }
}

.rule-y {
  position: absolute;
  bottom: -0px;
  left: 0px;
  width: 10px;
  height: 100%;
  background-image: url('@/shared/assets/icons/rule.svg');
  background-repeat: repeat-y;
  animation: scroll-rule 3s linear infinite;
  border-right: 1px solid #1c254a;
}

.rule-x {
  position: absolute;
  bottom: -0px;
  left: -20px;
  width: 100%;
  height: 10px;
  background-image: url('@/shared/assets/icons/rule-x.svg');
  animation: scroll-rule-x 3s linear infinite;
  border-top: 1px solid #1c254a;
  background-repeat: repeat-x;
  background-position-y: 3px;
  transition: all 0.3s;
  &.show {
    left: 10px;
  }
}

.ufo {
  position: absolute;
  opacity: 0;
  transition: all 2s ease-out;
  z-index: 10;
  width: 120px;

  &.show {
    opacity: 1;
  }

  /* «Покачивание» вверх-вниз */
  &.bob {
    animation: ufo-bob 4s ease-in-out infinite;
  }
}

/* Анимация звёзд */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .star {
    position: absolute;
    animation-name: fly-left;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}

@keyframes fly-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-120vw);
  }
}

@keyframes ufo-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes scroll-rule {
  0% {
    background-position-y: 0;
  }
  100% {
    background-position-y: 100%;
  }
}
@keyframes scroll-rule-x {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 100%;
  }
}
</style>
