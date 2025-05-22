<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import UiButton from '@/shared/ui/UiButton.vue'
import UiInput from '@/shared/ui/UiInput.vue'
import TonIcon from '@/shared/assets/icons/ton.svg'
import CoinFlipDialog from '@/features/dialogs/CoinFlipDialog.vue'

const rotating = ref(false)
const selectedSide = ref<number>(1)
const coinEl = ref<HTMLElement | null>(null)
const win = ref(false)
const showResult = ref(false)
const modalText = ref<string>('')
const lastFlipResult = ref<number>(1)

const startFlip = async () => {
  if (rotating.value || !coinEl.value) return

  rotating.value = true
  showResult.value = false

  coinEl.value.style.transition = 'none'
  coinEl.value.style.transform = `rotateX(${lastFlipResult.value === 1 ? 0 : 180}deg)`

  await new Promise(resolve => setTimeout(resolve, 50))

  const { data } = await axios.get('https://twinbyai.ru/flip')
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
    modalText.value = win.value ? 'Вы выиграли!' : 'Увы, не повезло...'
  }, 2600)
}
</script>

<template>
  <div class="page coinflip-page">
    <h2 class="title title-1">Мини-Игры</h2>
    <div class="game-card">
      <div class="card-header">
        <h3>Выбор стороны</h3>

      </div>

      <div class="coin" ref="coinEl"></div>

      <div class="bet-block">
        <div class="bet-row">
          <span class="bet-label">Ваша ставка:</span>
          <UiInput placeholder="Ставка" value="0.1" :custom="{ type: 'icon' }">
            <TonIcon class="coin-bet-icon" />
          </UiInput>
        </div>

        <div class="choice-row">
          <div class="choice-options">
            <label :class="{ selected: selectedSide === 1 }">
              <input type="radio" :value="1" v-model="selectedSide" />
              <img src="/src/shared/assets/coinFlip/coin-1.png" alt="Front" />

            </label>
            <label :class="{ selected: selectedSide === 2 }">
              <input type="radio" :value="2" v-model="selectedSide" />
              <img src="/src/shared/assets/coinFlip/coin-2.png" alt="Back" />

            </label>
          </div>
        </div>

        <UiButton color="yellow" @click="startFlip" :disabled="rotating">
          Крутить
        </UiButton>
      </div>
    </div>

    <CoinFlipDialog v-model="showResult" :text="modalText" :status="win ? 'win' : 'lose'" />
  </div>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 10px;
  text-align: center;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.game-card {
  background: #1f1f35;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 18px;
    font-weight: 600;
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  line-height: 1;
  color: white;
  background: linear-gradient(135deg, #ff6ec4, #7873f5);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.coin {
  width: 164px;
  height: 164px;
  border-radius: 50%;
  position: relative;
  z-index: 10;
  transform-style: preserve-3d;
  margin: 0 auto;
  transition: transform 0s;
  box-shadow: 0 0 32px rgba(0, 255, 255, 0.2);
  border: 2px solid rgba(0, 255, 255, 0.3);
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05), transparent);

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    backface-visibility: hidden;
    background-size: cover;
    background-position: center;
    top: 0;
    left: 0;
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
  background: linear-gradient(145deg, rgba(40, 44, 60, 0.6), rgba(25, 27, 40, 0.6));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  padding: 16px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.02);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bet-label {
  font-size: 13px;
  font-weight: 500;
  color: #aaa;
  margin-bottom: 6px;
}

.choice-options {
  display: flex;
  justify-content: center;
  gap: 12px;

  label {
    width: 88px;
    height: 88px;
    border-radius: 12px;
    background: linear-gradient(145deg, #1d1f2b, #1a1c28);
    box-shadow:
      inset 2px 2px 4px rgba(0, 0, 0, 0.4),
      inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: 0.3s ease;

    &.selected {
      border: 2px solid var(--accent);
      transform: scale(1.08);
    }

    input {
      display: none;
    }

    img {
      width: 54px;
      height: 54px;
      object-fit: contain;
      pointer-events: none;
      filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4));
    }

    span {
      position: absolute;
      bottom: -18px;
      font-size: 12px;
      color: #aaa;
    }
  }
}

.coin-bet-icon {
  width: 24px;
  height: 24px;
}
</style>
