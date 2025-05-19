<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="referral-info-banner">
    <div v-html="t('friends_banner')" class="info-box">

    </div>
  </div>
</template>

<style lang="scss">
@use '@/app/styles/mixins' as mixins;

.referral-info-banner {
  margin-top: 10px;
  flex: none;
  width: 100%;
  background-image: url('@/shared/assets/bg/referal-info-bg.jpg');
  border: 1px solid #32315f;
  @include mixins.bg-cover;
  padding: 18px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 10px;
}

.info-box {
  max-width: 276px;

  span {
    color: #27aff9;
  }
}

.info-title {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 7px;
}

.info-description {
  color: rgba(255, 255, 255, 0.7);
  max-width: 225px;
}
</style>
