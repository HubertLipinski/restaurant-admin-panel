import type { User } from '~/types/user'
import type { Dish } from '~/types/dishes'

export const useUserStore = defineStore('users', () => {
  const { success } = useNotification()
  const apiPath: string = '/users'

  async function deleteUser(id: number): void {
    await useApiFetch<User>(`${apiPath}/${id}`, { method: 'DELETE' })

    success('Użytkownik został pomyślnie usunięty')
  }

  async function handleForm(data: User, type: 'edit' | 'create', form: Ref<Form>) {
    const { formErrorMap } = useFormUtils();

    const raw: User = toRaw<User>(data)
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
    const { data: response, error } = await useApiFetch<ApiResponse<User>>(path, {
      method: 'POST',
      body: formData,
    })

    if (error.value) {
      const errors = error.value.data.errors
      form.value.setErrors(formErrorMap(errors))
      return
    }

    success('Użytkownik został pomyślnie ' + (type === 'create' ? 'utworzony' : 'zaktualizowany'))

    await navigateTo('/users')
  }

  return {
    apiPath,
    deleteUser,
    handleForm,
  }
})
