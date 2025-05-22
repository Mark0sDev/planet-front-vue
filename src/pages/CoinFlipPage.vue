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
const lastFlipResult = ref<number>(1) // Храним последний результат

const startFlip = async () => {
  if (rotating.value || !coinEl.value) return

  rotating.value = true
  showResult.value = false

  // Сбрасываем монетку к последнему выпавшему результату без анимации
  coinEl.value.style.transition = 'none'
  coinEl.value.style.transform = `rotateX(${lastFlipResult.value === 1 ? 0 : 180}deg)`
  
  // Принудительное применение стилей
  await new Promise(requestAnimationFrame)
  
  const { data } = await axios.get('https://twinbyai.ru/flip')
  lastFlipResult.value = data.flip // Сохраняем новый результат

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
  <div class="page crash-page">
    <div class="page-wrapper">
      <div class="title title-1">Coin Flip</div>

      <div class="coin-wrapper">
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
                <span>Орел</span>
              </label>
              <label :class="{ selected: selectedSide === 2 }">
                <input type="radio" :value="2" v-model="selectedSide" />
                <img src="/src/shared/assets/coinFlip/coin-2.png" alt="Back" />
                <span>Решка</span>
              </label>
            </div>
          </div>
        </div>

        <UiButton color="yellow" @click="startFlip" :disabled="rotating">Крутить</UiButton>
      </div>
    </div>
    <CoinFlipDialog v-model="showResult" :text="modalText" :status="win ? 'win' : 'lose'" />
  </div>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 20px;
}
.coin-wrapper {
  background: rgba(18, 20, 30, 0.8);
  border: 1px solid #2a2e44;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-inline: auto;
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0%;
    left: 50%;
    width: 240px;
    height: 240px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 235, 255, 0.6) 0%, rgba(18, 20, 30, 0) 70%);
    z-index: 0;
    pointer-events: none;
    filter: blur(40px);
  }

  &::after {
    top: 30%;
    left: 70%;
    width: 120px;
    height: 120px;
  }
}

.coin {
  width: 164px;
  height: 164px;
  border-radius: 50%;
  position: relative;
  z-index: 10;
  transform-style: preserve-3d;
  margin-bottom: 28px;
  transition: transform 0s;
  box-shadow: 0 0 26px rgba(0, 0, 0, 0.5);
}

.coin::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: radial-gradient(rgba(255, 255, 255, 0.1), transparent 60%);
  z-index: -1;
}

.coin::before,
.coin::after {
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

.coin::before {
  background-image: url('/src/shared/assets/coinFlip/coin-1.png');
}

.coin::after {
  background-image: url('/src/shared/assets/coinFlip/coin-2.png');
  transform: rotateX(180deg);
}

.bet-block {
  width: 100%;
  background: linear-gradient(145deg, rgba(40, 44, 60, 0.6), rgba(25, 27, 40, 0.6));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  padding: 16px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: end;
  gap: 20px;
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
}

.bet-label {
  font-size: 13px;
  font-weight: 500;
  color: #aaa;
  margin-bottom: 6px;
}

.bet-row,
.choice-row {
  display: flex;
  flex-direction: column;
}

.choice-options {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.choice-options label {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: linear-gradient(145deg, #1d1f2b, #1a1c28);
  box-shadow:
    inset 2px 2px 4px rgba(0, 0, 0, 0.4),
    inset -2px -2px 4px rgba(255, 255, 255, 0.05),
    0 0 0 2px transparent;
  transition: 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover {
    transform: scale(1.08);
    border-color: rgba(255, 255, 255, 0.15);
  }

  &.selected {
    border: 1px solid var(--accent);
  }

  input {
    display: none;
  }

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4));
    pointer-events: none;
  }

  span {
    position: absolute;
    bottom: -20px;
    font-size: 13px;
    font-weight: 500;
    color: #aaa;
    display: none;
  }
}

.coin-bet-icon {
  width: 24px;
  height: 24px;
}
</style>
