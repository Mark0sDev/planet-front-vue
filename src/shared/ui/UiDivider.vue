<script setup lang="ts">
interface UiDividerProps {
  value: string
}

defineProps<UiDividerProps>()
</script>

<template>
  <div class="ui-divider">
    <span class="ui-divider-line"></span>
    <span class="ui-divider-name">
      {{ value }}
    </span>
    <span class="ui-divider-line"></span>
  </div>
</template>

<style scoped lang="scss">
.ui-divider {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 15px;
  margin-top: 10px;

  .ui-divider-line {
    height: 1px;
    background: rgba(217, 217, 217, 0.3);
    max-width: 100%;
    width: 100%;
    border-radius: 2px;
  }

  span {
    font-size: 14px;
    font-weight: 300;
    position: relative;
    z-index: 10;
    white-space: nowrap;
  }
}
</style>
