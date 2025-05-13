<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import SmallTonIcon from '@/shared/assets/icons/ton-vector.svg'
import UiInput from '@/shared/ui/UiInput.vue'
</script>

<template>

    <div class="wallet-connect">

        <div class="withdrawal-modal">
            <div class="inputs">
                <UiInput tip="TON wallet address" placeholder="Введите адрес" />
                <UiInput :custom="{
                    type: 'max',
                    maxValue: 8.9623,
                }" tip="TON" type="number" step="0.1" min="0.1" placeholder="Введите количество" />
            </div>
            <UiButton class="withdrawal-modal-button" color="white">Вывести</UiButton>
            <div class="withdrawal-all-time">
                <span>Выведено за все время:</span>
                <div class="value">
                    <span>805</span>
                    <SmallTonIcon class="SmallTonIcon" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.value {
    display: flex;
    align-items: center;

    .SmallTonIcon {
        margin-left: 5px;
    }
}

.withdrawal-all-time {
    display: flex;

    justify-content: space-between;
    margin-top: 10px;
    align-items: center;
}

.wallet-connect {
    @include mixins.bg-cover;
    background-image: url('@/shared/assets/bg/wallet-connect-bg.jpg');
    border: 1px solid #32315f;
    padding: 12px;
    border-radius: 20px;
    flex: none;
    margin-bottom: 10px;

    p {
        font-weight: 300;

        span {
            color: #28aff9;
            font-weight: 500;
        }

        b {
            color: #f48d96;
        }
    }
}

.wallet-title {
    margin-bottom: 6px;
}

.wallet-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
}
</style>
