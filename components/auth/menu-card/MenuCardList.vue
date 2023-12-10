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
    key: 'items',
    label: 'Liczba pozycji',
  },
  {
    key: 'status',
    label: 'Status',
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
const rows = [
  {
    id: 1,
    name: 'Karta Menu 1',
    items: '22',
    status: 'Zaakceptowany',
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
]

const items = row => [
  [{
    label: 'Edytuj',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id),
  }, {
    label: 'Duplikuj',
    icon: 'i-heroicons-document-duplicate-20-solid',
  }], [{
    label: 'Usuń',
    icon: 'i-heroicons-trash-20-solid',
    click: () => console.log('Delete', row.id),
  }],
]
</script>

<template>
  <div>
    <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700">
      <!--      <UInput v-model="query" placeholder="Filter people..." />-->
      <UButton label="Dodaj" size="md" icon="i-heroicons-document-plus" class="ml-auto px-4 py-2" />
    </div>
    <UTable
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      class="w-full"
      :columns="columns"
      :rows="rows"
    >
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-pencil-square" />
        </UDropdown>
      </template>

      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">Brak kart menu</span>
          <UButton label="Dodaj" />
        </div>
      </template>
    </UTable>
  </div>
</template>

<style scoped>

</style>
