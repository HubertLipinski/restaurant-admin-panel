<script setup lang="ts">
import { FormError, FormSubmitEvent } from '#ui/types'

const state = ref({
  email: null,
  password: null,
  password_confirm: null,
  birthday_date: null,
  agreements: {
    terms: false,
  },
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'email', message: 'Pole email jest wymagane' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Pole hasło jest wymagane' }) }
  return errors
}
async function submit (event: FormSubmitEvent<any>) {
  // Do something with data
  await setTimeout(() => 1 + 1)
  console.log(event?.data)
}
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4 mb-2"
    @submit="submit"
  >
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
    <UFormGroup label="Potwierdź hasło" name="password_confirm">
      <UInput
        v-model="state.password_confirm"
        type="password"
        size="lg"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        autocomplete="password_confirm"
        icon="i-heroicons-lock-closed"
      />
    </UFormGroup>
    <p class="mt-2 text-gray-500 dark:text-gray-400 text-sm">
      Hasło powinno składać się z 8 do 20 znaków. Musi zawierać przynajmniej jedną wielką literę, jedną małą literę i jedną cyfrę.
    </p>
    <UFormGroup label="Data urodzenia" name="birthday_date">
      <UInput
        v-model="state.birthday_date"
        v-maska
        data-maska="##-##-####"
        data-maska-eager
        type="text"
        size="lg"
        autocomplete="birthday_date"
        icon="i-heroicons-calendar"
        placeholder="DD-MM-YYYY"
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
