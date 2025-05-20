<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import { user_id, tg } from '@/utils/telegramUser'
import { useI18n } from 'vue-i18n'
import { ref, reactive } from 'vue'
import axios from 'axios'

const { t } = useI18n()

const refferalLink = `https://t.me/CivilizationTon_bot/app?startapp=${user_id}`

const copied = ref(false)

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(refferalLink)
  copied.value = true
  setTimeout(() => copied.value = false, 500)
}

const formLoaders = reactive({
  getRefferalMsg: false,
})


async function getRefferalMessage() {
  formLoaders.getRefferalMsg = true
  try {
    const { data } = await axios.get('https://www.api-dev.dev/api/getRefferal?userId=' + user_id)


    tg.shareMessage(data.data.id);

  } catch (e) {
    formLoaders.getRefferalMsg = false
    alert(e);
    return
  } finally {
    formLoaders.getRefferalMsg = false
  }
}
</script>

<template>
  <div class="invite-friend-banner">
    <div class="banner-inner">
      <div v-html="t('refferal_text_banner')" class="invite-text" />

      <div class="banner-buttons">
        <UiButton :disabled="formLoaders.getRefferalMsg" @click="getRefferalMessage" class="invite-button">
          <template v-if="formLoaders.getRefferalMsg">
            <span class="spinner" />
          </template>
          <template v-else>
            {{ t('invite_btn_text') }}
          </template>
        </UiButton>

        <button @click="copyToClipboard" class="copy-button" :class="{ copied: copied }">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.332 5.33398H6.66536C5.92898 5.33398 5.33203 5.93094 5.33203 6.66732V13.334C5.33203 14.0704 5.92898 14.6673 6.66536 14.6673H13.332C14.0684 14.6673 14.6654 14.0704 14.6654 13.334V6.66732C14.6654 5.93094 14.0684 5.33398 13.332 5.33398Z"
              stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M2.66536 10.6673C1.93203 10.6673 1.33203 10.0673 1.33203 9.33398V2.66732C1.33203 1.93398 1.93203 1.33398 2.66536 1.33398H9.33203C10.0654 1.33398 10.6654 1.93398 10.6654 2.66732"
              stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.invite-friend-banner {
  width: 100%;
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/invite-friend-bg.jpg');
  border: 1px solid #32315f;
  flex: none;
  padding: 18px;
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
</style>
