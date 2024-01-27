<script setup lang="ts">
import UserForm from '~/components/auth/users/UserForm.vue'

useHead({
  title: 'Utwórz użytkownika',
})

definePageMeta({
  layout: 'auth',
  middleware: ['role:admin'],
  name: 'Utwórz użytkownika',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Utwórz użytkownika" subtitle="Wypełnij poniższy formularz, aby utworzyć nowego użytkownika" />
    <UserForm />
  </section>
</template>

<style scoped></style>
