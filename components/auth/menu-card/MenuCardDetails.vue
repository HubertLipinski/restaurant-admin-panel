<script setup lang="ts">
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
      <div class="flex items-center gap-2" v-if="props.menu.createdAt">
        <h2 class="text-[1em] font-bold">Data utworzenia:</h2>
        <p>{{ props.menu.createdAt }}</p>
      </div>
      <div class="flex items-center gap-2" v-if="props.menu.updatedAt">
        <h2 class="text-[1em] font-bold">Data aktualizacji:</h2>
        <p>{{ props.menu.updatedAt }}</p>
      </div>
    </div>

    <hr class="mb-8" />

    <div>
      <h3 class="font-bold text-xl">Lista wybranych dań</h3>
      <p>todo</p>
    </div>
  </div>
</template>

<style scoped></style>
