<script setup lang="ts">
import TableList from '~/components/auth/table/TableList.vue'

useHead({
  title: 'Stoły',
})

definePageMeta({
  layout: 'auth',
  name: 'Stoły',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Stoły" subtitle="Tutaj możesz zarządać swoimi stołami.">
      <template #actions>
        <UButton label="Dodaj" size="md" icon="i-heroicons-document-plus" to="/tables/create" />
      </template>
    </TheSectionHeader>
    <TableList />
  </section>
</template>

<style scoped></style>
