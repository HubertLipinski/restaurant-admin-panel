<script setup lang="ts">
import type { Order } from '~/types/order'
import TableDetails from '~/components/auth/table/TableDetails.vue'
import MenuDishes from '~/components/auth/menu-card/MenuDishes.vue'

const { statusLabelColors } = useOrder()

interface OrderSummaryProps {
  order: Order
}

const props = defineProps<OrderSummaryProps>()

const tableColums = [
  {
    key: 'image_url',
    label: 'Zdjęcie',
    sortable: false,
  },
  {
    key: 'name',
    label: 'Nazwa',
    sortable: true,
  },
  {
    key: 'price',
    label: 'Cena',
    sortable: true,
  },
  {
    key: 'quantity',
    label: 'Ilość',
    sortable: true,
  },
]
</script>

<template>
  <section>
    <div class="flex flex-col md:flex-row gap-4 py-2">
      <UCard class="md:basis-7/12">
        <template #header>
          <h2 class="text-xl">Szczegóły</h2>
        </template>
        <div class="flex flex-col gap-y-2">
          <div class="flex items-center gap-2">
            <h2 class="text-[1em] font-bold">ID:</h2>
            <p>{{ props.order.id }}</p>
          </div>
          <div class="flex items-center gap-2">
            <h2 class="text-[1em] font-bold">Suma zamówienia:</h2>
            <p>{{ props.order.total_price }}</p>
          </div>
          <div class="flex items-center gap-2" v-if="props.order.dishes.length">
            <h2 class="text-[1em] font-bold">Liczba dań:</h2>
            <p>{{ props.order.dishes.length }}</p>
          </div>
          <div class="flex items-center gap-2">
            <h2 class="text-[1em] font-bold">Status:</h2>
            <p>
              <UBadge
                size="sm"
                :label="props.order.status_label"
                :color="statusLabelColors[props.order.status]"
                variant="outline"
              />
            </p>
          </div>
          <div class="flex items-center gap-2">
            <h2 class="text-[1em] font-bold">Data zamówienia:</h2>
            <p>{{ props.order.order_date }}</p>
          </div>
          <div class="flex items-center gap-2">
            <h2 class="text-[1em] font-bold">Data aktualizacji:</h2>
            <p>{{ props.order.updated_at }}</p>
          </div>
        </div>
      </UCard>
      <UCard class="md:basis-5/12">
        <template #header>
          <h2 class="text-xl">Stolik</h2>
        </template>
        <TableDetails :table="props.order.table" :show-details="false" />
      </UCard>
    </div>
    <UCard class="mt-4 mb-[5rem]">
      <template #header>
        <h2 class="text-xl">Lista zamówionych dań</h2>
      </template>
      <div class="w-full mt-4">
        <MenuDishes :dishes="props.order.dishes" :columns="tableColums" :show-action="false" />
      </div>
    </UCard>
  </section>
</template>
