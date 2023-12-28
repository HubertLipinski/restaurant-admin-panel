<script setup lang="ts">
import MenuCardList from '~/components/auth/menu-card/MenuCardList.vue'
useHead({
  title: 'Karty menu',
})

definePageMeta({
  layout: 'auth',
  name: 'Karty menu',
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Karty menu" subtitle="Tutaj możesz zarządać utworzonymi kartami menu.">
      <template #actions>
        <UButton label="Dodaj" size="md" icon="i-heroicons-document-plus" to="/menus/create" />
      </template>
    </TheSectionHeader>
    <menu-card-list />
  </section>
</template>

<style scoped></style>
