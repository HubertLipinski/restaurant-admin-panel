<script setup lang="ts">
import { z } from 'zod'
import { FormCreateSchema, FormUpdateSchema } from '~/schema/auth/user/FormSchema'
const { roles } = useRoles()

interface MenuCardFormProps {
  method?: 'create' | 'edit'
  user?: User
}

const props = withDefaults(defineProps<MenuCardFormProps>(), {
  method: 'create',
  user: null,
})

const schema = props.method === 'create' ? FormCreateSchema : FormUpdateSchema
const store = useUserStore()

const submitDisabled = computed(() => {
  return !schema.safeParse(state.value).success
})

const state = ref({
  id: props.user?.id ?? null,
  name: props.user?.name ?? '',
  email: props.user?.email ?? '',
  password: '',
  password_confirmation: '',
  role: props.user?.role ?? '',
  changePassword: false,
})

watch(state.value, () => {
  if (props.method !== 'create' && !state.value.changePassword) {
    state.value.password = null
    state.value.password_confirmation = null
  }
})

const form = ref(null)
async function submitForm(event: Event<z.output<typeof schema>>) {
  await store.handleForm(event.data, props.method, form)
}

</script>

<template>
  <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="submitForm">
    <UFormGroup label="Nazwa użytkownika" name="name">
      <UInput v-model="state.name" size="lg" />
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" size="lg" type="email" />
    </UFormGroup>
    <UFormGroup label="Rola" name="role">
      <USelect v-model="state.role" size="lg" :options="roles" option-attribute="name"></USelect>
    </UFormGroup>

    <UFormGroup label="Zmień hasło" name="active" v-if="props.method !== 'create'">
      <UToggle v-model="state.changePassword" size="md" />
    </UFormGroup>

    <div v-if="state.changePassword || props.method === 'create'" class="space-y-4">
      <UFormGroup label="Hasło" name="password">
        <UInput v-model="state.password" size="lg" type="password" autocomplete="password" />
      </UFormGroup>
      <UFormGroup label="Powtórz hasło" name="passwordConfirm">
        <UInput v-model="state.password_confirmation" size="lg" type="password" autocomplete="passwordConfirm" />
      </UFormGroup>
    </div>

    <UButton type="submit" size="lg" class="float-right" variant="solid" :loading="false" :disabled="submitDisabled">
      {{ props.method === 'create' ? 'Zapisz' : 'Aktualizuj' }}
    </UButton>
  </UForm>
</template>

<style scoped></style>
