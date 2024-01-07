<script setup lang="ts">
import TableDetails from '~/components/auth/table/TableDetails.vue'

useHead({
  title: 'Szczegóły stołu',
})

definePageMeta({
  layout: 'auth',
  name: 'Szczegóły stołu',
  validate: async (route) => {
    return /^\d+$/.test(route.params.id)
  },
})

const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data: table } = await useApiFetch(`/tables/${id}`)
</script>

<template>
  <div>
    <PageSkeleton v-if="!table" />
    <section v-else class="mt-2.5 py-2">
      <TheSectionHeader :title="`Szczegóły stołu - ${table.name}`">
        <template #actions>
          <UButton
            icon="i-heroicons-arrow-small-left-20-solid"
            size="lg"
            color="gray"
            variant="soft"
            label="Wróć"
            @click="router.back"
            :trailing="false" />
          <UButton
            class="ml-2"
            icon="i-heroicons-pencil-square-20-solid"
            size="lg"
            color="primary"
            variant="solid"
            label="Edytuj"
            :to="`/tables/${table.id}/edit`"
            :trailing="false" />
        </template>
      </TheSectionHeader>
      <TableDetails :table="table" />
    </section>
  </div>
</template>

<style scoped></style>
