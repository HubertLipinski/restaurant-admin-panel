<script setup lang="ts">

import UsersList from '~/components/auth/users/UsersList.vue'

useHead({
  title: 'Użytkownicy',
})

definePageMeta({
  layout: 'auth',
  middleware: ['role:admin'],
  name: 'Użytkownicy',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Użytkownicy" subtitle="Tutaj możesz zarządać użytkownikami.">
      <template #actions>
        <UButton label="Dodaj" size="md" icon="i-heroicons-document-plus" to="/users/create" />
      </template>
    </TheSectionHeader>
    <UsersList />
  </section>
</template>

<style scoped></style>
