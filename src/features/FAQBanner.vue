<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="faq-banner">
    <h2 class="title title-1">FAQ</h2>
    <p v-html="t('faq.title_banner')" class="text">

    </p>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.faq-banner {
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/banner-bg.jpg');
  border-radius: 20px;
  border: 1px solid #32315f;
  padding: 31px 22px;

  .title {
    margin-bottom: 6px;
  }
}
</style>
