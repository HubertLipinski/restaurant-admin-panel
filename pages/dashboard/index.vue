<script setup lang="ts">
useHead({
  title: 'Dashboard',
})

definePageMeta({
  layout: 'auth',
  middleware: ['auth'],
  name: 'Dashboard',
})
</script>

<template>
  <UContainer>
    <div class="py-4 mt-4">
      <h1>Dashboard</h1>
    </div>
  </UContainer>
</template>
