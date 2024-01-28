<script setup lang="ts">
import UsersList from '~/components/auth/users/UsersList.vue'
import { UserRole } from '~/types/user'

useHead({
  title: 'Użytkownicy',
})

definePageMeta({
  layout: 'auth',
  name: 'Użytkownicy',
  middleware: ['user-role'],
  requiredRole: [UserRole.Admin],
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
