<script setup lang="ts">
import WalletIcon from '@/shared/assets/icons/wallet.svg'
import UiButton from '@/shared/ui/UiButton.vue'

import { useTonWallet } from '@/utils/useTonWallet'

const { isWalletConnected, formattedAddress, onWalletClick } = useTonWallet()
</script>

<template>
  <div class="connect-wallet">
    <div class="wallet-info">
      <WalletIcon />
      Подключить <br />
      кошелек
    </div>
    <UiButton class="wallet-button" @click="onWalletClick" size="sm" color="accent"> {{ isWalletConnected ?
      formattedAddress : 'Connect Wallet'
      }}</UiButton>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.connect-wallet {
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/level-card-bg.png');
  border: 1px solid #32315f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 20px;

  .wallet-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
  }

  .wallet-button {
    display: inline-block;
    width: auto;
  }
}
</style>
