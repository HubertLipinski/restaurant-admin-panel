import type { Menu, MenuFilterType, MenuType } from '~/types/menus'

export const useMenuStore = defineStore('menu', () => {
  const { success } = useNotification()
  const apiPath: string = '/menus'

  const filterType: Ref<MenuFilterType> = ref('all')

  const filterOptions: MenuType[] = [
    {
      name: 'Wszystkie',
      value: 'all',
    },
    {
      name: 'Aktywny',
      value: 'active',
    },
    {
      name: 'Nieaktywny',
      value: 'inactive',
    },
  ]

  // async function fetchData(): void {
  //   loading.value = true
  //   const { data } = await useApiFetch<Menu[]>(`${apiPath}`, { query: { type: filterType.value } })
  //   list.value = data.value.data
  //   loading.value = false
  // }

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

  watch(filterType, async (): void => {
    await fetchData()
  })

  return {
    apiPath,
    createMenu,
    updateMenu,
    deleteMenu,
  }
})
