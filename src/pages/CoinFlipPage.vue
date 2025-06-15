<script setup lang="ts">
import { ref, onMounted } from 'vue'

import UiButton from '@/shared/ui/UiButton.vue'
import UiInput from '@/shared/ui/UiInput.vue'
import TonIcon from '@/shared/assets/icons/ton.svg'
import api from '@/utils/api'
import PageLoader from './PageLoader.vue'

import CoinFlipDialog from '@/features/dialogs/CoinFlipDialog.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import {
  initData,
  user_id,
} from '@/utils/telegramUser'

const rotating = ref(false)
const selectedSide = ref<number>(1)
const coinEl = ref<HTMLElement | null>(null)
const win = ref(false)
const showResult = ref(false)
const modalText = ref<string>('')

const lastFlipResult = ref<number>(1)
const bet = ref<string>('0.1')
const amountButtons = [0.1, 0.2, 0.5, 1, 2, 3]

const selectAmount = (value: number) => {
  bet.value = value.toString()
}

const loaderRef = ref<InstanceType<typeof PageLoader> | null>(null)
const balance_ton = ref<number>(0)
const formRef = ref<HTMLFormElement | null>(null)

const getUser = async () => {
  await loaderRef.value?.withLoader(async () => {
    const { data } = await api.post('/users/getUser', { initData, user_id })
    balance_ton.value = parseFloat(data.balance_ton || 0)
  })
}

const handleSubmit = () => {
  if (!formRef.value?.checkValidity()) {
    formRef.value?.reportValidity()
    return
  }

  startFlip()
}

const startFlip = async () => {
  if (rotating.value || !coinEl.value) return

  const betAmount = parseFloat(bet.value)

  if (betAmount < 0.1) {
    win.value = false
    showResult.value = true
    modalText.value = t('minigame.too_low_bet')
    return
  }

  rotating.value = true
  showResult.value = false

  coinEl.value.style.transition = 'none'
  coinEl.value.style.transform = `rotateX(${lastFlipResult.value === 1 ? 0 : 180}deg)`

  await new Promise(resolve => setTimeout(resolve, 50))

  const { data } = await api.post('/users/CoinFlip', {
    initData,
    user_id,
    bet: betAmount,
    side: selectedSide.value
  })

  if (data.status === 1) {
    balance_ton.value -= betAmount
    lastFlipResult.value = data.flip

    const fullSpins = 6
    const finalAngle = data.flip === 1 ? 0 : 180
    const targetRotation = fullSpins * 360 + finalAngle

    coinEl.value.style.transition = 'transform 2.5s ease-out'
    coinEl.value.style.transform = `rotateX(${targetRotation}deg)`

    setTimeout(() => {
      rotating.value = false
      win.value = data.flip === selectedSide.value
      showResult.value = true
      modalText.value = win.value ? t('minigame.win') : t('minigame.lose')
    }, 2600)
  } else {
    win.value = false
    showResult.value = true
    modalText.value = t('minigame.insufficient_balance')
    rotating.value = false
  }
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <PageLoader ref="loaderRef" />

  <div v-if="user_id == 6967658199" class="page coinflip-page">
    <h2 class="title title-1">{{ t('minigame.coint_flip_title') }}</h2>

    <div class="balance-action-card white">
      <div class="balance-head">
        <img class="balance-icon" src="/icons/ton.svg" />
        <div class="balance_content">
          <div>
            <div class="balance-amount">{{ t('minigame.title_balance') }}</div>
          </div>
          <div class="balance-info">
            <div class="balance-name">TON</div>
            <div class="balance-amount">{{ balance_ton }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="game-card">
      <div class="coin" ref="coinEl"></div>

      <form @submit.prevent="handleSubmit" ref="formRef" class="bet-block">
        <div class="bet-label">{{ t('minigame.bet_label') }}</div>

        <div class="amount-buttons">
          <button v-for="amount in amountButtons" :key="amount" :class="{ selected: bet === amount.toString() }"
            type="button" @click="selectAmount(amount)">
            {{ amount }}
            <TonIcon class="coin-bet-icon" />
          </button>
        </div>

        <UiInput required :placeholder="t('minigame.placeholder_bet')" min="0.1" step="0.1" type="number" v-model="bet"
          :custom="{ type: 'icon' }">
          <TonIcon class="coin-bet-icon" />
        </UiInput>

        <div class="choice-options">
          <label :class="{ selected: selectedSide === 1 }">
            <input type="radio" :value="1" v-model="selectedSide" />
            <img src="/src/shared/assets/coinFlip/coin-1.png" :alt="t('minigame.coin_front')" />
          </label>

          <label :class="{ selected: selectedSide === 2 }">
            <input type="radio" :value="2" v-model="selectedSide" />
            <img src="/src/shared/assets/coinFlip/coin-2.png" :alt="t('minigame.coin_back')" />
          </label>
        </div>

        <UiButton color="yellow" :disabled="rotating" type="submit">
          {{ t('minigame.spin_button') }}
        </UiButton>
      </form>
    </div>

    <CoinFlipDialog v-model="showResult" :text="modalText" :status="win ? 'win' : 'lose'" />
  </div>
</template>



<style scoped lang="scss">
.balance_content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.page {
  padding-bottom: 100px;
}

.white {
  margin-bottom: 15px;
}

.balance-head {
  border-bottom: none;
  margin-bottom: 0px;
}

.title {
  margin-bottom: 12px;
  text-align: center;
}

.game-card {
  background: #1e1d2e;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.coin {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin: 0 auto;
  transform-style: preserve-3d;
  transition: transform 0s;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent);
  border: 2px solid rgba(0, 255, 255, 0.25);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    top: 0;
    left: 0;
    backface-visibility: hidden;
  }

  &::before {
    background-image: url('/src/shared/assets/coinFlip/coin-1.png');
  }

  &::after {
    background-image: url('/src/shared/assets/coinFlip/coin-2.png');
    transform: rotateX(180deg);
  }
}

.bet-block {
  background: #2a2c45;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.bet-label {
  font-size: 14px;
  font-weight: 600;
  color: #ccc;
}

.amount-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;

  button {
    background: #1f2030;
    color: white;
    font-weight: 600;
    padding: 8px 14px;
    border-radius: 12px;
    border: 2px solid transparent;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      background: #27293d;
    }

    &.selected {
      background: #3a3d65;
      border-color: var(--accent, #00bcd4);
      transform: scale(1.05);
    }

    svg {
      height: 20px;
    }
  }
}

.choice-options {
  display: flex;
  justify-content: center;
  gap: 16px;

  label {
    width: 88px;
    height: 88px;
    border-radius: 14px;
    background: #25273a;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease;

    &.selected {
      border: 2px solid var(--accent, #00bcd4);
      transform: scale(1.08);
    }

    input {
      display: none;
    }

    img {
      width: 54px;
      height: 54px;
      pointer-events: none;
    }
  }
}

.coin-bet-icon {
  height: 20px;
}
</style>
