<script setup lang="ts">
const isHidden = ref(false)
</script>

<template>
  <nav role="navigation" class="py-4 sm:flex sm:justify-center">
    <UContainer class="container flex flex-col sm:flex-row sm:items-center justify-between">
      <div class="inline-flex justify-between">
        <UButton variant="ghost" size="lg" to="/" class="inline-flex gap-x-1 p-0 py-2 align-middle text-xl sm:text-2xl hover:text-primary">
          <p>Panel admina</p>
          <UIcon name="i-heroicons-light-bulb" />
        </UButton>
        <UButton
          icon="i-heroicons-pencil-square"
          size="lg"
          color="primary"
          square
          variant="ghost"
          class="sm:hidden"
          @click="isHidden = !isHidden"
        />
      </div>
      <div class="bg-primary-800 w-100 py-4 sm:inline-flex sm:bg-inherit" :class="isHidden ? 'hidden' : ''">
        <ul class="flex flex-col gap-y-2 items-center sm:flex-row sm:gap-y-0 sm:gap-x-3">
          <UButton variant="link" size="lg" to="/">Home</UButton>
          <UButton variant="link" size="lg" to="/">Home</UButton>
          <UButton variant="link" size="lg" to="/">Home</UButton>
          <UserMenu />
        </ul>
      </div>
    </UContainer>
  </nav>
</template>

<style scoped>

</style>
