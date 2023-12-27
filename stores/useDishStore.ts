export const useDishStore = defineStore('dish', () => {
  const toast = useToast()
  const apiPath: string = '/dishes'

  const loading: Ref<boolean> = ref(false)
  const list: Ref<Dish[]> = ref([])
  // const filterType: Ref<MenuFilterType> = ref('all')

  const columns: Ref<{ key: string; label: string }[]> = ref([
    {
      key: 'imageUrl',
      label: 'Zdjęcie',
    },
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Nazwa',
    },
    {
      key: 'price',
      label: 'Cena',
    },
    {
      key: 'kcal',
      label: 'Kalorie',
    },
    {
      key: 'fat',
      label: 'Tłuszcz',
    },
    {
      key: 'saturatedFat',
      label: 'Tłuszcz nasycony',
    },
    {
      key: 'carbs',
      label: 'Węglowodany',
    },
    {
      key: 'proteins',
      label: 'Białko',
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

  const getDishById = (id: number): Menu => {
    console.log(id)
    return list.value.find((menu: Menu) => menu.id === id)
  }

  async function fetchData(): void {
    loading.value = true
    const { data } = await useApiFetch<Dish[]>(apiPath)
    list.value = data.value
    loading.value = false
  }

  async function createDish(data: Menu): void {
    console.log('create dish data: ', data)

    await useApiFetch<Dish[]>(apiPath, {
      method: 'POST',
      body: data,
    })

    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: 'Potrawa została pomyślnie utworzona',
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }

  async function updateDish(id: number, data: Dish): void {
    console.log('update dish data: ', data)

    await useApiFetch<Dish[]>(`${apiPath}/${id}`, {
      method: 'PUT',
      body: data,
    })

    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: 'Potrawa została pomyślnie zaktualizowana',
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }

  async function deleteDish(id: number): void {
    await useApiFetch<Dish[]>(`${apiPath}/${id}`, { method: 'DELETE' })

    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: 'Potrawa została pomyślnie usunięta',
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }

  // watch(filterType, async (): void => {
  //   await fetchData()
  // })

  return {
    loading,
    list,
    // filterOptions,
    // filterType,
    columns,
    getDishById,
    fetchData,
    createDish,
    updateDish,
    deleteDish,
  }
})
