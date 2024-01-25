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
const dishStore = useDishStore()

const state = ref({
  name: '',
  active: true,
  dishesId: [],
})

if (props.menu) {
  state.value.name = props.menu.name
  state.value.active = props.menu.active
  // state.value.dishesId = props.menu.dishes.map((dish) => dish.id)
  state.value.dishesId = []
}

const { list: dishList } = storeToRefs(dishStore)

onMounted(async () => {
  if (dishList.value.length === 0) {
    await dishStore.fetchData()
  }
})

const availableDishes = computed(() => {
  return []
  return dishList.value.map((dish) => {
    return {
      name: dish.name,
      value: dish.id,
    }
  })
})

const selectedNames = computed(() => {
  return []
  // return dishList.value.filter((dish) => state.value.dishesId.includes(dish.id)).map((dish) => dish.name)
})

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

    <UFormGroup label="Wybierz potrawy" name="dishesId">
      <USelectMenu
        v-model="state.dishesId"
        :options="availableDishes"
        value-attribute="value"
        option-attribute="name"
        multiple
        searchable
        searchable-placeholder="Wyszukaj potrawę...">
        <template #label>
          <span v-if="selectedNames.length" class="truncate">{{ selectedNames.join(', ') }}</span>
          <span v-else>-</span>
        </template>
        <template #option-empty="{ query }">
          Nie znaleziono szukanej frazy <q>{{ query }}</q>
        </template>
      </USelectMenu>
    </UFormGroup>

    <UButton type="submit" size="lg" class="float-right" variant="solid" :loading="false" :disabled="submitDisabled">
      {{ props.method === 'create' ? 'Zapisz' : 'Aktualizuj' }}
    </UButton>
  </UForm>
</template>

<style scoped></style>
