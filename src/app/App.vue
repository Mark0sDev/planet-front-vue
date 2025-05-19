<script setup lang="ts">
import MainNavigation from '@/widgets/MainNavigation.vue'

import { onMounted, onBeforeUnmount, ref } from 'vue'

import { useMusic } from '@/utils/useMusic';

const { initMusic } = useMusic()
const isAllowed = ref(true);

function onGlobalTap(e: TouchEvent | MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('input, textarea, [contenteditable]')) {
    const active = document.activeElement as HTMLElement | null
    if (
      active &&
      (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)
    ) {
      active.blur()
    }
  }
}

const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#151729');
tg.disableVerticalSwipes();

if (tg.initDataUnsafe?.user?.id != 6967658199 && tg.initDataUnsafe?.user?.id != 7981172932 && tg.initDataUnsafe?.user?.id != 856873356) {
  if (location.hostname !== 'localhost') {
    isAllowed.value = false;
    tg.showAlert("user_id:" + tg.initDataUnsafe?.user?.id);
  }
}

function onHapticTap(e: MouseEvent | TouchEvent) {
  const target = e.target as HTMLElement
  if (target.closest('a, button')) {
    tg.HapticFeedback.impactOccurred('medium');
  }
}

onMounted(() => {
  document.addEventListener('click', onGlobalTap);
  document.addEventListener('click', onHapticTap);
  initMusic()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onGlobalTap);
  document.removeEventListener('click', onHapticTap);
})



</script>

<template>
  <div v-if="isAllowed" class="app-container">
    <RouterView />
    <MainNavigation />
  </div>
  <div>
    <h1 v-if="!isAllowed" style="text-align: center;">Dev App</h1>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
}
</style>
