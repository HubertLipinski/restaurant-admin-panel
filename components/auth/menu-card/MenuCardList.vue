<script setup lang="ts">
const store = useMenuStore()

await store.fetchData()

const pending = computed(() => store.loading)
</script>

<template>
  <div>
    <div class="flex justify-between items-center dark:border-gray-700 mb-6">
      <div class="flex items-center">
        <UFormGroup label="Status">
          <USelect v-model="store.filterType" :options="store.filterOptions" option-attribute="name" />
        </UFormGroup>
      </div>
    </div>
    <UTable
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Ładowanie...' }"
      class="w-full border-t border-gray-200"
      :columns="store.columns"
      :rows="store.list"
      :loading="pending"
    >
      <template #active-data="{ row }">
        <span :class="row.active ? 'text-emerald-500' : 'text-rose-500'">{{ row.active ? 'Aktywny' : 'Nieaktywny' }}</span>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="store.rowActions(row)">
          <template #item="{ item }">
            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500" dynamic />
            <span class="truncate">{{ item.label }}</span>
          </template>
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
