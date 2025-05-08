<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'

const router = useRouter()
const handleButtonClick = () => {
  router.push(AppRoutes.PLANETS)
}
</script>

<template>
  <div class="combo-planet-card">
    <svg
      class="decor"
      width="236"
      height="126"
      viewBox="0 0 236 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_2265_5200)">
        <path
          d="M143.586 83.2565L185.036 46.488L94.1225 -55.9999L52.6728 -19.2314C32.1494 35.6736 176.067 -19.0642 143.586 83.2565Z"
          fill="#38B6FA"
          fill-opacity="0.8"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_2265_5200"
          x="0.660156"
          y="-106"
          width="234.375"
          height="239.256"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_2265_5200" />
        </filter>
      </defs>
    </svg>
    <div class="bg-image">
      <img src="@/shared/assets/bg/combo-planet-bg.png" alt="" />
    </div>
    <div class="combo-text">Атакуй планеты и зарабатывай TON</div>

    <div class="combo-accent">
      <img src="@/shared/assets/currency/ton.webp" />
      Начни всего с <span>1 TON</span>
    </div>

    <UiButton class="combo-planet-button" @click="handleButtonClick" color="blue">
      НАЧАТЬ СЕЙЧАС
    </UiButton>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;
.combo-planet-card {
  width: 100%;
  padding: 10px;
  padding-top: 6px;
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
}

.combo-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--font);
  margin-bottom: 10px;
  margin-right: -10px;
  margin-left: -10px;
  padding: 0 10px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.11);
  position: relative;
  z-index: 10;
}

.combo-accent {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 14px;
  position: relative;
  z-index: 10;
  font-size: 16px;

  img {
    width: 31px;
    height: 31px;
  }

  span {
    color: #27aff9;
    font-weight: 500;
  }
}

.combo-planet-button {
  color: var(--font);
  position: relative;
  padding-left: 40px;
  padding-right: 40px;
  width: auto;
  z-index: 10;
}
</style>
