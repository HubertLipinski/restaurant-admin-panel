<script setup lang="ts">
interface TableDetailsProps {
  table: Table
}

const props = defineProps<TableDetailsProps>()
</script>

<template>
  <div class="md:flex items-center justify-center pb-4">
    <div class="w-full md:w-1/2 flex flex-col justify-center gap-y-2 mb-10 md:mb-0">
      <div class="flex items-center gap-2">
        <h2 class="text-[1em] font-bold">Nazwa:</h2>
        <p>{{ props.table.name }}</p>
      </div>
      <div class="flex items-center gap-2">
        <h2 class="text-[1em] font-bold">Liczba miejsc:</h2>
        <p>{{ props.table.seats }}</p>
      </div>
      <div class="flex items-center gap-2" v-if="props.table.created_at">
        <h2 class="text-[1em] font-bold">Data utworzenia:</h2>
        <p>{{ props.table.created_at }}</p>
      </div>
      <div class="flex items-center gap-2" v-if="props.table.updated_at">
        <h2 class="text-[1em] font-bold">Data aktualizacji:</h2>
        <p>{{ props.table.updated_at }}</p>
      </div>
    </div>
    <div class="w-full md:w-1/2 flex justify-start md:justify-end">
      <a v-if="props.table.qr_code_url" :href="props.table.qr_code_url" target="_blank" class="text-center block w-[150px]">
        <img :src="props.table.qr_code_url" alt="kod qr" class="max-w-[150px] max-h-[150px] border m-auto" />
      </a>
    </div>
  </div>
</template>

<style scoped></style>
