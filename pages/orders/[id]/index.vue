<script setup lang="ts">

import { UserRole } from '~/types/user'
import OrderSummary from '~/components/auth/order/OrderSummary.vue'
import { OrderStatus } from '~/types/order'

useHead({
  title: 'Podgląd zamówienia',
})

definePageMeta({
  layout: 'auth',
  name: 'Podgląd zamówienia',
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
      <TheSectionHeader :title="`Podgląd zamówienia`">
        <template #actions>
          <UButton
            icon="i-heroicons-arrow-small-left-20-solid"
            size="lg"
            color="gray"
            variant="soft"
            label="Wróć"
            :trailing="false"
            @click="router.back"
          />
          <UButton
            class="ml-2"
            icon="i-heroicons-pencil-square-20-solid"
            size="lg"
            color="primary"
            variant="solid"
            label="Edytuj"
            :to="`/orders/${order.id}/edit`"
            :trailing="false" />
        </template>
      </TheSectionHeader>
    </section>
    <OrderSummary :order="order" />
  </div>
</template>

<style scoped></style>
