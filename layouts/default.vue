<script setup lang="ts">

</script>

<template>
  <main class="w-100 min-h-screen md:flex" role="main">
    <TheNavbar />

    <div class="flex-grow">
      <div class="w-100 bg-slate-100 p-6 mx-auto">
        <div class="flex justify-between items-center">
          <div>
            breadcrumbs
          </div>
        </div>
      </div>
      <div class="w-100 overflow-auto container-content">
        <UContainer>
          <div class="py-4 mt-4">
            <slot />
          </div>
        </UContainer>
      </div>
    </div>
  </main>
</template>
