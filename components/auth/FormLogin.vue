<script setup lang="ts">
import { FormError, FormSubmitEvent } from '#ui/types'

const state = ref({
  email: undefined,
  password: undefined,
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
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
        autocomplete="password"
        icon="i-heroicons-lock-closed"
      />
    </UFormGroup>
    <div class="flex justify-between pt-4">
      <UButton type="submit" class="space-y-4" size="lg" variant="outline" :loading="false">
        Zaloguj się
      </UButton>
      <UButton label="Zarejestruj się" color="gray" variant="link" class="p-0">
        <template #trailing>
          <UIcon name="i-heroicons-arrow-right-20-solid" />
        </template>
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>
