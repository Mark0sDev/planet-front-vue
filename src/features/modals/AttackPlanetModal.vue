<script setup lang="ts">
import { computed, ref } from 'vue'
import { defineEmits } from 'vue'

import TabsSwitcher, { type TabItem } from '@/features/TabsSwitcher.vue'
import UiButton from '@/shared/ui/UiButton.vue'
import RangeSlider from '@/shared/ui/RangeSlider.vue'
import PaymentIcon from '@/shared/ui/PaymentIcon.vue'

const emit = defineEmits<{
  (e: 'attack'): void
}>()

const value = ref(500)
const activeTab = ref<TabItem['id']>('stars')
const tabs: TabItem[] = [
  { id: 'stars', label: 'Звезды' },
  { id: 'ton', label: 'TON' },
]

const mainColor = computed(() => (activeTab.value === 'stars' ? '#EDA400' : '#00C2FF'))

function onAttack() {
  // просто уведомляем родителя, что «атака» подтверждена
  emit('attack')
}
</script>

<template>
  <div class="attack-planet">
    <TabsSwitcher :tabs="tabs" v-model="activeTab" centered />

    <RangeSlider v-model="value" :min="0" :max="1000" :color="mainColor">
      <template #icon>
        <PaymentIcon :isStars="activeTab === 'stars'" />
      </template>
    </RangeSlider>

    <p class="description">
      Выберите количество
      {{ activeTab === 'stars' ? 'звёзд' : 'TON' }}
      за которое вы готовы атаковать планету
    </p>

    <UiButton @click="onAttack" :color="activeTab === 'stars' ? 'yellow' : 'blue'" class="button">
      Атаковать
      <PaymentIcon :isStars="activeTab === 'stars'" />
      {{ value }}
    </UiButton>
  </div>
</template>
<style lang="scss">
.attack-planet {
  p {
    font-weight: 300;
    font-size: 16px;
    text-align: center;
    margin: 20px 0;
  }
  .button {
    color: #ffffff;
  }
}
</style>
