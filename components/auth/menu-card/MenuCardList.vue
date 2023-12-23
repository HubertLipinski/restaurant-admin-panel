<script setup lang="ts">

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Nazwa',
  },
  {
    key: 'active',
    label: 'Status',
  },
  {
    key: 'items',
    label: 'Liczba pozycji',
  },
  {
    key: 'created_at',
    label: 'Data utworzenia',
  },
  {
    key: 'updated_at',
    label: 'Data edycji',
  },
  {
    key: 'actions',
    label: 'Akcja',
  },
]

const items = row => [
  [
    {
      label: 'Szczegóły',
      icon: 'i-heroicons-eye-20-solid',
      click: async () => await navigateTo({ path: `/menus/${row.id}` }),
    },
  ],
  [
    {
      label: 'Edytuj',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => console.log('Edit', row.id),
    },
    {
      label: 'Duplikuj',
      icon: 'i-heroicons-document-duplicate-20-solid',
    },
  ],
  [
    {
      label: 'Usuń',
      icon: 'i-heroicons-trash-20-solid',
      click: () => console.log('Delete', row.id),
    },
  ],
]

const types: MenuType[] = [
  {
    name: 'Wszystkie',
    value: 'all',
  },
  {
    name: 'Aktywne',
    value: 'active',
  },
  {
    name: 'Nieaktywne',
    value: 'inactive',
  },
]

const type = ref('all')

const { pending, data: menus } = await useLazyAsyncData(
  'menus',
  () => $fetch('/api/menus', { query: { type: type.value } }),
  { watch: type },
)

</script>

<template>
  <div>
    <div class="flex justify-between items-center dark:border-gray-700 mb-6">
      <div class="flex items-center">
        <UFormGroup label="Status">
          <USelect v-model="type" :options="types" option-attribute="name" />
        </UFormGroup>
      </div>
    </div>
    <UTable
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Ładowanie...' }"
      class="w-full border-t border-gray-200"
      :columns="columns"
      :rows="menus"
      :loading="pending"
    >
      <template #active-data="{ row }">
        <span :class="row.active ? 'text-emerald-500' : 'text-rose-500'">{{ row.active ? 'Aktywny' : 'Nieaktywny' }}</span>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-pencil-square" />
        </UDropdown>
      </template>

      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">Brak kart menu</span>
        </div>
      </template>
    </UTable>
  </div>
</template>

<style scoped></style>
