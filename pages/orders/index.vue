<script setup lang="ts">
import OrderList from '~/components/auth/order/OrderList.vue'
import { UserRole } from '~/types/user'

useHead({
  title: 'Zamówienia',
})

definePageMeta({
  layout: 'auth',
  name: 'Zamówienia',
  middleware: ['user-role'],
  requiredRole: [UserRole.Admin, UserRole.Waiter, UserRole.Kitchen],
})
</script>

<template>
  <section class="mt-2.5 py-2">
    <TheSectionHeader title="Zamówienia" subtitle="Tutaj możesz przeglądać złożone zamówienia.">
      <template #actions>
      </template>
    </TheSectionHeader>
    <OrderList />
  </section>
</template>

<style scoped></style>
