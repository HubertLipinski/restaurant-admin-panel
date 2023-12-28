<script setup lang="ts">
import TableForm from '~/components/auth/table/TableForm.vue'

useHead({
  title: 'Utwórz stół',
})

definePageMeta({
  layout: 'auth',
  name: 'Utwórz stół',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Utwórz stół" subtitle="Wypełnij poniższy formularz, aby utworzyć nowy stół" />
  </section>
  <TableForm />
</template>

<style scoped></style>
