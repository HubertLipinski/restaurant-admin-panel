<script setup lang="ts">
import { z } from 'zod'
import { FormSchema } from '~/schema/auth/order/FormSchema'
import type { Order } from '~/types/order'

const { formErrorMap } = useFormUtils()
const { success } = useNotification()

interface FormProps {
  order: Order
}

const props = defineProps<FormProps>()

const state = ref({
  status: props.order.status ?? '',
})

const submitDisabled = computed(() => {
  return !FormSchema.safeParse(state.value).success
})

const form = ref(null)
const loading = ref(false)

function resetForm(data: Order) {
  state.value = {
    status: data.status,
  }
}

async function submitForm(event: Event<z.output<typeof FormSchema>>) {
  if (loading.value) {
    return
  }

  loading.value = true

  const data = { ...event.data }

  const { data: response, error } = await useApiFetch<ApiResponse<Order>>(`/orders/${props.order.id}`, {
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
  success('Status zamówienia został pomyślnie zalaktualizowany')

  await navigateTo('/orders')
}

const { statuses } = useOrder()
</script>

<template>
  <UForm ref="form" :schema="FormSchema" :state="state" @submit="submitForm">
    <UCard>
      <template #header>
        <p class="text-gray-500">Aktualizacja zamówienia</p>
      </template>

      <UFormGroup label="Zmień status" name="name" autocomplete="name">
        <USelect
          v-model="state.status"
          :options="statuses"
          placeholder="Status"
          option-attribute="name" />
      </UFormGroup>

      <template #footer>
        <UButton
          type="submit"
          size="lg"
          class="float-right mb-3"
          variant="solid"
          :loading="loading"
          :disabled="submitDisabled"
        >
          Aktualizuj
        </UButton>
      </template>
    </UCard>
  </UForm>
</template>

<style scoped>

</style>