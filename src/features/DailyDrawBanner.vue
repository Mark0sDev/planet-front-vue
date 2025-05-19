<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'

import animation1 from '@/shared/assets/animations/deskcalendar-1.json'
import animation2 from '@/shared/assets/animations/deskcalendar-2.json'
import animation3 from '@/shared/assets/animations/lolpop-1.json'
import animation4 from '@/shared/assets/animations/lolpop-2.json'
import animation5 from '@/shared/assets/animations/bdaycandle-1.json'
import animation6 from '@/shared/assets/animations/bdaycandle-2.json'
import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'

const animations = [animation1, animation2, animation3, animation4, animation5, animation6]

const currentAnimation = ref(animations[0])
let intervalId: number | undefined

const rerenderAnimation = ref<number>(-1)

const showCongratsDialog = ref(false)

const handleButtonClick = () => {
  showCongratsDialog.value = true
}

onMounted(() => {
  let index = 0
  intervalId = setInterval(() => {
    rerenderAnimation.value++

    index = (index + 1) % animations.length
    currentAnimation.value = animations[index]
  }, 3000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
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
      <div class="banner-icon-wrapper">
        <transition name="fade">
          <div :key="rerenderAnimation" class="banner-icon fade-container">
            <lottie-player :src="currentAnimation" background="transparent" speed="1" autoplay />
          </div>
        </transition>
      </div>
      <div class="content">
        <div class="title">
          Розыгрыш <span>10 подарков</span><br />
          каждый день
        </div>
        <UiButton @click="handleButtonClick" color="yellow">Участвовать</UiButton>
      </div>
    </div>

    <CongratsDialog text="Вы приняли участие в розыгрыше" v-model="showCongratsDialog" />
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

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
    font-size: 16px;
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 8px;

    span {
      color: #eda400;
    }
  }

  .content {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
