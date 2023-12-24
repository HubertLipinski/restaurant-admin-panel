<script setup lang="ts">
interface ConfirmModalProps {
  show: boolean
  confirm: () => Promise<unknown>
  cancel: () => Promise<unknown>
}

const props = defineProps<ConfirmModalProps>()
</script>

<template>
  <UModal v-model="props.show">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Uwaga</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="props.cancel" />
        </div>
      </template>
      <div class="flex flex-col gap-y-3">
        <p class="pb-3">Czy na pewno chcesz usunąć tę kartę?</p>
        <div>
          <UButton color="primary" variant="solid" size="lg" class="mr-3" @click="props.confirm">Tak</UButton>
          <UButton color="rose" variant="outline" size="lg" @click="props.cancel">Nie</UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<style scoped></style>
