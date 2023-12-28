<script setup lang="ts">
import DishForm from '~/components/auth/dish/DishForm.vue'

useHead({
  title: 'Edytuj potrawę',
})

definePageMeta({
  layout: 'auth',
  // middleware: ['auth'], // todo uncomment this after auth is implemented
  name: 'Edytuj potrawę',
  validate: async (route) => {
    return /^\d+$/.test(route.params.id)
  },
})

const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data: dish } = await useApiFetch(`/api/dishes/${id}`)
</script>

<template>
  <div>
    <PageSkeleton v-if="!dish" />
    <section v-else class="mt-2.5 py-2">
      <TheSectionHeader :title="`Edytuj potrawę - ${dish.name}`">
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
      <DishForm :dish="dish" method="edit" />
    </section>
  </div>
</template>

<style scoped></style>
