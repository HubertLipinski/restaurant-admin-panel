<script setup lang="ts">
import * as yup from 'yup'

definePageMeta({
  layout: 'nonauth',
})
interface LoginCredentials {
  login: null | string
  password: null | string
}

const form: LoginCredentials = reactive({
  login: null,
  password: null,
})

const schema = yup.object({
  login: yup.string().required(),
  password: yup.string().required().min(8),
})

const onSubmit = () => {
  // eslint-disable-next-line no-console
  console.log(form)
}

</script>

<template>
  <div class="flex w-100 min-h-screen justify-center items-center">
    <VeeForm v-slot="{ values }" :validation-schema="schema" :initial-values="form" class="bg-base-200 p-10 space-y-4 lg:min-w-[500px]" @submit="onSubmit">
      <h1 class="text-lg">Zaloguj się</h1>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Login</span>
        </label>
        <VeeField name="login" type="text" class="input input-bordered w-full" />
        <VeeErrorMessage name="login" class="text-error" />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Hasło</span>
        </label>
        <VeeField name="password" type="password" class="input input-bordered w-full" />
        <VeeErrorMessage name="password" class="text-error" />
      </div>
      <div class="w-full pt-4">
        <button class="btn btn-primary" type="submit">Zaloguj</button>
      </div>
      <!-- print form values -->
      <pre>{{ values }}</pre>
    </VeeForm>
  </div>
</template>
