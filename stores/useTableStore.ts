import type { Table } from '~/types/tables'

export const useTableStore = defineStore('table', () => {
  const toast = useToast()
  const apiPath: string = '/tables'

  const loading: Ref<boolean> = ref(false)
  const list: Ref<Table[]> = ref([])

  const columns: Ref<{ key: string; label: string }[]> = ref([
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Nazwa',
    },
    {
      key: 'qrCodeUrl',
      label: 'Kod QR',
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
  ])

  async function fetchData(): void {
    loading.value = true
    const { data } = await useApiFetch<Table[]>(apiPath)
    list.value = data.value
    loading.value = false
  }

  async function createTable(data: Table): void {
    await useApiFetch<Table[]>(apiPath, {
      method: 'POST',
      body: data,
    })

    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: 'Stół został pomyślnie utworzony',
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }

  async function updateTable(id: number, data: Table): void {
    await useApiFetch<Table[]>(`${apiPath}/${id}`, {
      method: 'PUT',
      body: data,
    })

    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: 'Stół został pomyślnie zaktualizowany',
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }
  async function deleteTable(id: number): void {
    await useApiFetch<Table[]>(`${apiPath}/${id}`, { method: 'DELETE' })

    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: 'Stół został pomyślnie usunięty',
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }

  return {
    loading,
    list,
    columns,
    fetchData,
    createTable,
    updateTable,
    deleteTable,
  }
})
