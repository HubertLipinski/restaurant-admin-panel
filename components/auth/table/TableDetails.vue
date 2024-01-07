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
      <div class="flex items-center gap-2" v-if="props.table.createdAt">
        <h2 class="text-[1em] font-bold">Data utworzenia:</h2>
        <p>{{ props.table.createdAt }}</p>
      </div>
      <div class="flex items-center gap-2" v-if="props.table.updatedAt">
        <h2 class="text-[1em] font-bold">Data aktualizacji:</h2>
        <p>{{ props.table.updatedAt }}</p>
      </div>
    </div>
    <div class="w-full md:w-1/2 flex justify-start md:justify-end">
      <a v-if="props.table.qrCodeUrl" :href="props.table.qrCodeUrl" target="_blank" class="text-center block w-[150px]">
        <img :src="props.table.qrCodeUrl" alt="kod qr" class="max-w-[150px] max-h-[150px] border m-auto" />
      </a>
    </div>
  </div>
</template>

<style scoped></style>
