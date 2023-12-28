<script setup lang="ts">
import { z } from 'zod'
import { FormSchema } from '~/schema/auth/table/FormSchema'

interface TableCardFormProps {
  method?: 'create' | 'edit'
  table?: table
}

const props = withDefaults(defineProps<TableCardFormProps>(), {
  method: 'create',
  table: null,
})

const store = useTableStore()

const state = ref({
  name: '',
})

if (props.table) {
  state.value.name = props.table.name
}

const submitDisabled = computed(() => !FormSchema.safeParse(state.value).success)
async function submitForm(event: Event<z.output<typeof FormSchema>>) {
  props.method === 'create' ? store.createTable(event.data) : store.updateTable(props.table.id, event.data)
  await navigateTo('/tables')
}
</script>

<template>
  <UForm :schema="FormSchema" :state="state" class="space-y-4" @submit="submitForm">
    <UFormGroup label="Nazwa" name="name">
      <UInput v-model="state.name" size="lg" placeholder="Stolik 4-osobowy" />
    </UFormGroup>

    <UButton
      type="submit"
      size="lg"
      class="float-right mt-4"
      variant="solid"
      :loading="false"
      :disabled="submitDisabled">
      {{ props.method === 'create' ? 'Zapisz' : 'Aktualizuj' }}
    </UButton>
  </UForm>
</template>

<style scoped></style>
