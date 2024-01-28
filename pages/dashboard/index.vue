<script setup lang="ts">
import DashboardPanel from '~/components/auth/dashboard/DashboardPanel.vue'

useHead({
  title: 'Dashboard',
})

definePageMeta({
  layout: 'auth',
  middleware: ['auth'],
  name: 'Dashboard',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Dashboard" subtitle="Zobacz statystyki swojej kuchnii" />
    <DashboardPanel />
  </section>
</template>
