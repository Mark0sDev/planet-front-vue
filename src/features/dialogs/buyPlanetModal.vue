<script setup lang="ts">

import { defineProps, defineEmits, withDefaults } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDialog from '@/shared/ui/UiDialog.vue'

interface Props {
    modelValue: boolean
    text?: string
}

const props = withDefaults(defineProps<Props>(), {
    text: 'Вы точно хотите купить планету?'
})

const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void
    (e: 'confirm'): void
}>()

const close = () => emit('update:modelValue', false)
const confirm = () => {
    emit('confirm')
    close()
}
</script>

<template>
    <UiDialog :model-value="props.modelValue" @update:modelValue="emit('update:modelValue', $event)">
        <div class="buy-modal">
            <h2 class="modal-title title-1">Подтверждение</h2>
            <p class="modal-text">{{ props.text }}</p>
            <div class="button-group">
                <UiButton @click="close">Нет</UiButton>
                <UiButton @click="confirm" color="yellow">Да</UiButton>
            </div>
        </div>
    </UiDialog>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.buy-modal {
    background: #1e2237;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    max-width: 100%;
    width: 100%;
    border: 1px solid #32315f;
    @include mixins.bg-cover;
    background-image: url('@/shared/assets/bg/dialog-bg.jpg');
}

.modal-title {
    margin-bottom: 12px;
    font-size: 18px;
    color: white;
}

.modal-text {
    margin-bottom: 18px;
    font-size: 16px;
    color: white;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
