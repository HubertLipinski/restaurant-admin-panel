<script setup lang="ts">
import FormCreate from '~/components/auth/menu-card/FormCreate.vue'

useHead({
  title: 'Utwórz kartę',
})

definePageMeta({
  layout: 'auth',
  // middleware: ['auth'], // todo uncomment this after auth is implemented
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Utwórz kartę" subtitle="Wypełnij poniższy formularz, aby utworzyć nową kartę menu" />

    <FormCreate />
  </section>
</template>

<style scoped>

</style>