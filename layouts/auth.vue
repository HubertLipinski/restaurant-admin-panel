<script setup lang="ts">
import TheBreadCrumbs from '~/components/global/TheBreadCrumbs.vue'
</script>

<template>
  <div>
    <main class="w-100 min-h-screen md:flex" role="main">
      <TheNavbar />
      <div class="flex-grow pb-[5rem]">
        <TheBreadCrumbs />
        <div class="w-100 overflow-auto container-content">
          <UContainer class="pt-2">
            <slot />
          </UContainer>
        </div>
      </div>
    </main>
    <UNotifications />
  </div>
</template>
