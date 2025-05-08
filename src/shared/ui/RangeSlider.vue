<script setup lang="ts">
import { ref, computed, watch, toRefs } from 'vue'
import VueSlider from 'vue-3-slider-component'

const props = defineProps({
  modelValue: { type: Number, required: true },
  color: { type: String, default: '#EDA400' },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  dotSize: { type: [Number, String], default: 27 },
  height: { type: String, default: '26px' },
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: number): void
}>()

// Внутренний стейт для двунаправленного биндинга
const internalValue = ref<number>(props.modelValue)

// Обновляем internalValue при внешнем изменении
watch(
  () => props.modelValue,
  (v) => {
    if (v !== internalValue.value) internalValue.value = v
  },
)

// Эмитим изменения наружу
watch(internalValue, (v) => emit('update:modelValue', v))

// Props через toRefs для реактивности
const { min, max, dotSize, height, color } = toRefs(props)

// CSS-переменная для цвета
const sliderVars = computed(() => ({
  '--slider-color': color.value,
}))

// Стили для VueSlider
const processStyle = computed(() => ({
  backgroundColor: color.value,
  borderRadius: '0',
}))
const railStyle = computed(() => ({
  backgroundColor: '#5B5E6D',
}))
const tooltipStyle = computed(() => ({
  backgroundColor: color.value,
  color: '#fff',
  borderRadius: '10px',
  fontWeight: 'bold',
  boxShadow: `0 0 6px ${color.value}99`,
  padding: '3px 12px',
}))
const dotStyle = computed(() => ({
  backgroundColor: '#fff',
  border: `4px solid ${color.value}`,
  boxShadow: `0 0 6px ${color.value}99`,
}))
</script>

<template>
  <div class="range-slider" :style="sliderVars">
    <div class="slider-inner">
      <VueSlider
        v-model="internalValue"
        :min="min"
        :max="max"
        tooltip="always"
        :process-style="processStyle"
        :rail-style="railStyle"
        :tooltip-style="tooltipStyle"
        :dot-style="dotStyle"
        :dot-size="dotSize"
        :contained="false"
        :height="height"
        class="slider"
      >
        <template #tooltip="{ value }">
          <div class="tooltip">
            <slot name="icon" />
            <span class="tooltip__value">{{ value }}</span>
          </div>
        </template>
      </VueSlider>
    </div>
  </div>
</template>

<style lang="scss">
.range-slider {
  .slider-inner {
    margin-top: 60px;
    background-color: #5b5e6d;
    padding-right: 17px;
    padding-left: 17px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 100px;

    .vue-slider-dot-tooltip {
      .tooltip {
        font-size: 14px;
        white-space: nowrap;
        min-width: 20px;
        text-align: center;
        border-color: #3498db;
        box-sizing: content-box;
        display: flex;
        gap: 3px;
        align-items: center;

        background-color: var(--slider-color);
        color: rgb(255, 255, 255);
        border-radius: 10px;
        font-weight: bold;
        box-shadow: none;
        padding: 5px 12px;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%);
          height: 0;
          width: 0;
          border-color: transparent;
          border-style: solid;
          border-width: 5px;

          border-top-color: var(--slider-color);
        }
      }
    }
  }
  .slider {
    padding: 0 !important;

    .vue-slider-process {
      &::before {
        content: '';
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: -13px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background-color: var(--slider-color);
      }
    }

    .vue-slider-dot-tooltip {
      pointer-events: none;

      .tooltip {
        display: flex;
        align-items: center;
        gap: 4px;
        position: relative;

        &__icon {
          width: 12px;
          height: 10px;
        }

        &__value {
          line-height: 1;
        }
      }
    }
  }
}
</style>
