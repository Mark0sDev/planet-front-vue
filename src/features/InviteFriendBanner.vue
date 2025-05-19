<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import CopyButton from '@/shared/ui/CopyButton.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="invite-friend-banner">
    <div class="banner-inner">
      <div v-html="t('refferal_text_banner')" class="invite-text">

      </div>
      <div class="banner-buttons">
        <UiButton class="invite-button">{{ t('invite_btn_text') }}</UiButton>
        <CopyButton />
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
</style>
