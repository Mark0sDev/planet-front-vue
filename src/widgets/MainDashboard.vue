<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'

import { useTonWallet } from '@/utils/useTonWallet'

import { useMusic } from '@/utils/useMusic'

import ComboPlanetCard from '@/features/ComboPlanetBanner.vue'

import DailyDrawBanner from '@/features/DailyDrawBanner.vue'
import UiButton from '@/shared/ui/UiButton.vue'
import LanguageSelect from '@/shared/ui/LanguageSelect.vue'


import MuteIcon from '@/shared/assets/icons/volume-off.svg'
import NoMute from '@/shared/assets/icons/volume-on.svg'

const { isMuted, toggleMusic } = useMusic()

import FaqIcon from '@/shared/assets/icons/faq-icon.svg'
import TonIcon from '@/shared/assets/icons/ton.svg'

const router = useRouter()

const { isWalletConnected, formattedAddress, onWalletClick } = useTonWallet()

const handleButtonClick = () => {
  router.push(AppRoutes.FAQ)
}
</script>

<template>
  <section class="dashboard">
    <div class="home-header">
      <button @click="handleButtonClick" class="faq-button">
        <FaqIcon /> FAQ
      </button>

      <button @click="toggleMusic" class="faq-button">
        <component :is="isMuted ? MuteIcon : NoMute" />
      </button>

      <UiButton class="home-header-button" size="sm" color="blue" @click="onWalletClick">
        <TonIcon />
        {{ isWalletConnected ? formattedAddress : 'Connect' }}
      </UiButton>

      <LanguageSelect />

    </div>

    <DailyDrawBanner />

    <ComboPlanetCard />
  </section>
</template>

<style scoped lang="scss">
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;

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

.balances {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

.daily-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

.balance-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
