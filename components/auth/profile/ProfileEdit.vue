<script setup lang="ts">
import { z } from 'zod'
import { FormUpdateProfileSchema } from '~/schema/auth/user/FormSchema'
import type { User } from '~/types/user'

const { formErrorMap } = useFormUtils();
const { success } = useNotification()

const { data: user, getSession }: { data: Ref<User> } = useAuth()

const state = ref({
  name: user.value?.name,
  email: user.value?.email,
  current_password: '',
  password: '',
  password_confirmation: '',
  changePassword: false,
})

const submitDisabled = computed(() => {
  return !FormUpdateProfileSchema.safeParse(state.value).success
})

const form = ref(null)
const loading = ref(false)

function resetForm(data: User) {
  state.value = {
    name: data.name,
    email: data.email,
    current_password: '',
    password: '',
    password_confirmation: '',
    changePassword: false,
  }
}
async function submitForm(event: Event<z.output<typeof FormUpdateProfileSchema>>) {
  if (loading.value) {
    return
  }

  loading.value = true

  const data = { ...event.data }

  if (!data.changePassword) {
    delete data.current_password
    delete data.password
    delete data.password_confirmation
  }

  if (data.email === user.value.email) {
    delete data.email
  }

  const { data: response, error } = await useApiFetch<ApiResponse<User>>('/user/profile', {
    method: 'PUT',
    body: data,
  })

  loading.value = false

  if (error.value) {
    const errors = error.value.data.errors
    form.value.setErrors(formErrorMap(errors))
    return
  }

  resetForm(response.value.data)
  success('Dane zostały pomyślnie zaktualizowane');
}

watch(state.value, () => {
  if (!state.value.changePassword) {
    state.value.password = null
    state.value.password_confirmation = null
  }
})
</script>

<template>
  <UForm ref="form" :schema="FormUpdateProfileSchema" :state="state" @submit="submitForm">
    <UCard>
      <template #header>
        <p class="text-gray-500">Aktualizacja danych konta</p>
      </template>

      <div class="space-y-4">
        <UFormGroup label="Nazwa użytkownika" name="name" autocomplete="name">
          <UInput v-model="state.name" size="lg" />
        </UFormGroup>
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" size="lg" type="email" autocomplete="email" />
        </UFormGroup>

        <UFormGroup label="Zmień hasło" name="active">
          <UToggle v-model="state.changePassword" size="md" />
        </UFormGroup>

        <div v-if="state.changePassword" class="space-y-4">
          <UFormGroup label="Obecne hasło" name="current_password">
            <UInput v-model="state.current_password" size="lg" type="password" autocomplete="currentPassword" />
          </UFormGroup>
          <UFormGroup label="Nowe hasło" name="password">
            <UInput v-model="state.password" size="lg" type="password" autocomplete="password" />
          </UFormGroup>
          <UFormGroup label="Powtórz hasło" name="password_confirmation">
            <UInput v-model="state.password_confirmation" size="lg" type="password" autocomplete="passwordConfirm" />
          </UFormGroup>
        </div>
      </div>

      <template #footer>
      <UButton type="submit" size="lg" class="float-right mb-3" variant="solid" :loading="loading" :disabled="submitDisabled">
        Aktualizuj
      </UButton>
    </template>
    </UCard>
  </UForm>
</template>

<style scoped>

</style>