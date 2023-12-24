<script setup lang="ts">
import MenuCardForm from '~/components/auth/menu-card/MenuCardForm.vue'

useHead({
  title: 'Utwórz kartę',
})

definePageMeta({
  layout: 'auth',
  // middleware: ['auth'], // todo uncomment this after auth is implemented
  name: 'Utwórz kartę',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Utwórz kartę" subtitle="Wypełnij poniższy formularz, aby utworzyć nową kartę menu" />

    <MenuCardForm />
  </section>
</template>

<style scoped></style>
