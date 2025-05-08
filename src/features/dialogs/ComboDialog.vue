<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import UiDialog from '@/shared/ui/UiDialog.vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

function closeDialog() {
  emit('update:modelValue', false)
}
</script>

<template>
  <UiDialog :model-value="props.modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div class="combo-dialog">
      <h2 class="title-1 combo-title">Комбо</h2>
      <div class="combo-cards">
        <img src="@/shared/assets/planets/combo-1.jpg" alt="" />
        <img src="@/shared/assets/planets/combo-2.jpg" alt="" />
        <img src="@/shared/assets/planets/combo-3.jpg" alt="" />
      </div>
      <UiButton @click="closeDialog" color="accent">Проверить комбо</UiButton>
    </div>
  </UiDialog>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.combo-dialog {
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/combo-bg.jpg');
  padding: 10px 24px;
  max-width: 100%;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #32315f;
}
.combo-title {
  margin-bottom: 12px;
  text-align: center;
}
.combo-cards {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  img {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #32315f;

    width: 100%;
  }
}
</style>
