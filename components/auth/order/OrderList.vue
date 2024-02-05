<script lang="ts" setup>
import ConfirmModal from '~/components/global/ConfirmModal.vue'
import type { Order } from '~/types/order'
import { useOrderStore } from '~/stores/useOrderStore'
import { type User, UserRole } from '~/types/user'

const store = useOrderStore()
const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()
const { errorResponse } = useNotification()
const { statuses, statusLabelColors, paymentStatuses, paymentStatusesColors } = useOrder()
const { data: user }: { data: Ref<User> } = useAuth()

const columns = [
  {
    key: 'id',
    label: 'ID',
    sortable: true,
  },
  {
    key: 'table.name',
    label: 'Stolik',
    sortable: false,
  },
  {
    key: 'dishes.length',
    label: 'Liczba dań',
    sortable: false,
  },
  {
    key: 'total_price',
    label: 'Cena całkowita',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
  },
  {
    key: 'payment',
    label: 'Status płatności',
    sortable: false,
  },
  {
    key: 'order_date',
    label: 'Data zamówienia',
    sortable: true,
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
    key: 'details',
    label: 'Szczegóły',
    sortable: false,
  },
  {
    key: 'actions',
    label: 'Akcja',
    sortable: false,
  },
]

const selectedColumns = ref(columns.filter(column => !['created_at', 'updated_at'].includes(column.key)))
const columnsTable = computed(() => columns.filter(column => selectedColumns.value.includes(column)))

const statusFilter = [
  {
    name: 'Wszystkie',
    value: null,
  },
  ...statuses,
]

const paymentStatusFilter = [
  {
    name: 'Wszystkie',
    value: null,
  },
  ...paymentStatuses,
];

const selectedStatus = ref(statusFilter[0])

const { hasRole } = usePermission()
const actions = (row: Order) => {
  const actions = [
    [
      {
        label: 'Edytuj',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: async () => await navigateTo({ path: `/orders/${row.id}/edit` }),
      },
    ],
  ]

  if (hasRole(UserRole.Admin)) {
    actions.push([
      {
        label: 'Usuń',
        icon: 'i-heroicons-trash-20-solid',
        click: () => openConfirm(row.id),
      },
    ])
  }

  return actions
}

async function openConfirm(id: number) {
  if (!hasRole(UserRole.Admin)) {
    return
  }
  const { isCanceled } = await reveal()
  if (!isCanceled) {
    await store.deleteOrder(id)
    await refreshNuxtData('orders')
  }
}

const search = ref('')

const resetFilters = () => {
  search.value = ''
  selectedStatus.value = statusFilter[0]
}

const sort = ref({ column: 'order_date', direction: 'desc' as const })
const page = ref(1)
const pageCount = ref(5)
const pageTotal = ref(null)
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

const { data: response, pending, refresh } = await useLazyAsyncData<{
  data: ApiResponse<Order>
}>('orders', () => useApiFetch(store.apiPath, {
  query: {
    status: selectedStatus.value.value,
    query: search.value,
    page: page.value,
    per_page: pageCount.value,
    sort: sort.value.column,
    order: sort.value.direction,
  },
}), {
  default: () => [],
  watch: [page, search, pageCount, selectedStatus],
})

watch(pageCount, () => {
  page.value = 1
})

watch(response, (response: ApiResponse<Order>) => {
  if (response?.error) {
    errorResponse('orders', response.error)
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
    <div class="flex items-center justify-end gap-3 px-4 py-3">
<!--      <UInput v-model.trim="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Szukaj..." />-->

      <UFormGroup label="Status" size="xs">
        <USelectMenu v-model="selectedStatus"
                     :options="statusFilter"
                     placeholder="Wybierz rolę"
                     option-attribute="name"
                     class="w-40"
        />
      </UFormGroup>
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
          :disabled="search === '' && selectedStatus.value === null"
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
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Ładowanie...'}"
      @update:sort="refresh"
    >
      <template #id-data="{ row }">
        <p class="ml-3">{{ row.id }}</p>
      </template>

      <template #status-data="{ row }">
        <UBadge
          size="sm"
          :label="row.status_label"
          :color="statusLabelColors[row.status]"
          variant="solid"
        />
      </template>

      <template #payment-data="{ row }">
        <UBadge
          size="sm"
          :label="row.payments[0].status_label || 'Błąd!'"
          :color="paymentStatusesColors[row.payments[0].status]"
          variant="solid"
        />
      </template>

      <template #details-data="{row}">
        <UButton
          :label="`Szczegóły`"
          color="primary"
          variant="outline"
          @click="navigateTo({ path: `/orders/${row.id}` })"
        />
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
      prompt="Czy na pewno chcesz usunąć to zamówienie?"
    />
  </UCard>
</template>
