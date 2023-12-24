<script setup lang="ts">
import type { Menu } from '~/types/menus'
import ConfirmModal from '~/components/global/ConfirmModal.vue'

const store = useMenuStore()
const { columns, list } = storeToRefs(store)
const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()

await store.fetchData()
const pending = computed(() => store.loading)

async function openConfirm(id: number) {
  const { isCanceled } = await reveal()
  if (!isCanceled) {
    await store.deleteMenu(id)
    await store.fetchData()
  }
}

const rowActions = (row: Menu) => [
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
      click: async () => await navigateTo({ path: `/menus/${row.id}/edit` }),
    },
  ],
  [
    {
      label: 'Usuń',
      icon: 'i-heroicons-trash-20-solid',
      click: () => openConfirm(row.id),
    },
  ],
]
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
      :columns="columns"
      :rows="list"
      :loading="pending">
      <template #active-data="{ row }">
        <UBadge
          size="sm"
          :label="row.active ? 'Aktywny' : 'Nieaktywny'"
          :color="row.active ? 'green' : 'rose'"
          variant="outline" />
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="rowActions(row)">
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

    <ConfirmModal :show="isRevealed" :confirm="confirm" :cancel="cancel" />
  </div>
</template>

<style scoped></style>
