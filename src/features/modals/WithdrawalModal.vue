<script setup lang="ts">
import UiInput from '@/shared/ui/UiInput.vue'
import UiButton from '@/shared/ui/UiButton.vue'
import SmallTonIcon from '@/shared/assets/icons/small-ton.svg'
</script>

<template>
  <div class="withdrawal-modal">
    <div class="inputs">
      <UiInput tip="TON wallet address" placeholder="Введите адрес" />
      <UiInput :custom="{
        type: 'max',
        maxValue: 8.9623,
      }" tip="TON" placeholder="Введите количество" />
    </div>
    <UiButton class="withdrawal-modal-button" color="blue">Вывести</UiButton>
    <div class="withdrawal-all-time">
      <span>Выведено за все время:</span>
      <span class="value">
        <SmallTonIcon /> <span>805</span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.withdrawal-modal-button {
  color: var(--font);
  margin-top: 20px;
}

.withdrawal-all-time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 300;
  margin-top: 5px;
  margin-top: 21px;

  .value {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
