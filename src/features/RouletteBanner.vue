<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'

import { useRouter } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'

const router = useRouter()
const handleButtonClick = () => {
  router.push(AppRoutes.ROULETTE)
}
</script>

<template>
  <div class="daily-draw-banner">
    <svg class="decor" width="236" height="126" viewBox="0 0 236 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_2265_5200)">
        <path
          d="M143.586 83.2565L185.036 46.488L94.1225 -55.9999L52.6728 -19.2314C32.1494 35.6736 176.067 -19.0642 143.586 83.2565Z"
          fill="#38B6FA" fill-opacity="0.8" />
      </g>
      <defs>
        <filter id="filter0_f_2265_5200" x="0.660156" y="-106" width="234.375" height="239.256"
          filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_2265_5200" />
        </filter>
      </defs>
    </svg>
    <div class="daily-draw-inner">
      <div class="content">
        <div class="title">Крути рулетку <span>Выигрывай</span> призы</div>
        <UiButton @click="handleButtonClick" class="green">Крутить</UiButton>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.green {
  background: #bdd756;
}

.daily-draw-banner {
  width: 100%;
  padding: 10px;
  background: rgba(30, 34, 55, 0.84);
  flex: none;
  border-radius: 12px;
  border: 1px solid #32315f;
  position: relative;
  overflow: hidden;

  .decor {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .bg-image {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 8px;

    span {
      color: #eda400;
    }
  }

  .content {
    max-width: 100%;
    width: 100%;
  }
}

.daily-draw-inner {
  display: flex;
  gap: 8px;
  position: relative;
  z-index: 10;
}

.banner-icon-wrapper,
.banner-icon {
  width: 84px;
  height: 84px;
}

.fade-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 84px;
  height: 84px;
}

.banner-icon-wrapper {
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  flex: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
