<script setup lang="ts">
import MainNavigation from '@/widgets/MainNavigation.vue'


const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#151729');

</script>

<template>
  <div class="app-container">
    <RouterView />
    <MainNavigation />
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
