<script setup lang="ts">
import MenuDishes from '~/components/auth/menu-card/MenuDishes.vue'

interface MenuDetailsProps {
  menu: Menu
}

const props = defineProps<MenuDetailsProps>()
</script>
<template>
  <div>
    <div class="flex flex-col gap-y-2 mb-10">
      <div class="flex items-center gap-2">
        <h2 class="text-[1em] font-bold">Nazwa:</h2>
        <p>{{ props.menu.name }}</p>
      </div>
      <div class="flex items-center gap-2">
        <h2 class="text-[1em] font-bold">Status:</h2>
        <p>
          <UBadge
            size="sm"
            :label="props.menu.active ? 'Aktywny' : 'Nieaktywny'"
            :color="props.menu.active ? 'green' : 'rose'"
            variant="outline" />
        </p>
      </div>
      <div class="flex items-center gap-2" v-if="props.menu.created_at">
        <h2 class="text-[1em] font-bold">Data utworzenia:</h2>
        <p>{{ props.menu.created_at }}</p>
      </div>
      <div class="flex items-center gap-2" v-if="props.menu.updated_at">
        <h2 class="text-[1em] font-bold">Data aktualizacji:</h2>
        <p>{{ props.menu.updated_at }}</p>
      </div>
    </div>

    <hr class="mb-8" />

    <div>
      <h3 class="font-bold text-xl">Lista wybranych dań:</h3>
      <div class="w-full mt-4">
        <MenuDishes :dishes="props.menu.dishes" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
