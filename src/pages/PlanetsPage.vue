<script setup lang="ts">
import PlanetImage1 from '@/shared/assets/planets/planet-1/level-0.png'





import { ref, onBeforeUnmount } from 'vue'
import PlanetCard, { type Planet } from '@/entities/PlanetCard.vue'
import AttackScene, { type AttackSceneProps } from '@/widgets/PlanetPanel/AttackScene.vue'

import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'

const SCENE_DURATION_MS = 4_500
const DIALOG_DELAY_MS = 300

const showList = ref(true)
const sceneActive = ref(false)
const showCongratsDialog = ref(false)

const timerId = ref<ReturnType<typeof setTimeout> | null>(null)
const dialogTimerId = ref<ReturnType<typeof setTimeout> | null>(null)

const currentPlanet = ref<Pick<AttackSceneProps, 'currentLevel' | 'planetSrc'>>({
  currentLevel: -1,
})
const planetLevel = ref(-1)

const handlePlanetClick = ({ index, planet }: { index: number; planet: Planet }) => {
  if (sceneActive.value) return

  sceneActive.value = true
  showList.value = false

  currentPlanet.value = { currentLevel: index, planetSrc: planet.imageSrc }
  planetLevel.value = -1
  setTimeout(() => (planetLevel.value = index), 1_000)

  timerId.value = setTimeout(() => {
    showList.value = true
    sceneActive.value = false
  }, SCENE_DURATION_MS)

  dialogTimerId.value = setTimeout(
    () => (showCongratsDialog.value = true),
    SCENE_DURATION_MS + DIALOG_DELAY_MS,
  )
}

onBeforeUnmount(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  timerId.value && clearTimeout(timerId.value)
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  dialogTimerId.value && clearTimeout(dialogTimerId.value)
})

const planets: Planet[] = [
  {
    name: 'Меркурий',
    imageSrc: PlanetImage1,
    income: 1.1,
    cost: 0.6,
    cycleTime: 3,
    earned: 10,
  },
];
</script>

<template>
  <div class="page planets-page">
    <transition name="fade-slide" mode="out-in">
      <div v-if="showList" key="planets" class="content">
        <h2 class="title title-1">Планеты</h2>
        <div class="planets-list">
          <PlanetCard
            v-for="(planet, index) in planets"
            :key="planet.name"
            :index="index"
            :planet="planet"
            @action-clicked="handlePlanetClick"
          />
        </div>
      </div>

      <div v-else key="attack" class="attack-wrapper">
        <AttackScene :current-level="planetLevel" :planet-src="currentPlanet.planetSrc" />
      </div>
    </transition>
    <CongratsDialog v-model="showCongratsDialog" />
  </div>
</template>

<style scoped lang="scss">
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.attack-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

.title {
  margin-bottom: 10px;

  text-align: center;
}
.planets-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
