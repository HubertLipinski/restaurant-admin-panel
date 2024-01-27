import type { Menu } from '~/types/menus'

export const useMenuStore = defineStore('menu', () => {
  const { success } = useNotification()
  const apiPath: string = '/menus'

  async function createMenu(data: Menu): void {
    await useApiFetch<Menu[]>(apiPath, {
      method: 'POST',
      body: data,
    })

    success('Karta menu została pomyślnie utworzona')
  }

  async function updateMenu(id: number, data: Menu): void {
    await useApiFetch<Menu[]>(`${apiPath}/${id}`, {
      method: 'PUT',
      body: data,
    })

    success('Karta menu została pomyślnie zaktualizowana')
  }

  async function deleteMenu(id: number): void {
    await useApiFetch<Menu[]>(`${apiPath}/${id}`, { method: 'DELETE' })

    success('Karta menu została pomyślnie usunięta')
  }

  return {
    apiPath,
    createMenu,
    updateMenu,
    deleteMenu,
  }
})
