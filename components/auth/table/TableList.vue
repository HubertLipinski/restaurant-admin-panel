<script setup lang="ts">
import ConfirmModal from '~/components/global/ConfirmModal.vue'

const store = useTableStore()
const { columns, list } = storeToRefs(store)
const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()

onMounted(async () => {
  await store.fetchData()
})

const pending = computed(() => store.loading)

async function openConfirm(id: number) {
  const { isCanceled } = await reveal()
  if (!isCanceled) {
    await store.deleteTable(id)
    await store.fetchData()
  }
}

const rowActions = (row: Table) => [
  [
    {
      label: 'Szczegóły',
      icon: 'i-heroicons-eye-20-solid',
      click: async () => await navigateTo({ path: `/tables/${row.id}` }),
    },
  ],
  [
    {
      label: 'Edytuj',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: async () => await navigateTo({ path: `/tables/${row.id}/edit` }),
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
      <template #qrCodeUrl-data="{ row }">
        <a v-if="row.qrCodeUrl" :href="row.qrCodeUrl" target="_blank">
          <img :src="row.qrCodeUrl" :alt="row.name" class="max-h-[100px] max-w-[100px] w-100" />
        </a>
        <span v-else>Brak</span>
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
          <span class="italic text-sm">Brak stołów</span>
        </div>
      </template>
    </UTable>
    <ConfirmModal
      :show="isRevealed"
      :confirm="confirm"
      :cancel="cancel"
      prompt="Czy na pewno chcesz usunąć ten stół?" />
  </div>
</template>

<style scoped></style>
