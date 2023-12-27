<script setup lang="ts">
import ConfirmModal from '~/components/global/ConfirmModal.vue'

const store = useDishStore()
const { columns, list } = storeToRefs(store)
const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()

onMounted(async () => {
  await store.fetchData()
})

const pending = computed(() => store.loading)

async function openConfirm(id: number) {
  const { isCanceled } = await reveal()
  if (!isCanceled) {
    await store.deleteDish(id)
    await store.fetchData()
  }
}

const rowActions = (row: Dish) => [
  [
    {
      label: 'Szczegóły',
      icon: 'i-heroicons-eye-20-solid',
      click: async () => await navigateTo({ path: `/dishes/${row.id}` }),
    },
  ],
  [
    {
      label: 'Edytuj',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: async () => await navigateTo({ path: `/dishes/${row.id}/edit` }),
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
    <UTable
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Ładowanie...' }"
      class="w-full border-t border-gray-200"
      :columns="columns"
      :rows="list"
      :loading="pending">
      <template #imageUrl-data="{ row }">
        <img v-if="row.imageUrl" :src="row.imageUrl" :alt="row.name" class="max-h-[200px] max-w-[200px] w-100" />
        <span v-else>Brak</span>
      </template>
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
          <span class="italic text-sm">Brak potraw</span>
        </div>
      </template>
    </UTable>
    <ConfirmModal
      :show="isRevealed"
      :confirm="confirm"
      :cancel="cancel"
      prompt="Czy na pewno chcesz usunąć tę potrawę?" />
  </div>
</template>

<style scoped></style>
