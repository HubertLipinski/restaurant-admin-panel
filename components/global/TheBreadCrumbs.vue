<script setup lang="ts">
// todo Breadcrumbs
</script>

<template>
  <div class="w-100 bg-slate-100 py-6 mx-auto">
    <div class="flex justify-between items-center px-10">
      <UBreadcrumb
        divider=">"
        :links="[{ label: 'Start', to: '/' }, { label: 'Navigation' }, { label: 'Breadcrumb' }]"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
