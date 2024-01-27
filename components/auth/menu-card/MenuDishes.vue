<script setup lang="ts">
import type { Dish } from '~/types/dishes'

interface DishDetailsProps {
  dishes: Dish[]
}

const props = defineProps<DishDetailsProps>()

const columns = [
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
    key: 'kcal',
    label: 'Kalorie',
    sortable: true,
  },
  {
    key: 'fat',
    label: 'Tłuszcz',
    sortable: true,
  },
  {
    key: 'saturated_fat',
    label: 'Tłuszcz nasycony',
    sortable: true,
  },
  {
    key: 'carbs',
    label: 'Węglowodany',
    sortable: true,
  },
  {
    key: 'proteins',
    label: 'Białko',
    sortable: true,
  },
  {
    key: 'actions',
    label: 'Akcja',
    sortable: false,
  },
]

const actions = (row: Dish) => [
  [
    {
      label: 'Szczegóły',
      icon: 'i-heroicons-eye-20-solid',
      click: () => navigateTo({ path: `/dishes/${row.id}` }),
    },
  ],
  [
    {
      label: 'Edytuj',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: async () => await navigateTo({ path: `/dishes/${row.id}/edit` }),
    },
  ],
]

</script>

<template>
  <UTable
    :rows="props.dishes"
    :columns="columns"
    class="w-full"
    sort-asc-icon="i-heroicons-arrow-up"
    sort-desc-icon="i-heroicons-arrow-down"
    :ui="{ td: { base: 'max-w-full truncate' } }"
  >
    <template #image_url-data="{ row }">
      <a v-if="row.image_url" :href="row.image_url" target="_blank" class="block max-h-[100px]  max-w-[100px] group">
        <img :src="row.image_url" :alt="row.name" class="group-hover:contrast-[.65] h-auto max-w-full" />
      </a>
      <span v-else>Brak</span>
    </template>

    <template #actions-data="{ row }">
      <UDropdown :items="actions(row)">
        <template #item="{ item }">
          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500" dynamic />
          <span class="truncate">{{ item.label }}</span>
        </template>
        <UButton color="gray" variant="ghost" icon="i-heroicons-pencil-square" />
      </UDropdown>
    </template>

    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <UIcon name="i-heroicons-circle-stack" class="text-3xl text-gray-400" />
        <span class="text-sm">Brak przypisanych dań</span>
      </div>
    </template>
  </UTable>
</template>
