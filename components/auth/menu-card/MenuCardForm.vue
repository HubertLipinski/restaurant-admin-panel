<script setup lang="ts">
import { z } from 'zod'
import { FormSchema } from '~/schema/auth/menu-card/FormSchema'

interface MenuCardFormProps {
  method?: 'create' | 'edit'
  menu?: Menu
}

const props = withDefaults(defineProps<MenuCardFormProps>(), {
  method: 'create',
})

const store = useMenuStore()

const state = ref({
  name: '',
  active: true,
  // dishes: [],
})

if (props.menu) {
  state.value.name = props.menu.name
  state.value.active = props.menu.active
}

const submitDisabled = computed(() => !FormSchema.safeParse(state.value).success)
async function submitForm(event: Event<z.output<typeof FormSchema>>) {
  props.method === 'create' ? store.createMenu(event.data) : store.updateMenu(props.menu.id, event.data)
  await navigateTo('/menus')
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
      <hr class="my-4" />
    </div>

    <p>todo: select dishes</p>

    <UButton type="submit" size="lg" class="float-right" variant="solid" :loading="false" :disabled="submitDisabled">
      {{ props.method === 'create' ? 'Zapisz' : 'Aktualizuj' }}
    </UButton>
  </UForm>
</template>

<style scoped></style>
