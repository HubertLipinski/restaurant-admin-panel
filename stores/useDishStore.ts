import type { Dish } from '~/types/dishes'

export const useDishStore = defineStore('dish', () => {
  const { success } = useNotification()
  const apiPath: string = '/dishes'

  const loading: Ref<boolean> = ref(false)
  const list: Ref<Dish[]> = ref([])

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

  async function fetchData(): void {
    loading.value = true
    const { data } = await useApiFetch<Dish[]>(apiPath)
    list.value = data.value
    loading.value = false
  }

  async function createDish(data: Dish): void {
    const raw: Dish = toRaw<Dish>(data)

    const formData = new FormData()
    for (const item in raw) {
      formData.append(item, raw[item])
    }

    await useApiFetch<Dish[]>(apiPath, {
      method: 'POST',
      body: formData,
    })

    success('Potrawa została pomyślnie utworzona')
  }

  async function updateDish(id: number, data: Dish): void {
    const raw: Dish = toRaw<Dish>(data)

    const formData = new FormData()
    for (const item in raw) {
      formData.append(item, raw[item])
    }

    await useApiFetch<Dish[]>(`${apiPath}/${id}`, {
      method: 'PUT',
      body: formData,
    })

    success('Potrawa została pomyślnie zaktualizowana')
  }

  async function deleteDish(id: number): void {
    await useApiFetch<Dish[]>(`${apiPath}/${id}`, { method: 'DELETE' })

    success('Potrawa została pomyślnie usunięta')
  }

  return {
    loading,
    list,
    columns,
    fetchData,
    createDish,
    updateDish,
    deleteDish,
  }
})
