<script setup lang="ts">
defineProps<{
  price: number
}>()
</script>

<template>
  <div class="level-card">
    <div class="level-info">Стоимость:</div>
    <div class="level-reward">
      <img src="/icons/ton.svg" alt="TON" class="reward-icon" />
      {{ price }} TON
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.level-card {
  background-image: url('@/shared/assets/bg/level-card-bg.png');
  @include mixins.bg-cover;
  max-width: 100%;
  width: 100%;
  padding: 16px 10px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border: 1px solid #32315f;
  margin-bottom: 11px;
}

.level-info {
  color: #ffffff;
  font-weight: 400;
  font-size: 18px;
}

.level-reward {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #00d1ff;
  font-size: 16px;
  font-weight: 700;
}

.reward-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
