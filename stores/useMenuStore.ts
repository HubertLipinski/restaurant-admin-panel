import type { Menu, MenuFilterType, MenuType } from '~/types/menus'

export const useMenuStore = defineStore('menu', () => {
  const { success } = useNotification()
  const apiPath: string = '/menus'

  const loading: Ref<boolean> = ref(false)
  const list: Ref<Menu[]> = ref([])
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
      key: 'active',
      label: 'Status',
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
    const { data } = await useApiFetch<Menu[]>(`${apiPath}/all`, { query: { type: filterType.value } })
    list.value = data.value
    loading.value = false
  }

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
    loading,
    list,
    filterOptions,
    filterType,
    columns,
    fetchData,
    createMenu,
    updateMenu,
    deleteMenu,
  }
})
