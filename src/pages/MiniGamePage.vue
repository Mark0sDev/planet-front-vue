<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import SlotsIcon from '@/shared/assets/icons/slot-machine.svg'

import { useRouter } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'
const router = useRouter()

const spinRouter = () => {
    router.push(AppRoutes.ROULETTE)
}

const crashRouter = () => {
    router.push(AppRoutes.CRASH)
}
</script>


<template>
    <div class="page planets-page">
        <h2 class="title title-1">Мини-Игры</h2>
        <div style="margin-top: 0px;" class="planet-card">
            <div style="margin-bottom: 5px;" class="title title-1">Рулетка</div>
            <div class="card-body">
                <div class="card-image">
                    <SlotsIcon />
                </div>
                <div class="card-content">
                    <span class="title-1">Крути рулетку и выигрывай призы</span>
                </div>
            </div>
            <UiButton @click="spinRouter">Крутить рулетку</UiButton>
        </div>

        <div class="planet-card">
            <div style="margin-bottom: 0px;" class="title title-1">Краш Игра</div>
            <div class="card-body">
                <div class="card-image">
                    <img src="@/features/crash/assets/ezgif-7bb2f7089b2210.webp" alt="">
                </div>
                <div class="card-content">
                    <span class="title-1">Успей остановить НЛО и поймай коэффициент</span>
                </div>
            </div>
            <UiButton @click="crashRouter">Играть в краш</UiButton>
        </div>

        <div class="planet-card">
            <div style="margin-bottom: 5px;" class="title title-1">Coin-Flip (Орёл и Решка)</div>
            <div class="card-body">
                <div class="card-image">
                    <img src="/coin.png" alt="">
                </div>
                <div class="card-content">
                    <span class="title-1">Выбирай правильную сторону и получай выигрыш</span>
                </div>
            </div>
            <UiButton>Играть в Орёл и Решку</UiButton>
        </div>


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


.planet-card {
    padding: 10px;
    border: 1px solid #32315f;
    border-radius: 10px;

    margin-top: 10px;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-position: top right;
    background-image: url('@/shared/assets/bg/planet-card-bg.png');
}

.card-title {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--font);
}

.card-body {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
}

.card-content {
    span {
        font-size: 15px;
    }
}

.card-content {
    max-width: 100%;
    width: 100%;
}

.card-image {
    width: 96px;

    img {
        width: 100%;
    }
}

.card-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 5px;
    border-radius: 4px;

    &--accent {
        background-color: rgba(108, 234, 241, 0.54);

        span img {
            width: 14px;
            height: 14px;
        }
    }

    span {
        color: var(--font);
        line-height: 20px;

        &:last-child {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 1px;

            img {
                width: 18px;
                height: 18px;
            }
        }
    }
}
</style>
