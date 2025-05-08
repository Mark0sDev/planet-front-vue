<script setup lang="ts">
import FAQBanner from '@/features/FAQBanner.vue'
import TabsSwitcher, { type TabItem } from '@/features/TabsSwitcher.vue'
import { ref } from 'vue'
import FAQCard from '@/entities/FAQCard.vue'
import { ETabsID } from '@/pages/FAQPage/types.ts'
import { faqCards, tabs } from '@/shared/mock/faq.ts'

const activeTab = ref<TabItem['id']>(ETabsID.GAME)
</script>

<template>
  <div class="page faq-page">
    <FAQBanner />
    <TabsSwitcher :tabs="tabs" v-model="activeTab" />
    <FAQCard
      v-for="card in faqCards[activeTab.valueOf() as ETabsID]"
      :key="card.id"
      v-bind="card"
    />
  </div>
</template>

<style scoped lang="scss">
.faq-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
