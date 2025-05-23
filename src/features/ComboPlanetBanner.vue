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

    <div class="combo-text">Атакуй планеты и зарабатывай TON</div>
    <div class="card-div">
      <div class="statistics-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" stroke-width="0">
          <path fill="#fff"
            d="m21.161 7.22-7.846 12.494a1.058 1.058 0 0 1-1.794-.006L3.828 7.214A2.2 2.2 0 0 1 3.5 6.05a2.29 2.29 0 0 1 2.324-2.255h13.362c1.277 0 2.314 1.005 2.314 2.25 0 .412-.116.82-.339 1.175M5.718 6.8l5.723 8.826V5.912H6.316c-.592 0-.857.392-.598.89m7.84 8.826L19.283 6.8c.265-.497-.006-.89-.599-.89H13.56z">
          </path>
        </svg>
      </div>
      <div class="combo-accent">
        Начни всего с <span>1 TON</span>
      </div>
    </div>

    <UiButton class="combo-planet-button" @click="handleButtonClick" color="blue">
      НАЧАТЬ СЕЙЧАС
    </UiButton>
  </div>
</template>

<style scoped lang="scss">
.combo-planet-card {
  width: 100%;
  padding: 18px 14px;
  background: linear-gradient(135deg, #1e2237, #181b2d);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.decor {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.combo-text {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
}

.card-div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 4px;
}

.statistics-icon {
  background: #27aff9;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.combo-accent {
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;

  span {
    color: #27aff9;
    font-weight: 700;
  }
}

.combo-planet-button {
  color: #fff;
  font-weight: 600;
  width: 100%;
  border-radius: 12px;
  font-size: 14px;
  padding: 12px;
  background: linear-gradient(135deg, #30c5ff, #007bff);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
}
</style>
