import type { Dish } from '~/types/dishes'

export const useDishStore = defineStore('dish', () => {
  const { success } = useNotification()
  const apiPath: string = '/dishes'

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
    deleteDish,
    handleForm,
  }
})
