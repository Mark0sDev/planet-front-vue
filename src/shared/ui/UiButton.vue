<script setup lang="ts">
import { defineProps } from 'vue'

interface UiButtonProps {
  size?: 'md' | 'sm' | 'lg'
  color?: 'white' | 'yellow' | 'blue' | 'accent'
}
withDefaults(defineProps<UiButtonProps>(), {
  size: 'md',
  color: 'white',
})
</script>

<template>
  <button v-bind="$attrs" :class="['ui-button', size, color]">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.ui-button {
  width: 100%;
  padding: 12px;
  background: var(--font);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 13px;
  color: #000000;
  cursor: pointer;
  transition: transform 0.3s ease;

  &.sm {
    padding: 7px;
    border-radius: 4px;
  }
  &.yellow {
    background: #eda400;
  }
  &.blue {
    background: #27aff9;
  }
  &.accent {
    background: var(--accent);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.3);
  }
}
</style>
