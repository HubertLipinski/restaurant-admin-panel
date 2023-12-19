<script setup lang="ts">
import { useLazyAsyncData } from "#app"

definePageMeta({
  layout: 'auth',
  // middleware: ['auth'], // todo uncomment this after auth is implemented
  colorMode: 'light',
})

const route = useRoute()
const id = route.params.id

const { data: menu, pending } = await useLazyFetch(`/api/menus/${id}`)
</script>
s
<template>
  <div>
    <PageSkeleton v-if="pending" />
    <section v-else class="mt-2.5 py-2">
      <TheSectionHeader :title="'Karta menu - ' + menu.name" />
    </section>
  </div>
</template>

<style scoped>

</style>