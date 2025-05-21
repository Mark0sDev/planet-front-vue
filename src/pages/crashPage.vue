<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { type CrashRound, CrashService } from '@/features/crash/api/crashService'
import CrashChart from '@/features/crash/ui/CrashChart.vue'
import BetControls from '@/features/crash/ui/BetControls.vue'

const crashService = new CrashService()

const currentMultiplier = ref(1.0)
const betAmount = ref(0.1)
const isGame = ref(false)

function updateRound(round: CrashRound) {
    currentMultiplier.value = round.current
}

function handleCrash() {
    console.log('Crash at', currentMultiplier.value)
    setTimeout(() => {
        isGame.value = false
    }, 3000)
}

function placeBet() {
    crashService.startRound(3000)
    isGame.value = true
}

onMounted(() => {
    crashService.onUpdate(updateRound)
    crashService.onCrash(handleCrash)
})

onUnmounted(() => {
    crashService.stop()
})
</script>

<template>
    <div class="page crash-page">
        <div class="page-wrapper">
            <div class="title title-1">Crash</div>
            <div class="crash-wrapper">
                <CrashChart :status="isGame">
                    <div class="current-multiplier">x{{ currentMultiplier.toFixed(2) }}</div>
                </CrashChart>
                <BetControls v-model:amount="betAmount" @bet="placeBet" :status="isGame" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.crash-page {
    .current-multiplier {
        text-align: center;
        font-size: 24px;
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);
        font-weight: 900;
        color: var(--font);
    }

    .crash-wrapper {
        background: rgba(30, 34, 55, 0.5);
        border: 1px solid #32315f;
        backdrop-filter: blur(8px);
        margin-top: 24px;
        overflow: hidden;
        //padding: 16px;
        border-radius: 8px;
    }
}
</style>
