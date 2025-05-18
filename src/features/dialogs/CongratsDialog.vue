<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDialog from '@/shared/ui/UiDialog.vue'

interface Props {
  modelValue: boolean
  text?: string
  imageSrc?: string
}
const props = withDefaults(defineProps<Props>(), {
  text: 'Вы успешно атаковали планету!',
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <UiDialog :model-value="props.modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div class="congrats-modal">
      <h2 class="modal-title title-1">Успешно!</h2>
      <img class="congrats-modal-image" v-if="imageSrc" :src="imageSrc" alt="" />
      <p class="modal-text" v-html="text"></p>
      <UiButton @click="close" color="accent" class="congrats-modal-btn"> Продолжить </UiButton>
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
}
</style>
