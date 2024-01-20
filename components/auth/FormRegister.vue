<script setup lang="ts">
import { z } from 'zod'
import { RegisterSchema } from '~/schema/auth/RegisterSchema'

const { signUp } = useAuth()
const { success } = useNotification()

const state = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  birthdayDate: '',
  agreements: {
    terms: false,
  },
})

const registerError = ref(false)
const loading = ref(false)
const submitDisabled = computed(() => !RegisterSchema.safeParse(state.value).success)

async function onSubmit(event: Event<z.output<typeof RegisterSchema>>) {
  loading.value = true
  try {
    await signUp(event.data, { callbackUrl: '/dashboard' })
    success('Zostałeś pomyślnie zarejestrowany.')
  } catch (error) {
    loading.value = false
    registerError.value = true
  }
}

onErrorCaptured((_) => {
  return false
})
</script>

<template>
  <UForm class="space-y-4 mb-2" :schema="RegisterSchema" :state="state" @submit="onSubmit">
    <UAlert
      v-if="registerError"
      title=""
      color="red"
      variant="solid"
      description="Wystąpił błąd podczas rejestracji. Spróbuj ponownie później." />
    <UFormGroup label="Imię i nazwisko" name="name">
      <UInput
        v-model="state.name"
        size="lg"
        autocomplete="name"
        icon="i-heroicons-user-circle"
        placeholder="Podaj imię i nazwisko" />
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput
        v-model="state.email"
        size="lg"
        placeholder="email@example.com"
        autocomplete="email"
        icon="i-heroicons-envelope" />
    </UFormGroup>
    <UFormGroup label="Hasło" name="password">
      <UInput
        v-model="state.password"
        type="password"
        size="lg"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        autocomplete="password"
        icon="i-heroicons-lock-closed" />
    </UFormGroup>
    <UFormGroup label="Potwierdź hasło" name="passwordConfirm">
      <UInput
        v-model="state.password_confirmation"
        type="password"
        size="lg"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        autocomplete="passwordConfirm"
        icon="i-heroicons-lock-closed" />
    </UFormGroup>
    <p class="mt-2 text-gray-500 dark:text-gray-400 text-sm">
      Hasło powinno składać się z 8 do 20 znaków. Musi zawierać przynajmniej jedną wielką literę, jedną małą literę i
      jedną cyfrę.
    </p>
    <UFormGroup label="Data urodzenia" name="birthdayDate">
      <UInput
        v-model="state.birthdayDate"
        v-maska
        data-maska="####-##-##"
        data-maska-eager
        type="date"
        size="lg"
        autocomplete="birthdayDate"
        icon="i-heroicons-calendar"
        min="1900-01-01"
        placeholder="YYYY-MM-DD" />
    </UFormGroup>

    <UFormGroup class="pt-2">
      <UCheckbox v-model="state.agreements.terms" name="agreements_terms" required>
        <template #label>
          „Oświadczam, iż zapoznałem się z treścią
          <nuxt-link to="/regulamin" class="text-secondary underline">Regulaminu</nuxt-link> .”
        </template>
      </UCheckbox>
    </UFormGroup>

    <div class="flex justify-between pt-6">
      <UButton type="submit" class="space-y-4" size="lg" variant="solid" :loading="loading" :disabled="submitDisabled">
        Zarejestruj
      </UButton>
      <UButton
        label="Zaloguj się"
        color="gray"
        variant="link"
        class="p-0"
        :to="loading !== true ? '/login' : null"
        :disabled="loading">
        <template #leading>
          <UIcon name="i-heroicons-arrow-left-20-solid" />
        </template>
      </UButton>
    </div>
  </UForm>
</template>

<style scoped></style>
