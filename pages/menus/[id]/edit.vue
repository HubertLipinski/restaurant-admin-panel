<script setup lang="ts">
import MenuCardForm from '~/components/auth/menu-card/MenuCardForm.vue'

useHead({
  title: 'Edytuj kartę',
})

definePageMeta({
  layout: 'auth',
  name: 'Edytuj kartę',
  validate: async (route) => {
    return /^\d+$/.test(route.params.id)
  },
})

const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data: menu } = await useApiFetch(`/menus/${id}`)
</script>

<template>
  <div>
    <PageSkeleton v-if="!menu" />
    <section v-else class="mt-2.5 py-2">
      <TheSectionHeader :title="`Edytuj kartę - ${menu.name}`">
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
    <MenuCardForm :menu="menu" method="edit" />
  </div>
</template>

<style scoped></style>
