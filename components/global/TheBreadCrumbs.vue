<script setup lang="ts">
const store = useBreadcrumbsStore()

const { breadcrumbs } = storeToRefs(store)
</script>

<template>
  <div class="w-100 bg-slate-100 py-4 md:py-6 px-4 md:px-0 mx-auto border-t md:border-t-0">
    <UContainer>
      <div class="flex justify-between items-center">
        <UBreadcrumb divider=">" :links="breadcrumbs" />
      </div>
    </UContainer>
  </div>
</template>

<style scoped></style>
