<script setup lang="ts">
const store = useBreadcrumbsStore()

const { breadcrumbs } = storeToRefs(store)
</script>

<template>
  <div class="w-100 bg-slate-100 py-6 mx-auto">
    <UContainer>
      <div class="flex justify-between items-center">
        <UBreadcrumb divider=">" :links="breadcrumbs" />
      </div>
    </UContainer>
  </div>
</template>

<style scoped></style>
