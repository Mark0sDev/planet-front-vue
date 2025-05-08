<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

defineOptions({ name: 'UiDialog' })

// Принимаем внешний v-model
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

// Локальное состояние для управления видимостью
const internalVisible = ref(props.modelValue)

// Следим за изменениями внешнего prop и обновляем внутреннее состояние
watch(
  () => props.modelValue,
  (val) => {
    internalVisible.value = val
  },
)

// При изменении внутреннего значения эмитим событие наверх
watch(internalVisible, (val) => {
  emit('update:modelValue', val)
})

// Функция закрытия вызывается по клику на overlay или из слота
function close() {
  internalVisible.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div v-if="internalVisible" class="dialog-overlay" @click.self="close" />
    </Transition>

    <Transition name="slide-up">
      <div v-if="internalVisible" class="dialog-wrapper">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dialog-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1001;
  pointer-events: none;
}

.dialog-wrapper > * {
  pointer-events: auto;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
.overlay-fade-enter-to,
.overlay-fade-leave-from {
  opacity: 1;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
