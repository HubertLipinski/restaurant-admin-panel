<script setup lang="ts">
// todo Breadcrumbs
</script>

<template>
  <div class="w-100 bg-slate-100 py-6 mx-auto">
    <UContainer>
      <div class="flex justify-between items-center">
        <UBreadcrumb
          divider=">"
          :links="[{ label: 'Start', to: '/' }, { label: 'Navigation' }, { label: 'Breadcrumb' }]"
        />
      </div>
    </UContainer>
  </div>
</template>

<style scoped>

</style>
