<script setup lang="ts">
import { z } from 'zod'
import { FormSchema } from '~/schema/auth/menu-card/FormSchema'

const state = ref({
  name: '',
  active: true,
  dishes: [],
})

const submitDisabled = computed(() => !FormSchema.safeParse(state.value).success)
async function submitForm (event: Event<z.output<typeof FormSchema>>) {
  console.log(event.data)
}

</script>

<template>
  <UForm :schema="FormSchema" :state="state" class="space-y-4" @submit="submitForm">
    <UFormGroup label="Nazwa" name="name">
      <UInput v-model="state.name" size="lg" placeholder="Karta potraw" />
    </UFormGroup>
    <UFormGroup label="Aktywna" name="active">
      <UToggle v-model="state.active" size="md" />
    </UFormGroup>

    <div class="py-2">
      <hr class="my-4">
    </div>

    <UButton
      type="submit"
      size="lg"
      class="float-right"
      variant="solid"
      :loading="false"
      :disabled="submitDisabled"
    >
      Zapisz
    </UButton>
  </UForm>
</template>

<style scoped>

</style>