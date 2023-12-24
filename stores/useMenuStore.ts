import type { Menu, MenuFilterType, MenuType } from '~/types/menus'

export const useMenuStore = defineStore('menu', () => {
  const toast = useToast()
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

  const getMenuById = (id: number): Menu => {
    console.log(id)
    return list.value.find((menu: Menu) => menu.id === id)
  }

  async function fetchData(): void {
    loading.value = true
    const { data } = await useApiFetch<Menu[]>(apiPath, { query: { type: filterType.value } })
    list.value = data.value
    loading.value = false
  }

  async function createMenu(data: Menu): void {
    console.log('create menu data: ', data)

    await useApiFetch<Menu[]>(apiPath, {
      method: 'POST',
      body: data,
    })

    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: 'Karta menu została pomyślnie utworzona',
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }

  async function updateMenu(id: number, data: Menu): void {
    console.log('update menu data: ', data)

    await useApiFetch<Menu[]>(`${apiPath}/${id}`, {
      method: 'PUT',
      body: data,
    })

    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: 'Karta menu została pomyślnie zaktualizowana',
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }

  async function deleteMenu(id: number): void {
    await useApiFetch<Menu[]>(`${apiPath}/${id}`, { method: 'DELETE' })

    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: 'Karta menu została pomyślnie usunięta',
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
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
    getMenuById,
    fetchData,
    createMenu,
    updateMenu,
    deleteMenu,
  }
})
