<script setup lang="ts">

definePageMeta({
  layout: 'auth',
  // middleware: ['auth'], // todo uncomment this after auth is implemented
})

const route = useRoute()
const id = route.params.id

const { data: menu, pending } = await useApiFetch(`/api/menus/${id}`)

const name = ref(menu.value.name)

useHead({
  title: () => {
    return `Karta menu - ${name.value}`
  },
})
</script>

<template>
  <div>
    <PageSkeleton v-if="pending" />
    <section v-else class="mt-2.5 py-2">
      <TheSectionHeader :title="'Karta menu - ' + name" />
    </section>
  </div>
</template>

<style scoped>

</style>
