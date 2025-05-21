<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiInput from '@/shared/ui/UiInput.vue'
import TonIcon from '@/shared/assets/icons/ton.svg'

type Props = {
  amount: number
  status: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:amount', 'bet'])

const amount = ref(props.amount)

watch(amount, (val) => emit('update:amount', parseFloat(val.toFixed(2))))

function decrementAmount() {
  if (amount.value > 0.1) {
    amount.value = parseFloat((amount.value - 0.1).toFixed(2))
  }
}

function incrementAmount() {
  amount.value = parseFloat((amount.value + 0.1).toFixed(2))
}

function onInput(e: Event) {
  const inputValue = parseFloat((e.target as HTMLInputElement).value)
  if (inputValue >= 0.1) {
    amount.value = inputValue
  } else {
    ;(e.target as HTMLInputElement).value = amount.value.toFixed(2)
  }
}

function addAmount(value: number) {
  amount.value = parseFloat((amount.value + value).toFixed(2))
}
</script>

<template>
  <div class="bet-controls">
    <div class="bet-box">
      <div class="amount">
        <button @click="decrementAmount" :disabled="amount <= 0.1">-</button>

        <UiInput
          class="bet-input"
          size="sm"
          placeholder="0.1"
          @input="onInput"
          :value="amount.toFixed(2)"
          min="0.1"
          type="number"
          step="0.1"
          :custom="{ type: 'icon' }"
        >
          <div style="width: 20px; height: 20px">
            <TonIcon />
          </div>
        </UiInput>

        <button @click="incrementAmount">+</button>
      </div>

      <div class="add-buttons">
        <button @click="addAmount(0.1)">+0.1</button>
        <button @click="addAmount(0.5)">+0.5</button>
        <button @click="addAmount(1)">+1</button>
        <button @click="addAmount(10)">+10</button>
        <button @click="addAmount(100)">+100</button>
      </div>
    </div>

    <UiButton :disabled="status" color="yellow" @click="$emit('bet')"> Ставка </UiButton>
  </div>
</template>

<style lang="scss" scoped>
.bet-controls {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 0px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .add-buttons {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;

    button {
      padding: 4px 10px;
      border: 2px solid var(--accent);
      max-width: 100%;
      width: 100%;
      color: #ffffff;
      border-radius: 8px;
      background-color: rgb(41, 46, 77);
      font-weight: 700;
    }
  }
  .amount {
    display: flex;
    align-items: center;
    gap: 8px;
    button {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background-color: var(--accent);
      color: #0b0d23;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      flex: none;

      &:disabled {
        opacity: 0.4;
      }
    }
    .x-input {
      max-width: 70px;
      width: 100%;
      margin-left: 10px;
    }
    .bet-input {
      max-width: 100%;
      width: 100%;
      text-align: center;
    }
  }
  .place-btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
  }
}
</style>
