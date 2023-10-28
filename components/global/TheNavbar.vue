<script setup lang="ts">
const links = [
  {
    label: 'Strona główna',
    to: '/',
  },
  {
    label: 'Menu',
    children: [
      {
        label: 'Produkty',
        to: 'test',
      },
    ],
  },
]
</script>

<template>
  <nav class="min-w-[250px] max-h-screen bg-slate-100 px-6 pb-6 md:flex md:flex-col">
    <UButton
      variant="ghost"
      size="lg"
      to="/"
      class="inline-flex text-xl sm:text-2xl pt-5 hover:bg-slate-200 hover:text-primary-400"
    >
      <span>Panel admina</span>
      <UIcon name="i-heroicons-light-bulb" />
    </UButton>
    <hr class="my-2 bg-primary">
    <ul class="flex flex-col flex-grow">
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <div class="relative text-left w-full">
            <div class="mb-2">
              {{ link.label }}
            </div>
            <UVerticalNavigation v-if="link.children" :links="link.children" />
          </div>
        </template>
      </UVerticalNavigation>
    </ul>
    <PartialUserMenu />
  </nav>
</template>

<style scoped>

</style>
