import type { Table } from '~/types/tables'

export const useTableStore = defineStore('table', () => {
  const { success } = useNotification()
  const apiPath: string = '/tables'

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
    apiPath,
    createTable,
    updateTable,
    deleteTable,
  }
})
