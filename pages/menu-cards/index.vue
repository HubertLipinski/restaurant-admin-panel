<script setup lang="ts">
import MenuCardList from '~/components/auth/menu-card/MenuCardList.vue'
definePageMeta({
  layout: 'auth',
  // middleware: ['auth'],
  colorMode: 'light',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Karty menu" subtitle="Tutaj możesz zarządać utworzonymi kartami menu." />
    <menu-card-list />
  </section>
</template>

<style scoped>

</style>
