<script setup lang="ts">

interface StatisticsCard {
  value: string
  text: string
  color: string
}

defineProps<StatisticsCard>()
</script>

<template>
  <div class="statistics-card">
    <div class="statistics-head">
      <div class="statistics-icon" :style="{ backgroundColor: color }">
        <slot></slot>
      </div>
   
    </div>
    <div class="statistics-value">{{ value }}</div>
    <div class="statistics-text">{{ text }}</div>
  </div>
</template>

<style lang="scss">
@use '@/app/styles/mixins' as mixins;

.statistics-card {
  padding: 10px;
  border-radius: 10px;
  background-image: url('@/shared/assets/bg/benefit-1-bg.png');
  @include mixins.bg-cover;
  border: 1px solid #32315f;
}

.statistics-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.statistics-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    path {
      stroke: var(--font);
    }
  }
}

.statistics-value {
  font-size: 16px;
  font-weight: 500;
}

.statistics-text {
  color: rgba(255, 255, 255, 0.7);
}
</style>
