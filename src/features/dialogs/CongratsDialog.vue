<script setup lang="ts">
import { computed } from 'vue'
import { defineProps, defineEmits, withDefaults } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDialog from '@/shared/ui/UiDialog.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

declare function show_8998929(): Promise<void>;
interface Props {
  modelValue: boolean
  textTemplate?: string
  textParams?: Record<string, string | number>
  imageSrc?: string
  showExtraButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  textTemplate: 'Действие выполнено успешно!',
  textParams: () => ({}),
  showExtraButton: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}

function adsClaim() {
  show_8998929();
  
  emit('update:modelValue', false)
}


const renderedText = computed(() => {
  return props.textTemplate.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const trimmedKey = key.trim()
    return props.textParams[trimmedKey]?.toString() ?? `{{${trimmedKey}}}`
  })
})
</script>

<template>
  <UiDialog :model-value="props.modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div class="congrats-modal">
      <h2 class="modal-title title-1">Успешно!</h2>
      <img class="congrats-modal-image" v-if="imageSrc" :src="imageSrc" alt="" />
      <p class="modal-text" v-html="renderedText"></p>
      <div class="button-group">
        <UiButton @click="close" color="accent" class="congrats-modal-btn">
          {{ t('congrats.continue') }}
        </UiButton>
        <UiButton v-if="props.showExtraButton" @click="adsClaim" color="yellow" class="congrats-modal-btn">
          {{ t('congrats.watchAd') }}
        </UiButton>

      </div>
    </div>
  </UiDialog>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.congrats-modal {
  background: #1e2237;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  max-width: 100%;
  width: 100%;
  border: 1px solid #32315f;
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/dialog-bg.jpg');

  .modal-title {
    margin-bottom: 6px;
  }

  .modal-text {
    margin-bottom: 18px;
  }

  .congrats-modal-image {
    width: 128px;
    height: 128px;
    border-radius: 10px;
    margin: 10px auto;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }
}
</style>
