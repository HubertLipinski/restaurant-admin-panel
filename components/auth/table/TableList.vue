<script lang="ts" setup>
import type { Table } from '~/types/tables'

const store = useTableStore()
const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()
const { errorResponse } = useNotification()

const columns = [
  {
    key: 'id',
    label: 'ID',
    sortable: true,
  },
  {
    key: 'name',
    label: 'Nazwa',
    sortable: true,
  },
  {
    key: 'seats',
    label: 'Liczba miejsc',
    sortable: true,
  },
  {
    key: 'qr_code_url',
    label: 'Kod QR',
    sortable: false,
  },
  {
    key: 'created_at',
    label: 'Data utworzenia',
    sortable: true,
  },
  {
    key: 'updated_at',
    label: 'Data edycji',
    sortable: true,
  },
  {
    key: 'actions',
    label: 'Akcja',
    sortable: false,
  },
]

const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter(column => selectedColumns.value.includes(column)))

const actions = (row: Table) => [
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

async function openConfirm(id: number) {
  const { isCanceled } = await reveal()
  if (!isCanceled) {
    await store.deleteTable(id)
    await refreshNuxtData('tables')
  }
}

const search = ref('')

const resetFilters = () => {
  search.value = ''
}

const sort = ref({ column: 'id', direction: 'desc' as const })
const page = ref(1)
const pageCount = ref(5)
const pageTotal = ref(null)
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

const { data: response, pending, refresh } = await useLazyAsyncData<{ data: ApiResponse<Table> }>('tables', () => useApiFetch(store.apiPath, {
  query: {
    query: search.value,
    page: page.value,
    per_page: pageCount.value,
    sort: sort.value.column,
    order: sort.value.direction,
  },
}), {
  default: () => [],
  watch: [page, search, pageCount],
})

watch(pageCount, () => {
  page.value = 1
})

watch(response, (response: ApiResponse<Table>) => {
  if (response?.error) {
    errorResponse('tables', response.error)
    return
  }

  if (response?.data?.meta?.total) {
    pageTotal.value = Number(response?.data?.meta?.total)
  }
})

</script>

<template>
  <UCard
    class="w-full mb-[5rem]"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' }
    }"
  >
    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Szukaj..." />
    </div>

    <!-- Header and Action buttons -->
    <div class="flex justify-between items-center w-full px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">Na stronę</span>

        <USelect
          v-model.number="pageCount"
          :options="[3, 5, 10, 20, 30, 40]"
          class="me-2 w-20"
          size="xs"
        />
      </div>

      <div class="flex gap-1.5 items-center">
        <USelectMenu v-model="selectedColumns" :options="columns" multiple>
          <UButton
            icon="i-heroicons-view-columns"
            color="gray"
            size="xs"
          >
            Kolumny
          </UButton>
        </USelectMenu>

        <UButton
          icon="i-heroicons-funnel"
          color="gray"
          size="xs"
          :disabled="search === ''"
          @click="resetFilters"
        >
          Resetuj
        </UButton>
      </div>
    </div>

    <!-- Table -->
    <UTable
      key="datatable_tables"
      v-model:sort="sort"
      :rows="response?.data?.data"
      :columns="columnsTable"
      :loading="pending"
      sort-asc-icon="i-heroicons-arrow-up"
      sort-desc-icon="i-heroicons-arrow-down"
      sort-mode="manual"
      class="w-full"
      :ui="{ td: { base: 'max-w-[0] truncate' } }"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Ładowanie...'}"
      @update:sort="refresh"
    >
      <template #id-data="{ row }">
        <p class="ml-3">{{ row.id }}</p>
      </template>

      <template #qr_code_url-data="{ row }">
        <a v-if="row.qr_code_url" :href="row.qr_code_url" target="_blank" class="h-auto max-w-full group">
          <img :src="row.qr_code_url" :alt="row.name" class="border-2 border-black-50 group-hover:contrast-[.8]" />
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
          <span class="text-sm">Brak danych</span>
        </div>
      </template>
    </UTable>

    <!-- Number of rows & Pagination -->
    <template v-if="!!pageTotal" #footer>
      <div class="flex flex-wrap justify-between items-center">
        <div>
          <span class="text-sm leading-5">
            Pokaż
            <span class="font-medium">{{ pageFrom }}</span>
            do
            <span class="font-medium">{{ pageTo }}</span>
            z
            <span class="font-medium">{{ pageTotal }}</span>
            wyników
          </span>
        </div>

        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="pageTotal"
          :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
          }"
        />
      </div>
    </template>
    <ConfirmModal
      :show="isRevealed"
      :confirm="confirm"
      :cancel="cancel"
      prompt="Czy na pewno chcesz usunąć ten stół?"
    />
  </UCard>
</template>
