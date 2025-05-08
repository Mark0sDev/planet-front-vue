<script setup lang="ts">
import { ref } from 'vue'

import UiButton from '@/shared/ui/UiButton.vue'
import UiModal from '@/shared/ui/UiModal.vue'
import AttackPlanetModal from '@/features/modals/AttackPlanetModal.vue'
import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'

import PlanetImage1 from '@/shared/assets/planets/planet-1/level-0.png'
import PlanetImage2 from '@/shared/assets/planets/planet-2/level-0.png'
import PlanetImage3 from '@/shared/assets/planets/planet-3/level-0.png'
import PlanetImage4 from '@/shared/assets/planets/planet-4/level-0.png'
import PlanetImage5 from '@/shared/assets/planets/planet-5/level-0.png'
import PlanetImage6 from '@/shared/assets/planets/planet-6/level-0.png'
import PlanetImage7 from '@/shared/assets/planets/planet-7/level-0.png'
import PlanetImage8 from '@/shared/assets/planets/planet-8/level-0.png'
import PlanetImage9 from '@/shared/assets/planets/planet-9/level-0.png'
import PlanetImage10 from '@/shared/assets/planets/planet-10/level-0.png'

const planets = [
  PlanetImage1,
  PlanetImage2,
  PlanetImage3,
  PlanetImage4,
  PlanetImage5,
  PlanetImage6,
  PlanetImage7,
  PlanetImage8,
  PlanetImage9,
  PlanetImage10,
]

import UfoImage from '@/shared/assets/bg/ufo.webp'
import AttackScene from '@/widgets/PlanetPanel/AttackScene.vue'

const showAttackModal = ref(false)
const showCongrats = ref(false)

const currentLevel = ref<number>(0)
const rerenderAttackScene = ref<number>(0)

const maxLevel = 10

function onOpenAttack() {
  showAttackModal.value = true
}

function onAttackConfirmed() {
  showAttackModal.value = false
  currentLevel.value++
  setTimeout(() => {
    showCongrats.value = true
    rerenderAttackScene.value++
  }, 3000)
}

const fixedPoints = [
  { x: 0.7, y: 0.8 },
  { x: 0.85, y: 0.42, rotation: 120 },
  { x: 0.22, y: 0.7, size: 0.8 },
  { x: 0.25, y: 0.3 },
  { x: 0.6, y: 0.18 },
  { x: 0.45, y: 0.5 },
]
</script>
<template>
  <section class="planet-panel">
    <AttackScene
      :current-level="currentLevel"
      :fixed-points="fixedPoints"
      :planet-src="planets[rerenderAttackScene]"
      :ufo-src="UfoImage"
      :key="rerenderAttackScene"
    />
    <div class="level-card">
      <div class="level-info">
        <img
          src="../../shared/assets/planets/planet-1.png"
          alt="Мини-планета"
          class="level-thumb"
        />
        <div class="level-texts">
          <div class="level-title">Уровень {{ currentLevel + 1 }}</div>
          <div class="level-progress">Осталось: {{ maxLevel - currentLevel }}/{{ maxLevel }}</div>
        </div>
      </div>

      <div class="level-reward">
        +100
        <img src="../../shared/assets/currency/ton.webp" alt="TON" class="reward-icon" />
      </div>
    </div>

    <UiButton :disabled="maxLevel === currentLevel + 1" @click="onOpenAttack">АТАКОВАТЬ!</UiButton>
    <UiModal v-model="showAttackModal" title="Атаковать планету">
      <AttackPlanetModal @attack="onAttackConfirmed" />
    </UiModal>

    <CongratsDialog v-model="showCongrats" />
  </section>
</template>

<style scoped lang="scss">
.planet-panel {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
}

.planet-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Карточка уровня */
.level-card {
  background-image: url('@/shared/assets/bg/level-card-bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  max-width: 100%;
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 60px;
  position: relative;
  border: 1px solid #32315f;
  margin-top: 0px;
}

.level-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.level-thumb {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  object-fit: cover;
  border-radius: 50%;
}

.level-texts {
  display: flex;
  flex-direction: column;
}

.level-title {
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 3px;
}

.level-progress {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-weight: 500;
}

/* Награда */
.level-reward {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #00d1ff;
  font-size: 16px;
  font-weight: 700;
}

/* Иконка валюты */
.reward-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
