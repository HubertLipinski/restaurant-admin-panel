<script setup lang="ts">
import { z } from 'zod'
import { FormSchema } from '~/schema/auth/dish/FormSchema'

interface DishFormProps {
  method?: 'create' | 'edit'
  dish?: Dish
}

const props = withDefaults(defineProps<DishFormProps>(), {
  method: 'create',
  dish: null,
})

const store = useDishStore()

const state = ref({
  name: '',
  price: '',
  kcal: '',
  fat: '',
  saturatedFat: '',
  carbs: '',
  proteins: '',
  image: null,
  active: true,
})

const selectedFile = ref(null)
const imageResult = ref(null)
const preview = ref()

function fileUpload(event: Event) {
  const reader = new FileReader()
  const file = (event.target as HTMLInputElement).files[0]
  state.value.image = file

  reader.readAsDataURL(file)
  reader.addEventListener('load', () => (imageResult.value = reader.result), false)
}

function removeFile() {
  state.value.image = null
  selectedFile.value = null
  imageResult.value = null
}

function openFile() {
  const image = new Image()
  image.src = imageResult.value
  const w = window.open('')
  w.document.write(image.outerHTML)
}

// if (props.menu) {
//   state.value.name = props.menu.name
//   state.value.active = props.menu.active
// }

const submitDisabled = computed(() => !FormSchema.safeParse(state.value).success)
async function submitForm(event: Event<z.output<typeof FormSchema>>) {
  props.method === 'create' ? store.createDish(event.data) : store.updateDish(props.menu.id, event.data)
  await navigateTo('/dishes')
}
</script>

<template>
  <UForm :schema="FormSchema" :state="state" class="space-y-4" @submit="submitForm">
    <UFormGroup label="Nazwa" name="name">
      <UInput v-model="state.name" size="lg" placeholder="Zupa dyniowa" />
    </UFormGroup>
    <UFormGroup label="Cena" name="price">
      <UInput
        v-model="state.price"
        size="lg"
        v-maska
        data-maska="0.99"
        data-maska-tokens="0:\d:multiple|9:\d:optional" />
    </UFormGroup>

    <div class="flex flex-col md:flex-row gap-x-4">
      <UFormGroup label="Kalorie" name="kcal" class="sm:w-1/2 md:w-1/4">
        <UInput v-model="state.kcal" size="lg" v-maska data-maska="#" data-maska-tokens="#:\d:multiple" />
      </UFormGroup>
      <UFormGroup label="Tłuszcze" name="fat" class="sm:w-1/2 md:w-1/4">
        <UInput v-model="state.fat" size="lg" v-maska data-maska="#" data-maska-tokens="#:\d:multiple" />
      </UFormGroup>
      <UFormGroup label="Tłuszcze nasycone" name="saturatedFat" class="sm:w-1/2 md:w-1/4">
        <UInput v-model="state.saturatedFat" size="lg" v-maska data-maska="#" data-maska-tokens="#:\d:multiple" />
      </UFormGroup>
      <UFormGroup label="Węglowodany" name="carbs" class="sm:w-1/2 md:w-1/4">
        <UInput v-model="state.carbs" size="lg" v-maska data-maska="#" data-maska-tokens="#:\d:multiple" />
      </UFormGroup>
    </div>
    <div class="flex flex-col md:flex-row gap-x-4">
      <UFormGroup label="Białko" name="proteins" class="sm:w-1/2 md:w-1/4">
        <UInput v-model="state.proteins" size="lg" v-maska data-maska="#" data-maska-tokens="#:\d:multiple" />
      </UFormGroup>
    </div>

    <UFormGroup label="Zdjęcie" name="image">
      <UInput type="file" v-model="selectedFile" @change="fileUpload" />
      <div v-if="imageResult">
        <img
          ref="preview"
          :src="imageResult"
          alt=""
          class="my-2 max-w-[250px] max-h-[250px] hover:cursor-pointer"
          @click="openFile" />
        <UButton color="rose" variant="outline" @click="removeFile">Usuń</UButton>
      </div>
    </UFormGroup>

    <UFormGroup label="Aktywna" name="active">
      <UToggle v-model="state.active" size="md" />
    </UFormGroup>

    <div class="py-2">
      <hr class="my-4" />
    </div>

    <UButton type="submit" size="lg" class="float-right" variant="solid" :loading="false" :disabled="submitDisabled">
      {{ props.method === 'create' ? 'Zapisz' : 'Aktualizuj' }}
    </UButton>
  </UForm>
</template>

<style scoped></style>
