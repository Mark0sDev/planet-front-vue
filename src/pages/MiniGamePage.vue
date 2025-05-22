<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import SlotsIcon from '@/shared/assets/icons/slot-machine.svg'
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'

const router = useRouter()

const spinRouter = () => router.push(AppRoutes.ROULETTE)
const crashRouter = () => router.push(AppRoutes.CRASH)
const coinFlipRouter = () => router.push(AppRoutes.COIN_FLIP)
</script>

<template>
    <div class="page">
        <h2 class="title title-1">Мини-Игры</h2>

        <div class="game-card appear-delay-1">
            <div class="card-header">
                <h3>Рулетка</h3>
            </div>
            <div class="game-body">
                <SlotsIcon class="icon" />
                <p>Крути рулетку и выигрывай призы</p>
            </div>
            <UiButton @click="spinRouter">Крутить рулетку</UiButton>
        </div>

        <div class="game-card appear-delay-2">
            <div class="card-header">
                <h3>Краш Игра</h3>

            </div>
            <div class="game-body">
                <img src="@/features/crash/assets/ezgif-7bb2f7089b2210.webp" class="icon" />
                <p>Успей остановить НЛО и поймай коэффициент</p>
            </div>
            <UiButton @click="crashRouter">Играть в краш</UiButton>
        </div>

        <div class="game-card appear-delay-3">
            <div class="card-header">
                <h3>Coin-Flip (Орёл и Решка)</h3>

            </div>
            <div class="game-body">
                <img src="/coin.png" class="icon" />
                <p>Выбирай правильную сторону и получай выигрыш</p>
            </div>
            <UiButton @click="coinFlipRouter">Играть в Орёл и Решку</UiButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.title {
    margin-bottom: 10px;
    text-align: center;
}

.game-card {
    background: #1f1f35;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
    color: white;
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 32px rgba(0, 0, 0, 0.6);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        h3 {
            font-size: 18px;
            font-weight: 600;
        }

        .badges {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
        }
    }

    .game-body {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;

        p {
            font-size: 14px;
            line-height: 1.4;
        }
    }

    .icon {
        width: 56px;
        height: 56px;
        object-fit: contain;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 4px;
    }
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(16px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.appear-delay-1 {
    animation-delay: 0.2s;
}

.appear-delay-2 {
    animation-delay: 0.4s;
}

.appear-delay-3 {
    animation-delay: 0.6s;
}
</style>
