<script setup lang="ts">
import ComboPlanetCard from '@/features/ComboPlanetBanner.vue'
import UiButton from '@/shared/ui/UiButton.vue'
import LanguageSelect from '@/shared/ui/LanguageSelect.vue'
import FaqIcon from '@/shared/assets/icons/faq-icon.svg'
import TonIcon from '@/shared/assets/icons/ton.svg'

import { useRouter } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'
import RouletteBanner from '@/features/RouletteBanner.vue'
import DailyDrawBanner from '@/features/DailyDrawBanner.vue'

const router = useRouter()
const handleButtonClick = () => {
  router.push(AppRoutes.FAQ)
}
</script>

<template>
  <section class="dashboard">
    <div class="home-header">
      <button @click="handleButtonClick" class="faq-button"><FaqIcon /> FAQ</button>
      <UiButton class="home-header-button" size="sm" color="blue">
        <TonIcon />Connect Wallet
      </UiButton>
      <LanguageSelect />
    </div>
    <DailyDrawBanner />
    <RouletteBanner />
    <ComboPlanetCard />
  </section>
</template>

<style scoped lang="scss">
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  .home-header-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--font);
    text-align: center;
    border-radius: 10px;
  }

  .faq-button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 10px;
    font-size: 15px;
    font-weight: 500;
    color: var(--font);
    border-radius: 10px;
    border: 1px solid #32315f;
    background: rgba(30, 34, 55, 0.3);
  }
}

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Сетка для балансов */
.balances {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

/* Сетка для daily actions */
.daily-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

/* Стили для иконок валют */
.balance-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
