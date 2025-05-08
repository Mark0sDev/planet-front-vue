<script setup lang="ts">
defineProps<{
  title: string
  text: string
}>()
</script>

<template>
  <div class="faq-card">
    <div class="faq-card-title">{{ title }}</div>
    <div class="faq-card-text" v-html="text" />
  </div>
</template>

<style lang="scss">
@use '@/app/styles/mixins' as mixins;

.faq-card {
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/faq-item-bg.png');
  border-radius: 15px;
  border: 1px solid #32315f;
  padding: 10px;

  &-title {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 400;
  }
  &-text {
    p {
      color: rgba(255, 255, 255, 0.7);
    }
    p + p {
      margin-top: 6px;
    }
  }
}
</style>
