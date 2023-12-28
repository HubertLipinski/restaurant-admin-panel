<script setup lang="ts">
import DishList from '~/components/auth/dish/DishList.vue'

useHead({
  title: 'Potrawy',
})

definePageMeta({
  layout: 'auth',
  name: 'Potrawy',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Potrawy" subtitle="Tutaj możesz zarządać utworzonymi potrawami.">
      <template #actions>
        <UButton label="Dodaj" size="md" icon="i-heroicons-document-plus" to="/dishes/create" />
      </template>
    </TheSectionHeader>
    <DishList />
  </section>
</template>

<style scoped></style>
