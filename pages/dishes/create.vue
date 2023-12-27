<script setup lang="ts">
import DishForm from '~/components/auth/dish/DishForm.vue'

useHead({
  title: 'Utwórz potrawę',
})

definePageMeta({
  layout: 'auth',
  // middleware: ['auth'], // todo uncomment this after auth is implemented
  name: 'Utwórz potrawę',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Utwórz potrawę" subtitle="Wypełnij poniższy formularz, aby utworzyć nową potrawę" />
    <DishForm />
  </section>
</template>

<style scoped></style>
