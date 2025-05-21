<script setup lang="ts">
import { ref } from 'vue'
import CopyIcon from '@/shared/assets/icons/copy.svg'
import CheckIcon from '@/shared/assets/icons/small-check.svg'
import TonIcon from '@/shared/assets/icons/mini-ton-vector.svg'

interface CustomInput {
  type: 'max' | 'copy' | 'icon'
  maxValue?: number
}

const props = defineProps<{
  tip?: string
  error?: string
  custom?: CustomInput
  modelValue?: string | number
}>()


const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isCopied = ref(false)

const handleMaxClick = () => {
  const v = props.custom?.maxValue?.toString() ?? ''
  emit('update:modelValue', v)

  if (inputRef.value) {
    inputRef.value.value = v
    inputRef.value.dispatchEvent(new Event('input'))
  }
}

const handleCopyClick = async () => {
  if (!inputRef.value) return

  const text = inputRef.value.value
  setTimeout(() => {
    inputRef.value?.select()
  }, 0)
  try {
    await navigator.clipboard.writeText(text)
    isCopied.value = true
    setTimeout(() => (isCopied.value = false), 1000)
  } catch (e) {
    console.log(e)
    inputRef.value.select()
    document.execCommand('copy')
    isCopied.value = true
    setTimeout(() => (isCopied.value = false), 1000)
  }
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="ui-input">
    <div v-if="tip" class="ui-input-tip">{{ tip }}</div>
    <div class="ui-input-wrapper">
      <input ref="inputRef" :value="modelValue" @input="onInput" v-bind="$attrs" />

      <div class="ui-input-custom">
        <button v-if="custom?.type === 'max'" @click.stop.prevent="handleMaxClick" class="max-value">
          <TonIcon />
          MAX
        </button>

        <button v-if="custom?.type === 'copy'" :disabled="isCopied" @click="handleCopyClick" class="copy">
          <template v-if="isCopied">
            <CheckIcon />
          </template>
          <template v-else>
            <CopyIcon />
          </template>
        </button>
        <div v-if="custom?.type === 'icon'">
          <slot />
        </div>
      </div>
    </div>

    <div v-if="custom?.type === 'max'" class="max-value-available">
      <span>Доступно:</span>
      <span>{{ custom?.maxValue || 0 }}</span>
    </div>

    <div v-if="error" class="ui-input-error">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
.ui-input {
  padding: 5px;

  &-tip {
    font-weight: 400;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 7px;
  }

  &-wrapper {
    max-width: 100%;
    width: 100%;
    position: relative;
  }

  &-error {
    font-weight: 300;
    font-size: 14px;
    color: #f48d96;
    margin-top: 5px;
    text-align: center;
  }

  &-custom {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;

    .copy {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .max-value {
      color: white;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .max-value-available {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 300;
    margin-top: 5px;
  }

  input {
    border-radius: 8px;
    max-width: 100%;
    width: 100%;
    padding: 12px 10px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 13px;
    font-weight: 400;
    border: 1px solid #32315f;
    outline: none;
    color: var(--font);
    padding-right: 40px;

    &:focus {
      border: 1px solid var(--accent);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.44);
    }
  }
}
</style>
