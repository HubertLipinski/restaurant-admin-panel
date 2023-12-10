<script setup lang="ts">
import { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
import { RegisterSchema } from '~/schema/auth/RegisterSchema'

const { signUp } = useAuth()

const state = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  birthdayDate: '',
  agreements: {
    terms: false,
  },
})

const registerError = ref(false)

const submitDisabled = computed(() => !RegisterSchema.safeParse(state.value).success)

async function onSubmit (event: FormSubmitEvent<z.output<typeof RegisterSchema>>) {
  try {
    await signUp({
      name: 'Jan Nowak',
      email: event.data.email,
      phone: '4777273330',
      password: event.data.password,
      password_confirmation: event.data.passwordConfirm,
    })
  } catch (error) {
    registerError.value = true
  }
}

onErrorCaptured((_) => { return false })
</script>

<template>
  <UForm
    class="space-y-4 mb-2"
    :schema="RegisterSchema"
    :state="state"
    @submit="onSubmit"
  >
    <UAlert
      v-if="registerError"
      title=""
      color="red"
      variant="solid"
      description="Wystąpił błąd podczas rejestracji. Spróbuj ponownie później."
    />
    <UFormGroup label="Email" name="email">
      <UInput
        v-model="state.email"
        size="lg"
        placeholder="email@example.com"
        autocomplete="email"
        icon="i-heroicons-envelope"
      />
    </UFormGroup>
    <UFormGroup label="Hasło" name="password">
      <UInput
        v-model="state.password"
        type="password"
        size="lg"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        autocomplete="password"
        icon="i-heroicons-lock-closed"
      />
    </UFormGroup>
    <UFormGroup label="Potwierdź hasło" name="passwordConfirm">
      <UInput
        v-model="state.passwordConfirm"
        type="password"
        size="lg"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        autocomplete="passwordConfirm"
        icon="i-heroicons-lock-closed"
      />
    </UFormGroup>
    <p class="mt-2 text-gray-500 dark:text-gray-400 text-sm">
      Hasło powinno składać się z 8 do 20 znaków. Musi zawierać przynajmniej jedną wielką literę, jedną małą literę i jedną cyfrę.
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
        placeholder="YYYY-MM-DD"
      />
    </UFormGroup>

    <UFormGroup class="pt-2">
      <UCheckbox v-model="state.agreements.terms" name="agreements_terms" required>
        <template #label>
          „Oświadczam, iż zapoznałem się z treścią <nuxt-link to="/regulamin" class="text-secondary underline">Regulaminu</nuxt-link> .”
        </template>
      </UCheckbox>
    </UFormGroup>

    <div class="flex justify-between pt-6">
      <UButton
        type="submit"
        class="space-y-4"
        size="lg"
        variant="solid"
        :loading="false"
        :disabled="submitDisabled"
      >
        Zarejestruj
      </UButton>
      <UButton label="Zaloguj się" color="gray" variant="link" class="p-0" to="/login">
        <template #leading>
          <UIcon name="i-heroicons-arrow-left-20-solid" />
        </template>
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>
