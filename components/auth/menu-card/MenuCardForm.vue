<script setup lang="ts">
import { z } from 'zod'
import { FormSchema } from '~/schema/auth/menu-card/FormSchema'

interface MenuCardFormProps {
  method?: 'create' | 'edit'
  menu?: Menu
}

const props = withDefaults(defineProps<MenuCardFormProps>(), {
  method: 'create',
  menu: null,
})

const store = useMenuStore()
const submitDisabled = computed(() => !FormSchema.safeParse(state.value).success)

const state = ref({
  name: '',
  active: true,
  dishes: [],
})

if (props.menu) {
  state.value.name = props.menu.name
  state.value.active = !!props.menu.active
  state.value.dishes = props.menu.dishes.map((dish) => dish.id)
}

async function submitForm(event: Event<z.output<typeof FormSchema>>) {
  await props.method === 'create' ? store.createMenu(event.data) : store.updateMenu(props.menu.id, event.data)
  await navigateTo('/menus')
}

const loading = ref(false)
const query = computed(() => props.method === 'create' ? 'unassigned=true' : `menu_id=${props.menu.id}&unassigned=true`)

async function search(q) {
  loading.value = true
  const { data: response } = await useApiFetch(`/dishes?${query.value}`, {
    query: {
      query: q,
      per_page: 50,
    },
  })
  loading.value = false

  return response.value.data.map(dish => ({
    ...dish,
    avatar: { src: dish.image_url ? dish.image_url : null, size: 'xl' },
  }))
}

const computedHelp = computed(() => {
  if (props.method === 'create') {
    return 'Możesz wybrać tylko te potrawy, które nie są przypisane do żadnego menu.'
  }
  return 'Edytuj przypisane potrawy lub dodaj te, ktore nie są przypisane do żadnego menu.'
})

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

    <UFormGroup
      label="Wybierz potrawy"
      name="dishes"
      :help="computedHelp"
    >
      <USelectMenu
        v-model="state.dishes"
        :loading="loading"
        :searchable="search"
        value-attribute="id"
        option-attribute="name"
        multiple
        searchable-placeholder="Wyszukaj potrawę..."
        size="lg"
        :popper="{ placement: 'auto' }"
      >
        <template #label>
          <span v-if="state?.dishes?.length" class="truncate">Liczba wybranych pozycji: {{ state?.dishes?.length }}</span>
          <span v-else>Wybierz potrawy</span>
        </template>
        <template #option-empty="{ query }">
          Nie znaleziono szukanej potrawy: <strong>{{ query }}</strong>
        </template>
      </USelectMenu>
    </UFormGroup>

    <UButton type="submit" size="lg" class="float-right" variant="solid" :loading="false" :disabled="submitDisabled">
      {{ props.method === 'create' ? 'Zapisz' : 'Aktualizuj' }}
    </UButton>
  </UForm>
</template>

<style scoped></style>
