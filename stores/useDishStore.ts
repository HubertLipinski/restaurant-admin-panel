import type { Dish } from '~/types/dishes'

export const useDishStore = defineStore('dish', () => {
  const { success } = useNotification()
  const apiPath: string = '/dishes'

  const loading: Ref<boolean> = ref(false)
  const list: Ref<Dish[]> = ref([])

  const columns: Ref<{ key: string; label: string }[]> = ref([
    {
      key: 'image_url',
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
      key: 'saturated_fat',
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
    list.value = data.value.data
    loading.value = false
  }

  async function createDish(data: Dish): boolean {
    const raw: Dish = toRaw<Dish>(data)

    const formData = new FormData()
    for (const item in raw) {
      formData.append(item, raw[item])
    }

    const {data: response, error} = await useApiFetch<ApiResponse<Dish>>(apiPath, {
      method: 'POST',
      body: formData,
      headers: {
        accept: 'application/json',
      },
    })

    if (error.value.data) {
      throw createError({
        message: error.value.data.message,
        code: error.value.data.statusCode,
        errors: error.value.data.errors,
      })
    }

    success('Potrawa została pomyślnie utworzona')
    return true
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

  async function handleForm(data: Dish, type: 'edit' | 'create', form: Ref<Form>) {
    const { formErrorMap } = useFormUtils();

    const raw: Dish = toRaw<Dish>(data)
    const formData = new FormData()
    for (const item in raw) {
      if (raw[item]) {
        formData.append(item, raw[item])
      }
    }

    let path = apiPath
    if (type === 'edit') {
      path += `/${data.id}?_method=PUT`
    }
    const { data: response, error } = await useApiFetch<ApiResponse<Dish>>(path, {
      method: 'POST',
      body: formData,
    })

    if (error.value) {
      const errors = error.value.data.errors
      console.log(formErrorMap(errors));
      form.value.setErrors(formErrorMap(errors))
      return
    }

    success('Potrawa została pomyślnie ' + (type === 'create' ? 'utworzona' : 'zaktualizowana'))

    await navigateTo('/dishes')
  }

  return {
    apiPath,
    loading,
    list,
    columns,
    fetchData,
    createDish,
    updateDish,
    deleteDish,
    handleForm,
  }
})
