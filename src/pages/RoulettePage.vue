<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import gsap from 'gsap'

import UiButton from '@/shared/ui/UiButton.vue'
import SpinPriceCard from '@/entities/SpinPriceCard.vue'
import DailyDrawBanner from '@/features/DailyDrawBanner.vue'
import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'

import NftImage1 from '@/shared/assets/nfts/nft-1.webp'
import NftImage2 from '@/shared/assets/nfts/nft-2.webp'
import NftImage3 from '@/shared/assets/nfts/nft-3.webp'
import NftImage4 from '@/shared/assets/nfts/nft-4.webp'

const PASSES = 8 // «пустых» оборотов
const TOTAL_DURATION = 4500 // длительность спина, мс
const SLOW_PHASE_SLIDES = 5 // сколько слайдов едем медленно
const LOOPS_IN_DOM = 30 // длина ленты = 60 * 5 = 300 карт
const SLIDE_GAP = 10 // расстояние между карточками
const CARD_WIDTH = 140 // ширина карточки

interface Prize {
  id: number
  image: string
  title: string
}

const basePrizes: Prize[] = [
  { id: 1, image: NftImage1, title: 'CALENDAR' },
  { id: 2, image: NftImage2, title: 'HAPPY' },
  { id: 3, image: NftImage3, title: 'COIN' },
  { id: 4, image: NftImage4, title: 'ROCKET' },
]
const CYCLE = basePrizes.length

type PrizeExt = Prize & { uid: string }
const items = ref<PrizeExt[]>([])
for (let loop = 0; loop < LOOPS_IN_DOM; loop++) {
  items.value.push(
    ...basePrizes.map((p) => ({
      ...p,
      uid: `${loop}-${p.id}`,
    })),
  )
}

const trackRef = ref<HTMLDivElement | null>(null)
const windowRef = ref<HTMLDivElement | null>(null)
const cardRef = ref<HTMLDivElement | null>(null)

const slideStep = ref(0)
const centerOff = ref(0)

const curIndex = ref(0)

const isSpinning = ref(false)
const lootObj = ref<Prize>(basePrizes[0])
const showLoot = ref(false)

onMounted(() => {
  nextTick(() => {
    if (!cardRef.value || !windowRef.value || !trackRef.value) {
      console.log(cardRef.value, windowRef.value, trackRef.value)
      return
    }

    slideStep.value = CARD_WIDTH + SLIDE_GAP
    centerOff.value = windowRef.value.offsetWidth / 2 - CARD_WIDTH / 2 - 30

    curIndex.value = Math.floor(LOOPS_IN_DOM / 2) * CYCLE

    gsap.set(trackRef.value, { x: calcX(curIndex.value) })
  })
})

function calcX(index: number) {
  return centerOff.value - index * slideStep.value
}

interface SpinResponse {
  prize_id: number
}

async function spin() {
  if (isSpinning.value || !trackRef.value) return
  isSpinning.value = true

  let prizeId = 0
  try {
    const { data } = await axios.get<SpinResponse>('https://twinbyai.ru/spin')
    prizeId = data.prize_id
  } catch (err) {
    alert('[roulette] spin error' + err)
    isSpinning.value = false
    return
  }

  const winInCycle = basePrizes.findIndex((p) => p.id === prizeId)
  if (winInCycle === -1) {
    isSpinning.value = false
    return
  }
  lootObj.value = basePrizes[winInCycle]

  const deltaWithinCycle = (winInCycle - (curIndex.value % CYCLE) + CYCLE) % CYCLE
  const targetIndex = curIndex.value + PASSES * CYCLE + deltaWithinCycle
  const slowStart = targetIndex - SLOW_PHASE_SLIDES

  const fastDur = Math.round(TOTAL_DURATION * 0.65)
  const slowDur = TOTAL_DURATION - fastDur

  gsap
    .timeline()
    .to(trackRef.value, {
      // быстрая фаза
      x: calcX(slowStart),
      duration: fastDur / 1000,
      ease: 'linear',
    })
    .to(trackRef.value, {
      // замедление
      x: calcX(targetIndex),
      duration: slowDur / 1000,
      ease: 'power1.out',
      onComplete: () => {
        curIndex.value = targetIndex
        recenter()
        showLoot.value = true
        isSpinning.value = false
      },
    })
}

function recenter() {
  if (!trackRef.value) return
  const mod = curIndex.value % CYCLE
  curIndex.value = Math.floor(LOOPS_IN_DOM / 2) * CYCLE + mod
  gsap.set(trackRef.value, { x: calcX(curIndex.value) })
}
</script>

<template>
  <div class="page roulette-page">
    <!-- заголовок + баннер -->
    <div class="roulette-content">
      <h2 class="title title-1">Рулетка</h2>
      <DailyDrawBanner />
    </div>

    <div class="roulette-wrapper">
      <div class="roulette-marker" />

      <div class="roulette-window" ref="windowRef">
        <div class="roulette-track" ref="trackRef">
          <div v-for="p in items" :key="p.uid" class="card">
            <img :src="p.image" :alt="p.title" class="card-img" />
            <span class="card-title">{{ p.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="roulette-controls">
      <SpinPriceCard :price="0" />
      <UiButton class="spin-btn" :disabled="isSpinning" @click="spin">
        {{ isSpinning ? 'Крутим…' : 'Крутить' }}
      </UiButton>
    </div>

    <CongratsDialog :image-src="lootObj.image" :text="`Вы выиграли ${lootObj.title}`" v-model="showLoot" />

    <div style="visibility: hidden; position: absolute; pointer-events: none">
      <div ref="cardRef" class="card">
        <img :src="basePrizes[0].image" alt="" class="card-img" />
        <span class="card-title">{{ basePrizes[0].title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.roulette-content {
  padding: 0 16px;
}

.roulette-page {
  display: flex;
  justify-content: space-between;
  padding-right: 0;
  padding-left: 0;
}

.title {
  margin-bottom: 16px;
}

.roulette-wrapper {
  position: relative;
  max-width: 560px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  background: #0b0d23;
}

.roulette-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background: #fff;
  transform: translateX(-50%);
  z-index: 10;
}

.roulette-window {
  overflow: hidden;
  padding: 0 32px;
}

.roulette-track {
  display: flex;
}

.card {
  width: 140px;
  flex-shrink: 0;
  margin-right: 10px;
  background: #1e203d;
  border-radius: 10px;
  padding: 6px 6px 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-img {
  width: 128px;
  height: 128px;
  object-fit: contain;
  border-radius: 10px;
}

.card-title {
  margin-top: 4px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.roulette-controls {
  padding: 0 16px 16px;
}

.spin-btn {
  margin-left: auto;
}
</style>
