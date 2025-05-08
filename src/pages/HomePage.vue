<script setup lang="ts">
import MainDashboard from '@/widgets/MainDashboard.vue'
import MainStatistics from '@/widgets/MainStatistics.vue'
import LastWithdrawals from '@/widgets/LastWithdrawals.vue'
</script>

<template>
  <div class="home-page page">
    <img class="bg-decor ufo" src="@/shared/assets/bg/ufo.webp" alt="" />
    <img class="bg-decor meteor" src="@/shared/assets/bg/metheor.webp" alt="" />

    <div class="page-wrapper">
      <MainDashboard />
      <MainStatistics />
      <LastWithdrawals />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg-decor {
  position: absolute;

  &.ufo {
    top: -50px;
    left: -30%;
    animation: lift 1.2s ease-in-out infinite alternate;
  }
  &.meteor {
    top: 30%;
    left: -50px;
    animation: lift 1.6s ease-in-out infinite alternate;
  }
}

.page-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
}
</style>
