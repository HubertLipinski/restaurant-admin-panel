<script setup lang="ts">

import { UserRole } from '~/types/user'
import StatusForm from '~/components/auth/order/StatusForm.vue'

useHead({
  title: 'Edytuj zamówienie',
})

definePageMeta({
  layout: 'auth',
  name: 'Edytuj zamówienie',
  validate: async (route) => {
    return /^\d+$/.test(route.params.id)
  },
  middleware: ['user-role'],
  requiredRole: [UserRole.Admin, UserRole.Waiter, UserRole.Kitchen],
})

const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data: response } = await useApiFetch(`/orders/${id}`)
const order = computed(() => response.value?.data)
</script>

<template>
  <div>
    <PageSkeleton v-if="!order" />
    <section v-else class="mt-2.5 py-2">
      <TheSectionHeader :title="`Edytuj zamówienie - ${order.id}`">
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
    <StatusForm :order="order" />
  </div>
</template>

<style scoped></style>
