<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FAQBanner from '@/features/FAQBanner.vue'
import TabsSwitcher, { type TabItem } from '@/features/TabsSwitcher.vue'
import FAQCard from '@/entities/FAQCard.vue'
import { ETabsID } from '@/pages/FAQPage/types'

const { t } = useI18n()
const activeTab = ref<TabItem['id']>(ETabsID.GAME)

const tabs = computed<TabItem[]>(() => [
  { id: ETabsID.GAME, label: t('faq.game') },
  { id: ETabsID.BALANCE, label: t('faq.balance') },
  { id: ETabsID.REFS, label: t('faq.refs') },
])


const faqCards = computed(() => ({
  [ETabsID.GAME]: [
    {
      id: 1,
      title: t('faq.what_civilization'),
      text: t('faq.what_civilization_ans'),
    },
    {
      id: 2,
      title: t('faq.what_civilization3'),
      text: t('faq.what_civilization_ans3'),
    },
    {
      id: 3,
      title: t('faq.what_civilization2'),
      text: t('faq.what_civilization_ans2'),
    },
    {
      id: 4,
      title: t('faq.what_civilization4'),
      text: t('faq.what_civilization_ans4'),
    },
  ],
  [ETabsID.BALANCE]: [
    {
      id: 1,
      title: t('faq.balance1'),
      text: t('faq.balance_ans1'),
    },
    {
      id: 2,
      title: t('faq.balance2'),
      text: t('faq.balance_ans2'),
    },
    {
      id: 3,
      title: t('faq.balance3'),
      text: t('faq.balance_ans3'),
    },
  ],
  [ETabsID.REFS]: [
    {
      id: 1,
      title: t('faq.refferal1'),
      text: t('faq.refferal_ans1'),
    },
    {
      id: 2,
      title: t('faq.refferal2'),
      text: t('faq.refferal_ans2'),
    },
  ]
}))
</script>

<template>
  <div class="page faq-page">
    <FAQBanner />
    <TabsSwitcher :tabs="tabs" v-model="activeTab" />
    <FAQCard v-for="card in faqCards[activeTab as ETabsID]" :key="card.id" v-bind="card" />
  </div>
</template>

<style scoped lang="scss">
.faq-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
