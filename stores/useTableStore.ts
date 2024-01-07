import type { Table } from '~/types/tables'

export const useTableStore = defineStore('table', () => {
  const { success } = useNotification()
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
      key: 'createdAt',
      label: 'Data utworzenia',
    },
    {
      key: 'updatedAt',
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

    success('Stół został pomyślnie utworzony')
  }

  async function updateTable(id: number, data: Table): void {
    await useApiFetch<Table[]>(`${apiPath}/${id}`, {
      method: 'PUT',
      body: data,
    })

    success('Stół został pomyślnie zaktualizowany')
  }
  async function deleteTable(id: number): void {
    await useApiFetch<Table[]>(`${apiPath}/${id}`, { method: 'DELETE' })

    success('Stół został pomyślnie usunięty')
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
