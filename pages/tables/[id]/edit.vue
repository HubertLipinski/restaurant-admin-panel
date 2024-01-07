<script setup lang="ts">
import TableForm from '~/components/auth/table/TableForm.vue'

useHead({
  title: 'Edytuj stół',
})

definePageMeta({
  layout: 'auth',
  name: 'Edytuj stół',
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
      <TheSectionHeader :title="`Edytuj stół - ${table.name}`">
        <template #actions>
          <UButton
            icon="i-heroicons-arrow-small-left-20-solid"
            size="lg"
            color="gray"
            variant="soft"
            label="Wróć"
            @click="router.back"
            :trailing="false" />
        </template>
      </TheSectionHeader>
    </section>
    <TableForm :table="table" method="edit" />
  </div>
</template>

<style scoped></style>
