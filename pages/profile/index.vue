<script setup lang="ts">
import ProfileEdit from '~/components/auth/profile/ProfileEdit.vue'

useHead({
  title: 'Moje konto'
})

definePageMeta({
  layout: 'auth',
  name: 'Moje konto',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Moje konto" subtitle="Tutaj możesz zarządać swoimi danymi." />
    <ProfileEdit />
  </section>
</template>

<style scoped></style>
