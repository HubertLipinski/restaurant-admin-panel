<script setup lang="ts">
import MenuCardDetails from '~/components/auth/menu-card/MenuCardDetails.vue'

useHead({
  title: 'Szczegóły karty',
})

definePageMeta({
  layout: 'auth',
  name: 'Szczegóły karty',
  validate: async (route) => {
    return /^\d+$/.test(route.params.id)
  },
})

const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data: response } = await useApiFetch(`/menus/${id}`)
const menu = computed(() => response.value?.data)
</script>

<template>
  <div>
    <PageSkeleton v-if="!menu" />
    <section v-else class="mt-2.5 py-2">
      <TheSectionHeader :title="`Szczegóły karty - ${menu.name}`">
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
            :to="`/menus/${menu.id}/edit`"
            :trailing="false" />
        </template>
      </TheSectionHeader>
      <MenuCardDetails :menu="menu" />
    </section>
  </div>
</template>

<style scoped></style>
