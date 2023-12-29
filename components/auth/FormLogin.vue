<script setup lang="ts">
import { z } from 'zod'
import { LoginSchema } from '~/schema/auth/LoginSchema'

const { signIn } = useAuth()
const { success } = useNotification()

const state = ref({
  email: '',
  password: '',
})

const form = ref()
const loading = ref(false)
const submitDisabled = computed(() => !LoginSchema.safeParse(state.value).success)

async function submitForm(event: Event<z.output<typeof LoginSchema>>) {
  loading.value = true
  try {
    await signIn({ email: event.data.email, password: event.data.password }, { callbackUrl: '/dashboard' })
    success('Zostałeś pomyślnie zalogowany.')
  } catch (error) {
    loading.value = false
    form.value.setErrors([
      { path: 'error', message: `Wystąpił błąd podczas logowania: ${error.message ?? 'Błąd serwera.'}` },
    ])
  }
}

onErrorCaptured((_) => {
  return false
})
</script>

<template>
  <UForm ref="form" class="space-y-4 mb-2" :schema="LoginSchema" :state="state" @submit="submitForm">
    <UFormGroup label="Email" name="email" required>
      <UInput
        v-model="state.email"
        size="lg"
        placeholder="email@example.com"
        autocomplete="email"
        icon="i-heroicons-envelope" />
    </UFormGroup>
    <UFormGroup label="Hasło" name="password" required>
      <UInput
        v-model="state.password"
        type="password"
        size="lg"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        autocomplete="password"
        icon="i-heroicons-lock-closed" />
    </UFormGroup>
    <UFormGroup name="error"></UFormGroup>
    <div class="flex justify-between pt-6">
      <UButton type="submit" class="space-y-4" size="lg" variant="solid" :loading="loading" :disabled="submitDisabled">
        Zaloguj się
      </UButton>
      <UButton
        label="Zarejestruj się"
        color="gray"
        variant="link"
        class="p-0"
        :to="loading !== true ? '/register' : null"
        :disabled="loading">
        <template #trailing>
          <UIcon name="i-heroicons-arrow-right-20-solid" />
        </template>
      </UButton>
    </div>
  </UForm>
</template>

<style scoped></style>
