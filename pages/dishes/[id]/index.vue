<script setup lang="ts">
import DishDetails from '~/components/auth/dish/DishDetails.vue'

useHead({
  title: 'Szczegóły potrawy',
})

definePageMeta({
  layout: 'auth',
  name: 'Szczegóły potrawy',
  validate: async (route) => {
    return /^\d+$/.test(route.params.id)
  },
})

const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data: response } = await useApiFetch(`/dishes/${id}`)
const dish = computed(() => response.value?.data)
</script>

<template>
  <div>
    <PageSkeleton v-if="!dish" />
    <section v-else class="mt-2.5 py-2">
      <TheSectionHeader :title="`Szczegóły potrawy - ${dish.name}`">
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
            :to="`/dishes/${dish.id}/edit`"
            :trailing="false" />
        </template>
      </TheSectionHeader>
      <DishDetails :dish="dish" />
    </section>
  </div>
</template>

<style scoped></style>
