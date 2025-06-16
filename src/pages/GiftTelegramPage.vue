<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/utils/api'

import { initData, user_id } from '@/utils/telegramUser'
import { useI18n } from 'vue-i18n'
import PageLoader from './PageLoader.vue'

const { t } = useI18n()
declare function show_8998929(): Promise<void>

import UiButton from '@/shared/ui/UiButton.vue'
const adsTimer = ref('')

const loaderRef = ref<InstanceType<typeof PageLoader> | null>(null)

import { createCountdown } from '@/utils/useCountdown'
const adsCheckCount = ref(0)

const getUser = async () => {
    await loaderRef.value?.withLoader(async () => {
        const response = await api.post('/users/getUser', {
            initData,
            user_id
        })


        const data = response.data

        adsCheckCount.value = data.ads_check_count || 0
        const now = data.date
        const adsRawTime = data.check_ads_1

        if (adsRawTime && adsRawTime > now) {
            createCountdown(now, adsRawTime, (formatted) => {
                adsTimer.value = formatted
            })
        }

    })
}

const adsSuccess = () =>
    api.post('/users/adsSuccess', { initData, user_id })

async function adsClaim() {
    await show_8998929()
    const ads = await adsSuccess()
    const rawTime = ads.data.time
    const newTime = ads.data.new_date

    adsCheckCount.value += 1;

    createCountdown(rawTime, newTime, (formatted) => {
        adsTimer.value = formatted
    })
}

onMounted(() => {
    getUser()
})

</script>

<template>
    <PageLoader ref="loaderRef" />

    <div class="friends-page page">
        <h2 data-v-855317d5="" class="title title-1">Розыгрыш подарков</h2>
        <div class="invite-friend-banner">
            <div class="banner-inner">
                <div v-html="t('gift_banner_text')" class="invite-text" />

            </div>
        </div>

        <div class="referral-info-banner">
            <div class="info-box">
                <div v-html="t('gift_banner')"></div>
            </div>
        </div>

        <div class="daily-action-card balance-action-card">
            <div class="card-title">{{ t('tasks.tasks_ads2') }}</div>
            <div class="card-head">

                <div class="card-head-inner">

                    <div class="task-title" v-html="t('tasks.tasks_ads_desc')"></div>
                </div>
                <div class="card-head-inner">
                    <div style="font-size: 18px;" class="task-title">{{ adsCheckCount }}/20</div>
                </div>
            </div>
            <UiButton class="card-button yellow" @click="adsClaim" :disabled="!!adsTimer" size="sm">
                <template v-if="adsTimer">{{ adsTimer }}</template>
                <template v-else>{{ t('tasks.ads_button') }}</template>
            </UiButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.referral-info-banner {
    background-image: none;
}

.title-1 {
    margin-bottom: 12px;
}

.friends-title {
    text-align: center;
}



.friends-text {
    text-align: center;
    font-size: 16px;
}


.invite-friend-banner {
    width: 100%;

    background-image: url('/banner-gift.png');

    background-size: cover;
    background-repeat: no-repeat;
    border: 1px solid #32315f;
    flex: none;
    padding: 18px;
    height: 141px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.banner-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 100%;
    text-align: center;
}

.copy-button {
    background: rgba(30, 34, 55, 0.7);
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #32315f;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s;

    &.copied {
        animation: bounce 0.5s ease;
    }
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    30% {
        transform: translateY(-6px);
    }

    60% {
        transform: translateY(3px);
    }
}

.banner-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 100%;
    width: 100%;
}

.invite-button {
    font-size: 13px;
    font-weight: 500;
    border-radius: 8px;
    text-transform: uppercase;
}

.invite-text {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.1;

    span {
        color: #27aff9;
    }
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.info-box {
    max-width: 100%;
}

.info-title {
    margin-bottom: 0px;
}

.balance-action-card {
    width: 100%;
    border-radius: 15px;
    padding: 10px;
    padding-bottom: 2px;
    color: #ffffff;
    border: 1px solid #32315f;
    background-image: url('@/shared/assets/bg/benefit-2-bg.png');
}

.daily-action-card {
    width: 100%;
    padding: 16px;
    border-radius: 20px;
    margin-bottom: 12px;
    transition: background 0.3s;
    border: 1px solid #32315f;
}

.tasks-banner {
    flex: none;
    width: 100%;
    background-image: url('@/shared/assets/bg/tasks-banner-bg.jpg');
    border: 1px solid #32315f;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 18px;
    border-radius: 30px;
    overflow: hidden;
    margin-bottom: 10px;
    padding: 31px 22px;
}

.tasks-banner p {
    font-size: 12px;
    font-weight: 300;
}

.tasks-banner-inner {
    max-width: 214px;
}

.banner-title {
    margin-bottom: 6px;
}

.card-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

}

.card-icon {
    flex: none;
    width: 31px;
    height: 31px;
}

.card-title {
    font-size: 15px;
    font-weight: 500;
}

.task-title {
    font-size: 13px;
    margin-bottom: 8px;
    margin-top: 5px;
    font-weight: 500;
}
</style>
