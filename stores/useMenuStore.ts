import type { Menu, MenuFilterType, MenuType } from '~/types/menus'

export const useMenuStore = defineStore('menu', () => {
  const loading: Ref<boolean> = ref(false)
  const list: Ref<Menu[]> = ref([])
  const filterType: Ref<MenuFilterType> = ref('all')

  const filterOptions: MenuType[] = [
    {
      name: 'Wszystkie',
      value: 'all',
    },
    {
      name: 'Aktywne',
      value: 'active',
    },
    {
      name: 'Nieaktywne',
      value: 'inactive',
    },
  ]

  const rowActions = (row: Menu) => [
    [
      {
        label: 'Szczegóły',
        icon: 'i-heroicons-eye-20-solid',
        click: async () => await navigateTo({ path: `/menus/${row.id}` }),
      },
    ],
    [
      {
        label: 'Edytuj',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id),
      },
      {
        label: 'Duplikuj',
        icon: 'i-heroicons-document-duplicate-20-solid',
      },
    ],
    [
      {
        label: 'Usuń',
        icon: 'i-heroicons-trash-20-solid',
        click: () => console.log('Delete', row.id),
      },
    ],
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
      key: 'items',
      label: 'Liczba pozycji',
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
    const { data } = await useApiFetch<Menu[]>('/menus', { query: { type: filterType.value } })
    list.value = data.value
    loading.value = false
  }

  async function createMenu(data: Menu): void {
    console.log('create menu data: ', data)
    // todo: post to api
  }

  watch(filterType, async (): void => {
    await fetchData()
  })

  return {
    loading,
    list,
    rowActions,
    filterOptions,
    filterType,
    columns,
    fetchData,
    createMenu,
  }
})
