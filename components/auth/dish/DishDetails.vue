<script setup lang="ts">
interface DishDetailsProps {
  dish: Dish
}

const props = defineProps<DishDetailsProps>()
</script>
<template>
  <div>
    <div class="my-4">
      <div v-if="props.dish.image_url" class="xs:w-1/2 md:w-3/4 lg:w-5/12">
      <img :src="props.dish.image_url" :alt="props.dish.name"  class="h-auto max-w-full"/>
      </div>
      <span v-else class="font-bold">Brak zdjęcia</span>
    </div>
    <div class="flex flex-col gap-y-2 mb-6">
      <div class="flex items-center gap-2">
        <h2 class="text-[1em] font-bold">Nazwa:</h2>
        <p>{{ props.dish.name }}</p>
      </div>
      <div class="flex items-center gap-2 mb-2">
        <h2 class="text-[1em] font-bold">Cena:</h2>
        <p>{{ props.dish.price }}</p>
      </div>
      <div class="flex flex-col py-4 mb-2 border-b border-t gap-y-1">
        <h2 class="mb-2 text-xl font-medium">Wartości odżywcze:</h2>
        <div class="flex items-center gap-2">
          <h3 class="text-[1em] font-bold">Kalorie:</h3>
          <p>{{ props.dish.kcal }}</p>
        </div>
        <div class="flex items-center gap-2">
          <h3 class="text-[1em] font-bold">Tłuszcze:</h3>
          <p>{{ props.dish.fat }}</p>
        </div>
        <div class="flex items-center gap-2">
          <h3 class="text-[1em] font-bold">Tłuszcze nasycone:</h3>
          <p>{{ props.dish.saturated_fat }}</p>
        </div>
        <div class="flex items-center gap-2">
          <h3 class="text-[1em] font-bold">Węglowodany:</h3>
          <p>{{ props.dish.carbs }}</p>
        </div>
        <div class="flex items-center gap-2">
          <h3 class="text-[1em] font-bold">Białko:</h3>
          <p>{{ props.dish.proteins }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <h2 class="text-[1em] font-bold">Status:</h2>
        <p>
          <UBadge
            size="sm"
            :label="props.dish.active ? 'Aktywny' : 'Nieaktywny'"
            :color="props.dish.active ? 'green' : 'rose'"
            variant="outline" />
        </p>
      </div>
      <div class="flex items-center gap-2" v-if="props.dish.created_at">
        <h2 class="text-[1em] font-bold">Data utworzenia:</h2>
        <p>{{ props.dish.created_at }}</p>
      </div>
      <div class="flex items-center gap-2" v-if="props.dish.updated_at">
        <h2 class="text-[1em] font-bold">Data aktualizacji:</h2>
        <p>{{ props.dish.updated_at }}</p>
      </div>
    </div>

    <hr class="mb-4" />
  </div>
</template>

<style scoped></style>
